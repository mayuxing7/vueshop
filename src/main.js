import Vue from 'vue'
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'

// 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

// 设置拦截器
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')

  // ！！！必须return config！！！
  return config
})
// Vue.prototype.$http = axios 

// 引入全局样式
import '@/assets/css/global.css'


// 引入iconfont图标
import '@/assets/fonts/iconfont.css'


// 导入vue-table-with-tree-grid
import TreeTable from 'vue-table-with-tree-grid'

// 导入vuequilleditor
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)


// 注册全局过滤器
Vue.filter('dataFormat', function (originVal){
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})



Vue.use(VueAxios, axios);
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
