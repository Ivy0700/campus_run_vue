
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
import { $http } from '@escook/request-miniprogram'
//导入网络请求的包
uni.$http = $http
$http.baseUrl = 'http://localhost:8099'

//请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})
	
	console.log(options)
	
	//判断请求是否为有权限的接口
	if (options.url.indexOf('/api/') !== -1) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}
//响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}
uni.$showMsg = function(title='数据请求失败', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}

Vue.config.productionTip = false
// Vue.prototype.serverUrl = 'http://localhost:8082'
// Vue.prototype.socket = io('http://localhost:8183')
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uS2V5IjoiNXNuUkt2aWR4NzQya2dJNVkyYjh2UT09Iiwiand0LWlkIjoicnVuX3VzZXJfdG9rZW46b2d2azM1S1FHWTViUjM1cGU2ckMzQmhEcGhoWSIsIm9wZW5JZCI6Im9ndmszNUtRR1k1YlIzNXBlNnJDM0JoRHBoaFkiLCJleHAiOjE2NzY5MDQyNjF9.vSO1YTS-rZWNMSVPstuNDeSAaqf9FF1vwSAH0DG50t4
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
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