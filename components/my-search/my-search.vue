<template>
	<!-- <view class="my-search-container" :style="{'background-color':bgcolor}" > -->
	<!-- 使用 view 组件模拟 input 输入框的样式 -->
	<view class="my-search-box" :style="{'border-radius' : radius + 'px'}" @click="searchBoxHandler">
		<uni-icons type="search" size="17"></uni-icons>
		<text class="placeholder">搜索</text>
	</view>
	<!-- </view> -->
</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgcolor: {
				type: String,
				default: '#C00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {

			};
		},
		methods: {
			searchBoxHandler() {
				console.log("~~~")
				this.$emit('click')
			}
		}

	}
</script>

<style lang="scss">
	// .my-search-container {
	// 	height: 50px;
	// 	// background-color: #C00000;
	// 	display: flex;
	// 	align-items: center;
	// 	padding: 0 10px;

	.my-search-box {
		height: 36px;
		background-color: #FFFFFF;
		// border-radius: 17px;
		width: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid #efefef;
		padding-top: 5rpx;

	}

	.placeholder {
		font-size: 15px;
		margin-left: 5px;
	}

	// }
</style>
