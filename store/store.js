import Vue from 'vue'
import Vuex from 'vuex'
import moduleUser from '@/store/user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		'm_user': moduleUser
	}
})

export default store