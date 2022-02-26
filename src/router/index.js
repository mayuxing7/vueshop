import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: () => import('@/components/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome', 
        component: ()=>import('@/components/Welcome.vue')
      },
      {
        path:'/users',
        component:()=>import('@/components/user/users.vue')
      },
      {
        path:'/rights',
        component:()=>import('@/components/power/Rights.vue')
      },
      {
        path:'/roles',
        component:()=>import('@/components/power/Roles.vue')
      },
      {
        path:'/categories',
        component:()=>import('@/components/goods/Cate.vue')
      },
      {
        path:'/params',
        component:()=>import('@/components/goods/Params.vue')
      },
      {
        path:'/goods',
        component:()=>import('@/components/goods/List.vue')
      },{
        path:'/goods/add',
        component:()=>import('@/components/goods/Add.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})


// 挂载路由导航守卫
// to 将要访问 from从哪个路径跳转来 next放行 next('/') 强制跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const token_ = window.sessionStorage.getItem('token')
  if (!token_) return next('/login')
  next()
})

export default router
