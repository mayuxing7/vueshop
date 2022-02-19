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
    component:()=>import('@/components/Home.vue')
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
