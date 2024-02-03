import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import $ from 'jquery'
import '@/assets/font/font.css'
import store from './store'
import Vcode from "vue3-puzzle-vcode";
import axios from 'axios'
const app = createApp(App)

app.use(ElementPlus).use(store)
app.use(router).use($).use(Vcode)
app.mount('#app')

// axios请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象，添加Token验证的token字段
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['token'] = token
  }
  return config
})
