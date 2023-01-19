
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//引入socket
// import io from  'components/socket/weapp.socket.io.js'

Vue.config.productionTip = false
// Vue.prototype.serverUrl = 'http://localhost:8082'
// Vue.prototype.socket = io('http://localhost:8183')
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif