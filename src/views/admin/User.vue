<template>
    <div class="area-serach">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-divider border-style="dashed" />
            <el-form-item label="用户昵称">
                <el-input v-model="searchForm.nick_name" placeholder="请输入用户昵称" clearable />
            </el-form-item>

            <el-form-item label="用户状态">
                <el-select v-model="searchForm.is_active">
                    <el-option label="活跃" :value="true" />
                    <el-option label="锁定" :value="false" />
                </el-select>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="area-btn">
        <span>用户列表</span>
        <div>
            <el-button type="primary">新增</el-button>
            <el-button type="success" @click="deleteHandle()">批量删除</el-button>
            <el-button type="danger">批量停用</el-button>
        </div>
    </div>
    <el-divider border-style="dashed" />

    <div class="area-table">
        <!-- 后端返回来的 usersData 在这里 -->
        <el-table ref="multipleTableRef" :data="usersData" row-key="id" style="width: 100%"    
            @selection-change="handleSelectionChange">
            <!-- 接下来就是表字段了 -->
            <el-table-column type="selection" :selectable="selectable" width="55" />
            <el-table-column label="头像" width='100'>
                <template #default="scope">
                    <el-avatar :size='40' :src="scope.row.avatar"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column property="username" label="用户名" width="120"/>
            <el-table-column property="nick_name" label="用户昵称"/>
            <el-table-column property="gender" label="性别" width="100">
                <template #default="scope">
                    <el-tag v-if="scope.row.gender==1">男</el-tag>
                    <el-tag v-else-if="scope.row.gender==2">女</el-tag>
                    <el-tag v-else>武装直升机</el-tag>
                </template>
            </el-table-column>
            <el-table-column property="roles" label="角色名称">
                <template #default="scope">
                    <el-tag size="small" type="danger" v-for="item in scope.row.roles">{{ item.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column property="email" label="邮箱"></el-table-column>
            <el-table-column property="phone" label='手机号'></el-table-column>
            <el-table-column property="is_active" label='状态'>
                <template #default="scope">
                    <el-tag size="small" v-if="scope.row.is_active" type="success">正常</el-tag>
                    <el-tag size="small" v-else-if="scope.row.is_active" type="danger">禁用</el-tag>
                </template>
            </el-table-column>

            <el-table-column width="300px" label="操作">
                <template #default="scope">
                    <el-button link type="primary" @click="">分配角色</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <el-button link type="primary" @click="">重置密码</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <el-button link type="primary" @click="">编辑</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-popconfirm title="你确定删除吗？" @confirm="deleteHandle(scope.row.id)">
                        <template #reference>
                            <el-button link type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        
    </div>
    <div class="area-page">
         <el-pagination 
         background
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         layout="total,sizes,prev, pager, next,jumper"
         :page-sizes="[2,5,8]"
         :current-page="searchForm.page"
         :page-size="searchForm.page_size" 
         :total="total">
         </el-pagination>
    </div>
</template>

<script setup>
import { reactive,ref } from 'vue'
import {ElMessage} from 'element-plus'
import { reqUserList,reqDeleteUser } from '../../api/user'
const searchForm = reactive({      //reactive 能让数据变化被页面感知，但不会自动帮你发送网络请求。
  username: '',
  nick_name: '',
  is_active:true,
  page:1,
  page_size:5
})
const total=ref(0)

//定义列表，存放选中的用户
const multipleSelection=ref([])

//搜索按钮被点击
const onSubmit = () => {
    searchForm.page=1
    searchForm.page_size=5
    getUserList()
}

//2.分页相关2个函数
function handleSizeChange(val){
    searchForm.page_size=val
    getUserList()
}
function handleCurrentChange(val){
    searchForm.page=val
    getUserList()
}

//3.向后端发请求，获取所有用户数据，渲染在页面上
const usersData=ref([])
async function getUserList() {
    let res=await reqUserList(searchForm)
    usersData.value=res.results
    total.value=res.total
}
getUserList()

//4.选中某个用户会触发
function handleSelectionChange(val){
    multipleSelection.value=val

}
//删除功能
async function deleteHandle(id) {
    let ids=[]
    //如果传了id，就是单删
    if (id){
        ids.push(id)
    }else{
        multipleSelection.value.forEach(row=>{
            ids.push(row.id)
        }
        )
    }
    //如果不传id就以multipleSelection为准，多删
    let res=await reqDeleteUser(ids)
    ElMessage({
        message:'删除成功',
        type:'success',
        plain:true,
        onClose:()=>{
            getUserList()
        }
    })

}
</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.area-btn{
    display: flex;
    justify-content: space-between;
}
.area-btn>span{
    font-size: 20px;
    font-weight: bold;
}
.area-page{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>
