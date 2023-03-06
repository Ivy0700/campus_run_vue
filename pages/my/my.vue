<template>
	
 	<view class="my-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo ref="userinfo" v-else></my-userinfo>
		
	</view> 
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		onLoad() {
			this.$refs.userinfo.updateChoice('order')
			
		},
		onShow() {
			console.log("onShow")
			this.$refs.userinfo.refresh()
			
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['token'])
		},
		onReachBottom() {
			this.$refs.userinfo.reachBottom()
		}
	}
</script>

<style lang="scss">
	page,
	.my-container {
		height: 100%;
	}
</style>
