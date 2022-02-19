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
// Vue.prototype.$http = axios 

// 引入全局样式
import '@/assets/css/global.css'


Vue.use(VueAxios, axios);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
