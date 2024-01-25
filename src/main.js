import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router'
import $ from 'jquery'


const app = createApp(App)

app.use(ElementPlus)
app.use(router).use($)
app.mount('#app')