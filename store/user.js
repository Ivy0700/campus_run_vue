export default {
	namespaced: true,
	
	state: () => ({
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		//重定向的 Object对象
		redirectinfo: null
	}),
	mutations: {
		
		updateUserInfo(state, userinfo) {
			state.userinfo = userinfo;
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		updateToken(state, token) {
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(state, info) {
			state.redirectinfo = info;
			console.log(state.redirectinfo)
			
		},
	},
	getters: {
		
	}
}