<template>
	<view>
		<view>
			<!-- 地址选择 -->
			<view class="address">
				<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
					<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress" style="background-color: #228BE6;">请选择收获地址</button>
				</view>
				<view class="address-info-box" v-else @click="chooseAddress">
					<view class="row1">
						<view class="row1-left">
							<view class="receiver">收货人: {{address.name}}</view>
						</view>
						<view class="row1-right">
							<view class="phone">电话：{{address.phoneNum}}</view>
							<uni-icons type="arrowright" size="16"></uni-icons>
						</view>
					</view>

					<view class="row2">
						<view class="row2-left">起点：</view>
						<view class="row2-right">{{address.startingPoint}}</view>
					</view>
					<view class="row3">
						<view class="row3-left">终点： </view>
						<view class="row3-right">{{address.destination}}</view>
					</view>
				</view>
			</view>

			<!-- 标题填写 -->
			<view class="title">
				<uni-easyinput v-model="title" placeholder="请输入标题, 尽量简练哦" maxlength="20"
					placeholderStyle="font-size:15px;font-weight:540;padding-left:5px;" suffixIcon="false"></uni-easyinput>
			</view>
			<!-- 预期费用 -->
			<view class="cost">
				<text class="cost-left">预期费用</text>
				<view class="cost-right">
					<image src="/static/post_icon/money.png" class="img-money"></image>
					<uni-easyinput v-model="cost" class="money" type="number" suffixIcon="false"></uni-easyinput>
				</view>
			</view>

			<!-- 内容 -->
			<view class="content">
				<uni-easyinput v-model="content" type="textarea" maxlength="400" autoHeight="true"   placeholder="内容">
				</uni-easyinput>
			</view>
			
			<!--  发布按钮 -->
			<view class="btn">
				<button type="primary" style="width: 70%;color:white; background-color: blue;" @click="saveOrder">发布</button>
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-order",
		data() {
			return {
				address : {
					
				},
				// address: {
				// 	userName: '张三',
				// 	telNumber: '123456',
				// 	startingPoint: '西三',
				// 	destination: '图书馆'
				// },
				title: '',
				cost: '',
				content: '',
				id: null
			};
		},
		props: {
			// _address: {
			// 	type: Object,
			// 	default: {}
			// }
		},
		methods: {
			chooseAddress() {
				uni.navigateTo({
					url: '/subpkg/address/address?canClick=true'
				})
				
			},
			updateAddr(addr) {
				this.address = addr
			},
			async getOrder(id) {
				const {
					data: res
				} = await uni.$http.get('/order/getOrder/' + id)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				
				if (res.data.data != null && res.data.data != undefined) {
					// this.info = res.data.data
					const info = res.data.data
					this.address = {
						name: info.name,
						phoneNum: info.phoneNum,
						startingPoint: info.startingPoint,
						destination: info.destination
					}
					this.title = info.title
					this.content = info.content
					this.cost = info.cost	
					this.id = info.id
				}
			},
			async saveOrder() {
				const reg = /^[0-9]+(.[0-9]{1,3})?$/
				if (this.address == undefined || this.address == null || JSON.stringify(this.address) === '{}') {
					return uni.$showMsg("地址不能为空")
				}
				if (this.title === "" || this.title === undefined || this.title === null) {
					return uni.$showMsg("标题不能为空")
				}
				if (this.title.length > 30) {
					return uni.$showMsg("标题长度不能超过30个字")
				}
				if (this.cost === "" || this.cost === undefined || this.cost === null) {
					return uni.$showMsg("预期费用不能为空")
				}
				if (!reg.test(this.cost)) {
					return uni.$showMsg("请输入正确的数字，小数最多三位")
				}
				
				if (this.content === "" || this.content === undefined || this.content === null) {
					return uni.$showMsg("内容不能为空")
				}
				const queryObj = {
					title: this.title, 
					content: this.content,
					cost: this.cost,
					startingPoint: this.address.startingPoint,
					destination: this.address.destination,
					phoneNum: this.address.phoneNum,
					name: this.address.name,
					id: this.id
				}
				const {
					data: res
				} = await uni.$http.post('/api/order/save', queryObj)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				return uni.$showMsg("发布成功")
				
			}
		},
		watch: {
			// _address: {
			// 	deep: true,
			// 	handler(newVal, oldVal) {
			// 		console.log("newVal:" +  JSON.stringify(newVal))
			// 		console.log("oldVal:" +  JSON.stringify(oldVal))
					
			// 		uni.showToast({
			// 			title: "子组件页面刷新"
			// 		})
			// 	}
			// }
		}
	}
</script>

<style lang="scss">
	.title {
		background-color: white;
		

	}

	.cost {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		height: 100rpx;
		border-bottom: 2px #efefef solid;
		.cost-left {
			font-size: 14px;
			font-weight: 540;
			padding-left: 25rpx;
		}

		.cost-right {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 250rpx;
			padding-right: 4rpx;
			.img-money {
				justify-content: center;
				width: 30rpx;
				height: 30rpx;
				padding-left: 10rpx;
				padding-right: 4rpx;
			}

			.money {
				justify-content: center;
				
			}
		}
	}

	.content {
		background-color: white;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-top: 20rpx;
		justify-content: center;
		
	}

	.btn {
		margin-top: 40rpx;
	}

	.address {

		border: 2px solid #efefef;
		margin-bottom: 2px;
		background-color: white;

		padding-left: 3px;
		padding-right: 3px;

	}

	.address-choose-box {
		height: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.address-info-box {
		font-size: 12px;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.row1-left {
				.receiver {}
			}

			.row1-right {
				display: flex;
				justify-content: space-between;
			}
		}

		.row2 {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				//不换行
				white-space: nowrap;
			}

			.row2-right {}
		}

		.row3 {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			.row3-left {
				//不换行
				white-space: nowrap;
			}

			.row3-right {}
		}
	}
</style>
