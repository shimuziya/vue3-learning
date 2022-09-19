import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.less'
import './service/axios_demo'
import { setupStore } from './store'
import { registerApp, iconApp } from './global'
import * as ElIcons from '@element-plus/icons'
import { isValidKey } from './utils/validKey'
//import ElementPlus from 'element-plus'

const app = createApp(App)

registerApp(app)
//iconApp(app) // 单个导入
// Object.keys(ELIcons).forEach((key) => {
//   app.component(key, ELIcons[key])
// }) //这个有错
Object.keys(ElIcons).forEach((key) => {
  if (isValidKey(key, ElIcons)) {
    app.component(key, ElIcons[key])
  }
})

// Vue.config.devtools = true
setupStore()
app.use(router)
app.use(store)

//app.use(ElementPlus)
app.mount('#app')
