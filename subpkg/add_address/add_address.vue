<template>
	<view>
		<view class="info">
			<view class="first-line">

				<text class="receiver" id="receiver">收货人</text>
				<view class="first-input">
					<uni-easyinput placeholder="请输入收货人名字" :inputBorder="false" v-model="address.receiver" :clearable="false"></uni-easyinput>
				</view>

			</view>
			<view class="second-line">
				<text class="phoneNum">手机号码</text>
				<view class="second-input">
					<uni-easyinput type="number" placeholder="请输入收货人手机号码" :inputBorder="false" v-model="address.phoneNum" :clearable="false"></uni-easyinput>
				</view>
			</view>
			<view class="third-line">
				<text class="startingPoint">起点</text>
				<view class="third-input">
					<uni-easyinput placeholder="请输入起点" :inputBorder="false" v-model="address.startingPoint" :clearable="false"></uni-easyinput>
				</view>
			</view>
			<view class="fourth-line">
				<text class="destination">终点</text>
				<view class="fourth-input">
					<uni-easyinput placeholder="请输入终点" :inputBorder="false" v-model="address.destination" :clearable="false"></uni-easyinput>
				</view>
			</view>
			<view class="fifth-line">
				<radio :checked="isDefault" color="#5500ff" v-show="true" @click="clickHandler"></radio>
				<text class="default-text">设置为默认地址</text>
			</view>
		</view>

		<view class="add-section">
			<button class="add-btn" type="default" @click="addClick">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {

			if (options.id !== undefined && options.id !== null) {
				this.address = {
					"receiver" : "张三",
					"phoneNum": "123",
					"startingPoint": "西六",
					"destination": "图书馆"
				}
			} else {
				console.log("啥也没有")
			}
		},
		data() {
			return {
				isDefault: false,
				address: {}
			};
		},
		methods: {
			addClick() {

			},
			clickHandler() {
				this.isDefault = !this.isDefault
			}
		}
	}
</script>
<style>
	page {
		background-color: white;
	}
</style>
<style lang="scss">
	.info {
		margin-top: 30rpx;

		.first-line {
			display: flex;
			justify-content: space-between;
			align-items: center;

			padding-left: 20rpx;
			// border-bottom: 2px solid #efefef;
			padding-bottom: 10rpx;

			.receiver {
				font-size: 15px;
			}

			.first-input {
				width: 400rpx;
				justify-content: center;
			}
		}
		// .first-input::after{
		// 	content: ' ';
		// 	width: 90%;
		// 	color: #efefef;
		// }

		.second-line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// border-bottom: 2px solid #efefef;
			padding-left: 20rpx;
			padding-top: 10rpx;
			padding-bottom: 10rpx;

			.phoneNum {
				font-size: 15px;
			}

			.second-input {
				width: 400rpx;
				justify-content: center;
			}
		}

		.third-line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// border-bottom: 2px solid #efefef;
			padding-left: 20rpx;
			padding-top: 10rpx;
			padding-bottom: 10rpx;

			.startingPoint {
				font-size: 15px;
			}

			.third-input {
				width: 400rpx;
				justify-content: center;
			}
		}

		.fourth-line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// border-bottom: 2px solid #efefef;
			padding-left: 20rpx;
			padding-top: 10rpx;
			padding-bottom: 10rpx;

			.destination {
				font-size: 15px;
			}

			.fourth-input {
				width: 400rpx;
				justify-content: center;
			}
		}

		.fifth-line {
			padding-top: 20rpx;
			padding-left: 20rpx;
			align-items: center;
			display: flex;
			.default-text {
				font-size: 15px;
				padding-left: 15rpx;
			}
		}

	}

	.add-section {
		// position: fixed;
		// bottom: 0;
		// width: 100%;
		// z-index: 999;
		// height: 70rpx;
		background-color: white;
		padding-top: 120rpx;
		padding-bottom: 10rpx;
		// border-top: #efefef 1px solid;
		justify-content: center;

		.add-btn {
			font-size: 15px;
			font-weight: 580;
			background-color: #5500ff;
			color: #FFF;
			width: 500rpx;
			height: 75rpx;
			border-radius: 20px;

			text-align: center;
			vertical-align: middle;
		}
	}
</style>
