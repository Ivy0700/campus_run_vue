<template>
	<view>
		<!-- 这里要处理两种情况，地址可不可以点的问题.... -->
		<!-- <button type="primary" @click="click">点我</button> -->
		<view class="top-section">

			<block v-for="(address, i) in list" :key="i" v-if="list.length !== 0">

				<view class="address-card" @click="choose(address)">
					<text class="close">×</text>
					<view class="address-info">
						<text class="startingPoint">{{address.startingPoint}}</text>
						<text class="arrow">→</text>
						<text class="destination">{{address.destination}}</text>
					</view>
					<view class="user-info">
						<text class="receiver">{{address.receiver}}</text>
						<text class="phoneNum">{{address.phoneNum}}</text>
					</view>

					<view class="bottom-section">

						<radio :checked="address.isDefault" color="#5500ff" v-show="true" @click="clickHandler(address)"></radio>
						<text class="bottom-text">设置为默认地址</text>
						<button type="default" class="update-btn" @click="updateClick(address.id)">编辑</button>
					</view>
				</view>
			</block>
		</view>
		<view class="add-section">
			<button class="add-btn" type="default" @click="addClick">+ 添加地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			if (options.canClick !== undefined) {
				this.canClick = options.canClick
			}
		},
		data() {
			return {
				canClick: false,
				list: [{
						id: '1',
						startingPoint: '广东省深圳市龙岗区坂田街道万科第五园',
						// startingPoint: '图书馆',
						destination: '图书馆',
						isDefault: false,
						receiver: '张三',
						phoneNum: '13212345678'
					},
					{
						id: '1',
						startingPoint: '广东省深圳市龙岗区坂田街道万科第五园',
						// startingPoint: '图书馆',
						destination: '图书馆',
						isDefault: false,
						receiver: '张三',
						phoneNum: '13212345678'
					},
					{
						id: '1',
						startingPoint: '广东省深圳市龙岗区坂田街道万科第五园',
						// startingPoint: '图书馆',
						destination: '图书馆',
						isDefault: false,
						receiver: '张三',
						phoneNum: '13212345678'
					},
					{
						id: '1',
						startingPoint: '广东省深圳市龙岗区坂田街道万科第五园',
						// startingPoint: '图书馆',
						destination: '图书馆',
						isDefault: false,
						receiver: '张三',
						phoneNum: '13212345678'
					}
				]
				// address: 
			};
		},
		methods: {
			clickHandler(address) {

				address.isDefault = !address.isDefault

			},
			updateClick(id) {
				uni.navigateTo({
					url: '/subpkg/add_address/add_address?id=' + id
				})
			},
			addClick() {
				uni.navigateTo({
					url: '/subpkg/add_address/add_address'
				})
			},
			choose(address) {
				if (this.canClick) {
					let pages = getCurrentPages()
					let beforePages = pages[pages.length - 2]
					beforePages.data.address = address
					uni.navigateBack({
						delta: 1
					})
				}
			}
			// click() {
			// 	let pages = getCurrentPages()
			// 	let beforePages = pages[pages.length - 2]
			// 	beforePages.data.address = {
			// 		userName: '李四'
			// 	}
			// 	uni.navigateBack({
			// 		delta:1
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	.top-section {
		// margin-bottom: 70rpx;
		padding-bottom: 100rpx;
		// margin-top: 70rpx;

		.address-card {
			background-color: white;
			border-radius: 12px;
			margin-top: 20rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			box-shadow: 0 1px 3px darkgray;

			.close {
				font-size: 35px;
				font-weight: 400;
				left: 90%;
				align-items: center;
				position: relative;
				color: dimgray;
			}

			.address-info {
				align-items: center;
				display: flex;
				justify-content: space-between;
				padding-left: 20rpx;
				padding-right: 20rpx;

				.startingPoint {
					text-align: center;
					width: 40%;
					white-space: pre-line;
					font-size: 14px;
				}

				.arrow {
					width: 15%;
					font-size: 30px;
					text-align: center;
				}

				.destination {
					width: 40%;
					text-align: center;
					white-space: pre-line;
					font-size: 14px;
				}
			}

			.user-info {
				display: flex;
				padding-left: 20rpx;

				padding-bottom: 20rpx;
				border-bottom: 2px solid #efefef;
				padding-top: 15rpx;
				align-items: center;

				.receiver {
					font-weight: 600;
					font-size: 16px;
				}

				.phoneNum {
					padding-left: 20rpx;
					font-size: 13px;
					color: dimgray;
					font-weight: 530;
				}
			}

			.bottom-section {
				padding-left: 20rpx;
				padding-top: 20rpx;
				font-size: 14px;
				align-items: center;
				display: flex;
				padding-bottom: 15rpx;

				.bottom-text {
					padding-left: 20rpx;

				}

				.update-btn {
					font-size: 14px;
					font-weight: 560;

					background-color: white;
					color: #5500ff;
					width: 130rpx;
					height: 60rpx;
					border-radius: 20px;
					text-align: center;
					position: relative;
					// right: 30%;
					left: 10%;
					line-height: 50rpx;
					vertical-align: middle;
					border: 2px solid #5500ff;

				}
			}


		}
	}

	.add-section {
		position: fixed;
		bottom: 0;
		width: 100%;
		// z-index: 999;
		height: 70rpx;
		background-color: white;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-top: #efefef 1px solid;
		justify-content: center;

		.add-btn {
			font-size: 15px;
			font-weight: 580;
			background-color: blue;
			color: #FFF;
			width: 500rpx;
			height: 75rpx;
			border-radius: 20px;

			text-align: center;
			vertical-align: middle;
		}
	}
</style>
