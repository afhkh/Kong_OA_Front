
<template>
  <div class="system-info-container">
    <div class="system-info-header">
      <h1>操作系统:{{ systemInfo.os }}</h1>
    </div>
    <div class="system-info-content">
      <div class="chart-card">
        <div class="chart-card-title">CPU 使用率</div>
        <div ref="cpuChartEl" class="chart-container"></div>
      </div>
      <div class="chart-card">
        <div class="chart-card-title">磁盘使用情况</div>
        <div ref="diskChartEl" class="chart-container"></div>
      </div>
      <div class="chart-card">
        <div class="chart-card-title">内存使用情况</div>
        <div ref="memoryChartEl" class="chart-container"></div>
      </div>
      <div class="chart-card">
        <div class="chart-card-title">网络流量</div>
        <div ref="networkChartEl" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 定时，每隔5s，向后端发送一次请求---》动态变的---》websocket会更有优势
// 1 导入依赖 --安装echars  ----》npm install echarts --save
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {reqServerData} from "../../api/home.js";
import * as echarts from 'echarts'
const systemInfo = ref({});
let pollInterval = null;
// 图表实例：只初始化一次，后续只 setOption 更新，避免重复 init 报错
let cpuChart = null, diskChart = null, memoryChart = null, networkChart = null;
// 模板 ref：与 template 里的 ref="xxxEl" 对应，用来拿 DOM 元素
const cpuChartEl = ref(null);
const diskChartEl = ref(null);
const memoryChartEl = ref(null);
const networkChartEl = ref(null);
// 2 写一个async函数
async function getServerData() {
  let res = await reqServerData()
  systemInfo.value=res.data
  renderCharts()
}


// 3 渲染页面--》echars--》百度--》柱状图，饼形图，折线图
const renderCharts = () => {

  // CPU Chart
    if (systemInfo.value.cpu) {

    if (!cpuChart) cpuChart = echarts.init(cpuChartEl.value);
    const cpuOption = {
      title: {
        text: 'CPU 使用率 (%)',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      series: [
        {
          name: 'CPU',
          type: 'pie',
          radius: '70%',
          data: [
            { value: systemInfo.value.cpu.percent, name: '已使用' },
            { value: 100 - systemInfo.value.cpu.percent, name: '空闲' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    cpuChart.setOption(cpuOption);
  }

  // Disk Chart
    if (systemInfo.value.disk) {
    if (!diskChart) diskChart = echarts.init(diskChartEl.value);
    const diskOption = {
      title: {
        text: '磁盘使用情况 (GB)',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} GB'
      },
      series: [
        {
          name: '磁盘',
          type: 'pie',
          radius: '70%',
          data: [
            { value: systemInfo.value.disk.used, name: '已使用' },
            { value: systemInfo.value.disk.free, name: '空闲' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    diskChart.setOption(diskOption);
  }

  // Memory Chart
    if (systemInfo.value.memory) {

    if (!memoryChart) memoryChart = echarts.init(memoryChartEl.value);
    const memoryOption = {
      title: {
        text: '内存使用情况 (GB)',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} GB'
      },
      series: [
        {
          name: '内存',
          type: 'pie',
          radius: '70%',
          data: [
            { value: systemInfo.value.memory.used, name: '已使用' },
            { value: systemInfo.value.memory.free, name: '空闲' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    memoryChart.setOption(memoryOption);
  }

  // Network Chart
    if (systemInfo.value.network) {
    if (!networkChart) {
      networkChart = echarts.init(networkChartEl.value);
      // 历史数据挂在实例上，才能跨轮询累积
      networkChart._networkData = { sent: [], recv: [] };
    }
    const networkOption = {
      title: {
        text: '网络流量 (Bytes)',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} Bytes'
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '发送',
          type: 'line',
          data: [],
          smooth: true,
          showSymbol: false,
          areaStyle: {}
        },
        {
          name: '接收',
          type: 'line',
          data: [],
          smooth: true,
          showSymbol: false,
          areaStyle: {}
        }
      ]
    };
    networkChart._networkData.sent.push([new Date().getTime(), systemInfo.value.network.bytes_sent]);
    networkChart._networkData.recv.push([new Date().getTime(), systemInfo.value.network.bytes_recv]);
    // 只保留最近的 10 个数据点
    if (networkChart._networkData.sent.length > 10) {
      networkChart._networkData.sent.shift();
    }
    if (networkChart._networkData.recv.length > 10) {
      networkChart._networkData.recv.shift();
    }
    networkOption.series[0].data = networkChart._networkData.sent;
    networkOption.series[1].data = networkChart._networkData.recv;
    networkChart.setOption(networkOption);
  }
};

// 4 每隔5s发送一次请求--》定时器，定时执行
const startPolling = () => {
  getServerData();
  pollInterval = setInterval(getServerData, 5000); // 每 5 秒请求一次数据
};
// 5 当组件挂在时，开启定时器，组件销毁时，清理定时器
onMounted(() => {  // 组件挂载
  startPolling();
});
onBeforeUnmount(() => {
  if (pollInterval) {
    clearInterval(pollInterval);
  }
});

</script>
<style scoped>
.system-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.system-info-header {
  margin-bottom: 20px;
}
.system-info-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
}
.info-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.chart-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.chart-container {
  width: 100%;
  height: 300px;
}
</style>
