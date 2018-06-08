import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// 根据生产、开发环境的不同决定是否使用路由懒加载
// 路由懒加载目的在于将不同路由对应的组件分割成不同的代码块
// 然后当路由被访问的时候才加载对应组件，这样就更加高效
// 开发环境：module.exports = file => require('@/views/' + file + '.vue').default —— 一波加载
// 生产环境：module.exports = file => () => import('@/views/' + file + '.vue') —— 延迟加载
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  // 注释部分为原模板代码没有加入根据环境是否需要懒加载的功能，所有都是懒加载
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [{
      path: 'table',
      name: 'Table',
      // 两种设置component方法都可以，前者为函数形式，后者配置形式
      // component: () => import('@/views/table/index'),
      component: _import('table/index'),
      meta: {
        title: 'table',
        icon: 'table'
      }
    },
    {
      path: 'tree',
      name: 'Tree',
      // component: () => import('@/views/tree/index'),
      component: _import('tree/index'),
      meta: {
        title: 'tree',
        icon: 'tree'
      }
    }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    // redirect: 'noredirect',
    alwaysShow: true,
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [{
      path: 'mixchart',
      component: _import('charts/mixChart'),
      name: 'mixChart',
      meta: {
        title: 'mixChart',
        noCache: true
      }
    },
    {
      path: 'linechart',
      component: _import('charts/LineChart'),
      name: 'lineChart',
      meta: {
        title: 'lineChart',
        noCache: true
      }
    }
    ]
  }
]

export const asyncRouterMap = [{
  path: '/form',
  component: Layout,
  hidden: false,
  meta: {
    roles: ['admin']
  }, // 如果不設置此處的權限则会出现空白菜单
  children: [{
    path: 'index',
    name: 'Form',
    // component: () => import('@/views/form/index'),
    component: _import('form/index'),
    meta: {
      title: 'form',
      icon: 'form',
      roles: ['admin']
    }
  }]
},
{
  path: '/i18n',
  component: Layout,
  children: [{
    path: 'index',
    component: _import('i18n-demo/index'),
    name: 'i18n',
    meta: {
      title: 'i18n',
      icon: 'international'
    }
  }]
},
  // {
  //   path: '/overview',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: _import('overview/index'),
  //     name: 'overview',
  //     meta: { title: 'overview', icon: 'international' }
  //   }]
  // },
{
  path: '/shipinfo',
  component: Layout,
  redirect: '/shipinf/overview',
  name: 'ShipInfo',
  meta: {
    title: 'shipinfo',
    icon: 'example'
  },
  children: [{
    path: 'repair',
    name: 'Repair',
    // 两种设置component方法都可以，前者为函数形式，后者配置形式
    // component: () => import('@/views/table/index'),
    component: _import('repair/Repair'),
    meta: {
      title: 'repair',
      icon: 'table'
    }
  },
  {
    path: 'overview',
    name: 'Overview',
    // component: () => import('@/views/tree/index'),
    component: _import('overview/index'),
    meta: {
      title: 'overview',
      icon: 'international'
    }
  }
  ]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
