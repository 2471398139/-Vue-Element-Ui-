/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-03 10:01:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-13 10:13:17
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: '首页3' }
    }]
  },
  {
    path: '/column',
    // 一级
    component: Layout,
    children:[{
      path: 'index',
      name:'column',
      // @代表src
      component: () =>import('@/pages/column/index'),
      meta: { title: '栏目管理',icon: 'column'}
    }]
  },
  {
    path: '/production',
    // 一级
    component: Layout,
    children:[{
      path: 'index',
      name:'Production',
      // @代表src
      component: () =>import('@/pages/production/index'),
      meta: { title: '产品管理',icon: '产品'}
    }]
  },
  {
    path: '/order',
    // 一级
    component: Layout,
    children:[{
      path: 'index',
      name:'Order',
      // @代表src
      component: () =>import('@/pages/order/index'),
      meta: { title: '订单管理',icon: 'order'}
    },
    {
      path: 'details',
      hidden:true,
      name:'OrderDetail',
      // @代表src
      component: () =>import('@/pages/order/details'),
    }]
  },
  {
    path: '/audit',
    // 一级
    component: Layout,
    name: 'Audit',
    meta: { title: '审核大厅', icon: '审核管理' },
    children:[
      {
      path: 'renzheng',
      name:'renzheng',
      // @代表src
      component: () =>import('@/pages/audit/renzheng/index'),
      meta: { title: '实名认证',icon: '角色管理'}
      },
      {
        path: 'Accountchange',
        name: 'Accountchange',
        component: () => import('@/pages/audit/Accountchange/index'),
        meta: { title: '账户变更', icon: '钱包1' }
      },
      {
        path: 'infocomments',
        name: 'Infocomments',
        component: () => import('@/pages/audit/infocomments/index'),
        meta: { title: '资讯评论', icon: '网站资讯1' }
      },
      {
        path: 'orderComments',
        name: 'OrderComments',
        component: () => import('@/pages/audit/orderComments/index'),
        meta: { title: '订单评论', icon: 'tree' }
      }
  ]
  },
  {
    path: '/bill',
    // 一级
    component: Layout,
    meta: { title: '账单管理',icon: '钱包2'},
    children:[
      {
      path: 'customerbill',
      name:'Customerbill',
      // @代表src
      component: () =>import('@/pages/bill/customerbill/index'),
      meta: { title: '顾客账单',icon: '产品'}
      },
      {
        path: 'employbill',
        name:'Employbill',
        // @代表src
        component: () =>import('@/pages/bill/employbill/index'),
        meta: { title: '员工账单',icon: '产品'}
      },
      {
        path: 'systembill',
        name:'Systembill',
        // @代表src
        component: () =>import('@/pages/bill/systembill/index'),
        meta: { title: '系统账单',icon: '产品'}
      }
  ]
  },
  {
    path: '/customer',
    // 一级
    component: Layout,
    children:[
      {
      path: 'index',
      name:'Customer',
      // @代表src
      component: () =>import('@/pages/customer/index'),
      meta: { title: '顾客管理',icon: '顾客管理2'}
      },
      {
        path: 'details',
        hidden:true,
        name:'CustomerDetail',
        // @代表src
        component: () =>import('@/pages/customer/details'),
      }
  ]
  },
  {
    path: '/employees',
    // 一级
    component: Layout,
    children:[{
      path: 'index',
      name:'Employees',
      // @代表src
      component: () =>import('@/pages/employees/index'),
      meta: { title: '员工管理',icon: '个人管理2'}
    },
    {
      path: 'details',
      hidden:true,
      name:'emplyeesDetail',
      // @代表src
      component: () =>import('@/pages/employees/details'),
    }
  ]
  },
  {
    path: '/information',
    // 一级
    component: Layout,
    meta: { title: '网站资讯',icon: '产品'},
    children:[
      {
      path: 'classification',
      name:'classification',
      // @代表src
      component: () =>import('@/pages/information/classification/index'),
      meta: { title: '资讯分类',icon: '产品'}
      },
      {
        path: 'informations',
        name:'Informations',
        // @代表src
        component: () =>import('@/pages/information/informations/index'),
        meta: { title: '资讯信息',icon: '产品'}
      },
  ]
  },
  {
    path: '/Role',
    // 一级
    component: Layout,
    meta: { title: '角色权限',icon: '角色管理2'},
    children:[
      {
      path: 'cusRole',
      name:'CusRole',
      // @代表src
      component: () =>import('@/pages/Role/cusRole/index'),
      meta: { title: '用户管理',icon: '产品'}
      },
      {
        path: 'jsRole',
        name:'JsRole',
        // @代表src
        component: () =>import('@/pages/Role/jsRole/index'),
        meta: { title: '角色管理',icon: '产品'}
      },
      {
        path: 'qxRole',
        name:'QxRole',
        // @代表src
        component: () =>import('@/pages/Role/qxRole/index'),
        meta: { title: '权限管理',icon: '产品'}
      },
      {
        path: 'details',
        hidden:true,
        name:'CusRoleDetail',
        // @代表src
        component: () =>import('@/pages/Role/cusRole/details'),
      }
  ]
  },
  {
    path: '/configuration',
    // 一级
    component: Layout,
    children:[{
      path: 'index',
      name:'Configuration',
      // @代表src
      component: () =>import('@/pages/configuration/index'),
      meta: { title: '系统配置',icon: '系统设置'}
    }]
  },
  {
    path: '/shuffling',
    // 一级
    component: Layout,
    children:[{
      path: 'index',
      name:'Shuffling',
      // @代表src
      component: () =>import('@/pages/shuffling/index'),
      meta: { title: '轮播管理',icon: '产品'}
    }]
  },
  {
    path: '/Thelog',
    // 一级
    component: Layout,
    children:[{
      path: 'index',
      name:'Thelog',
      // @代表src
      component: () =>import('@/pages/Thelog/index'),
      meta: { title: '日志管理',icon: '产品'}
    }]
  },
  {
    path: '/personal',
    // 一级
    component: Layout,
    children:[{
      path: 'index',
      name:'Personal',
      // @代表src
      component: () =>import('@/pages/personal/index'),
      meta: { title: '个人信息',icon: '产品'}
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
