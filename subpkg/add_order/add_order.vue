<template>
	<view>
	
		<my-order :address="address" ref="order"></my-order>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: {
					
				},
				
				
			};
		},
		methods: {
			async getDefaultAddr() {
				const {
					data: res
				} = await uni.$http.get('/api/address/getDefaultAddr')
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				if (res.data.data != null && res.data.data != undefined) {
					this.$refs.order.updateAddr(res.data.data)
				}
				// this.$refs.order.updateAddr(this.address)
				
			}
		},
		onShow() {
			console.log("onShow")
			let pages = getCurrentPages()
			let curPage = pages[pages.length - 1]
			
			//第一次加载，获取默认地址
			if (JSON.stringify(this.address) === '{}' && JSON.stringify(curPage.data.address) === '{}') {
				// this.firstTime = false
				this.getDefaultAddr()
				
			}
			this.address = curPage.data.address
			
			//在show方法进行update的原因: navigateBack会带回来用户选择的地址参数，所以要把修改后的参数update给子组件
			//但是在一开始加载页面的时候address为空，所以不加载更新
			if (JSON.stringify(this.address) === '{}') return
			console.log(this.address)
			this.$refs.order.updateAddr(this.address)
			
		},
		onLoad() {
			
		},
		
		
		
		
	}
</script>

<style lang="scss">

</style>
