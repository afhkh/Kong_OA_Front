<template>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b">
    <router-link to="/index">
      <el-menu-item index="Index">
        <el-icon :size="20">
          <HomeFilled/>
        </el-icon>
        <span slot="title">首页</span>
      </el-menu-item>
    </router-link>
    <el-sub-menu index="3">
      <template #title>
        <el-icon :size="20">
          <Setting/>
        </el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <router-link to="/info">
          <el-menu-item index="3-6" @click="selectMenu({name:'Info',title:'服务性能'})">
            <el-icon>
              <PieChart/>
            </el-icon>
            服务性能
          </el-menu-item>
        </router-link>
        <router-link to="/user">
          <el-menu-item index="3-1" @click="selectMenu({name:'User',title:'用户管理'})">
            <el-icon>
              <UserFilled/>
            </el-icon>
            用户管理
          </el-menu-item>
        </router-link>
        <router-link to="/role">
          <el-menu-item index="3-2" @click="selectMenu({name:'Role',title:'角色管理'})">
            <el-icon>
              <ChatDotRound/>
            </el-icon>
            角色管理
          </el-menu-item>
        </router-link>
       <router-link to="/menu">
         <el-menu-item index="3-3" @click="selectMenu({name:'Menu',title:'菜单管理'})">
           <el-icon>
             <Menu/>
           </el-icon>
           菜单管理
         </el-menu-item>
       </router-link>
       <router-link to="/dept">
         <el-menu-item index="3-4" @click="selectMenu({name:'Dept',title:'部门管理'})">
           <el-icon>
             <Avatar/>
           </el-icon>
           部门管理
         </el-menu-item>
       </router-link>
       <router-link to="/job">
         <el-menu-item index="3-5" @click="selectMenu({name:'Job',title:'岗位管理'})">
           <el-icon>
             <Mug/>
           </el-icon>
           岗位管理
         </el-menu-item>
       </router-link>

      </el-menu-item-group>
    </el-sub-menu>

  </el-menu>
</template>
<script setup>

</script>
<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
}
</style>