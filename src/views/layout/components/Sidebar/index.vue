<template>
  <scroll-bar>
    <el-menu mode="vertical"
             unique-opened
             :default-active="$route.path"
             :collapse="isCollapse"
             background-color="#304156"
             text-color="#fff"
             active-text-color="#409EFF"
    >
      <!--<sidebar-item :routes="routes"></sidebar-item>-->
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers' // 此处引入权限控制的动态路由
    ]),
    // routes() { // 此处坑，默认了没有动态添加的路由映射表
    //   return this.$router.options.routes
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
