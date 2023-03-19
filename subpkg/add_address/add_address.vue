<template>
	<view>
		<view class="info">
			<view class="first-line">

				<text class="receiver" id="receiver">收货人</text>
				<view class="first-input">
					<uni-easyinput placeholder="请输入收货人名字" :inputBorder="false" v-model="address.name"
						:clearable="false"></uni-easyinput>
				</view>

			</view>
			<view class="second-line">
				<text class="phoneNum">手机号码</text>
				<view class="second-input">
					<uni-easyinput type="number" placeholder="请输入收货人手机号码" :inputBorder="false"
						v-model="address.phoneNum" :clearable="false"></uni-easyinput>
				</view>
			</view>
			<view class="third-line">
				<text class="startingPoint">起点</text>
				<view class="third-input">
					<uni-easyinput placeholder="请输入起点" :inputBorder="false" v-model="address.startingPoint"
						:clearable="false"></uni-easyinput>
				</view>
			</view>
			<view class="fourth-line">
				<text class="destination">终点</text>
				<view class="fourth-input">
					<uni-easyinput placeholder="请输入终点" :inputBorder="false" v-model="address.destination"
						:clearable="false"></uni-easyinput>
				</view>
			</view>
			<view class="fifth-line">
				<radio :checked="address.isDefault" color="#5500ff" v-show="true" @click="clickHandler"></radio>
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
				// this.address = {
				// 	"name" : "张三",
				// 	"phoneNum": "123",
				// 	"startingPoint": "西六",
				// 	"destination": "图书馆"
				// }
				this.getAddressById(options.id)
			} else {
				console.log("啥也没有")
			}
		},
		data() {
			return {
				address: {}
			};
		},
		methods: {
			checkParam() {
				const queryObj = this.address

				if (queryObj == undefined || queryObj == null) {
					return uni.$showMsg("参数不能为空")
				}
				if (queryObj.name == undefined || queryObj.name == null || queryObj.name == "") {
					return uni.$showMsg("收件人名字不能为空")
				}
				if (queryObj.phoneNum == undefined || queryObj.phoneNum == null || queryObj.phoneNum == "") {
					return uni.$showMsg("手机号码不能为空")
				}
				if (queryObj.startingPoint == undefined || queryObj.startingPoint == null || queryObj.startingPoint ==
					"") {
					return uni.$showMsg("起点不能为空")
				}
				if (queryObj.destination == undefined || queryObj.destination == null || queryObj.destination == "") {
					return uni.$showMsg("终点不能为空")
				}

			},
			async addClick() {
				const queryObj = this.address
				const name = queryObj.name
				const phoneNum = queryObj.phoneNum
				const startingPoint = queryObj.startingPoint
				const destination = queryObj.destination
				//手机号正则
				const regx = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
				if (queryObj == undefined || queryObj == null) {
					return uni.$showMsg("参数不能为空")
				}
				if (name == undefined || name == null || name == "") {
					return uni.$showMsg("收件人名字不能为空")
				}
				if (name.length > 20) {
					return uni.$showMsg("名字长度不能大于20")
				}
				if (phoneNum == undefined || phoneNum == null || phoneNum == "") {
					return uni.$showMsg("手机号码不能为空")
				}
				if (!regx.test(phoneNum)) {
					return uni.$showMsg("请输入正确的手机号码")
				}
				if (startingPoint == undefined || startingPoint == null || startingPoint == "") {
					return uni.$showMsg("起点不能为空")
				}
				if (startingPoint.length > 20) {
					return uni.$showMsg("起点长度不能大于20")
				}
				if (destination == undefined || destination == null || destination == "") {
					return uni.$showMsg("终点不能为空")
				}
				if (destination.length > 20) {
					return uni.$showMsg("终点长度不能大于20")
				}

				queryObj.isDefault = this.address.isDefault ? 1 : 0
				const {
					data: res
				} = await uni.$http.post('/api/address/saveAddress', queryObj)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				uni.navigateBack()
			},
			clickHandler() {
				this.address.isDefault = !this.address.isDefault
			},
			async getAddressById(id) {
				const {
					data: res
				} = await uni.$http.get('/api/address/getAddress/' + id)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				const addr = res.data.data
				this.address = addr
				this.address.isDefault = addr.isDefault == 1

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
