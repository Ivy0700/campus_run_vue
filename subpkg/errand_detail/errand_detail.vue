<!-- 这个是对于用户本人和接单跑腿的页面 -->
<template>
	<view>
		<view class="container">
			<view class="errand-status">

				<text class="status">{{info.status}}</text>
				<image src="/static/post_icon/chevron-right.png" class="chevron"></image>
			</view>

			<view class="title-section">
				<text class="title">{{info.title}}</text>
			</view>

			<view class="middle-section">
				<view class="row1">
					<text class="row1-left">预期费用</text>
					<view class="row1-right">
						<image src="../../static/post_icon/money.png" class="image-money"></image>
						<text class="money">{{info.cost}}</text>
					</view>
				</view>

				<view class="row2">
					<text class="row2-left">起点</text>
					<text class="row2-right">{{info.startingPoint}}</text>
				</view>

				<view class="row3">
					<text class="row3-left">终点</text>
					<text class="row3-right">{{info.destination}}</text>
				</view>

			</view>

			<view class="bottom-section">
				<text class="content">{{info.content}}</text>
			</view>
		</view>
		<view class="bottom-button">
			<button class="button-one" @click="clickBtn" :class="cardType === 'order' && info.status === '未接单' ? '': 'displaynone'">编辑</button>
			<button class="button-three" @click="clickBtn" :class="cardType === 'errand' ? '': 'displaynone'">联系</button>
			<!-- <button class="button-four" @click="clickBtn" :class="'displaynone'">{{buttonChoice}}</button> -->
			<button class="button-two" @click="cancelOrder"
				v-if="info.status === '未接单' || info.status === '已接单' || info.status === '进行中'">取消</button>
			<button class="button-four" @click="getReview" :class="cardType === 'order' && info.status === '已完成'? '': 'displaynone'">评价</button>
			<button class="button-four" @click="getReview" :class="info.status === '已收到评价' || info.status === '已评价'? '': 'displaynone'">查看评价</button>
		</view>
		
		<uni-popup ref="popup" type="center">
			<uni-popup-dialog mode="input" title="订单评价" placeholder="请输入评价,最多200字" :maxLength="200" message="成功消息"
				:duration="2000" :before-close="true" @close="close" @confirm="confirm" :value="review.content"></uni-popup-dialog>
		
		</uni-popup>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			if (options.errandId !== undefined) {
				this.errandId = options.errandId
				this.buttonChoice = '联系'
				this.cardType = 'errand'
				// this.getErrandDetail()
			} else if (options.orderId !== undefined) {
				this.orderId = options.orderId
				this.buttonChoice = '编辑'
				this.cardType = 'order'
				// this.getOrderDetail()
			}

		},
		onShow() {
			if (this.cardType === 'errand') {
				this.getErrandDetail()
			} else if (this.cardType === 'order'){
				this.getOrderDetail()
			}
		},
		onUnload() {
			uni.setStorageSync("statusChanged", this.statusChanged)
		},
		data() {
			return {
				cardType: '',
				avatar: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				nickname: '匿名',
				info: {
					// cost: 3,
					// startingPoint: '西六',
					// destination: '图书馆',
					// title: '求帮忙,var(--status-bar-height) 此变量在微信小程序环境为固定 25px，',
					// content: 'var(--status-bar-height) 此变量在微信小程序环境为固定 25px，在 App 里为手机实际状态栏高度。当设置 navigationStyle:custom 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为 var(--status-bar-height) 的 view 放在页面顶部，避免页面内容出现在状态栏。由于在 H5 端，不存在原生导航栏和 tabbar，也是前端 div 模拟。如果设置了一个固定位置的居底 view，在小程序和 App 端是在 tabbar 上方，但在 H5 端会与 tabbar 重叠。此时可使用--window-bottom，不管在哪个端，都是固定在 tabbar 上方。目前 nvue 在 App 端，还不支持 --status-bar-height变量，替代方案是在页面 onLoad 时通过 uni.getSystemInfoSync().statusBarHeight 获取状态栏高度，然后通过 style 绑定方式给占位 view 设定高度。下方提供了示例代码',
					// createTime: '2022/12/29 10:00',
					// status: '已接单',
					// userId: '1234'
				},
				buttonChoice: '联系',
				clickUser: '',
				orderId: '',
				errandId: '',
				review: {},
				statusChanged: false
			};
		},
		methods: {
			cancelOrder() {
				const that = this;
				uni.showModal({
					title: '提示',
					content: '确认是否取消订单',
				 success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.cancel()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async cancel() {
				let id = null;
				if (this.cardType === 'errand') {
					id = this.info.orderId
				} else if (this.cardType === 'order'){
					id = this.orderId
				}
				const {
					data: res
				} = await uni.$http.post('/api/order/cancel', {orderId: id})
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				if (this.cardType === 'errand') {
					this.getErrandDetail()
				} else if (this.cardType === 'order'){
					this.getOrderDetail()
				}
				this.statusChanged = true
				return uni.$showMsg("取消成功")
				// if (res.data.data != null && res.data.data != undefined) {
				// 	this.info = res.data.data
				// }
			},
			clickBtn() {
				//1. 判断是谁点击的,如果是发起者本人，跳到编辑页面
				if (this.buttonChoice === '联系') {
					uni.navigateTo({
						url: '/subpkg/chat/chat?userId=' + this.info.userId
					})
				} else if (this.buttonChoice === '编辑') {
					uni.navigateTo({
						url: '/subpkg/update_order/update_order?orderId=' + this.orderId
					})
				}
				//2. 如果是骑手，跳到聊天页面
			},
			async getErrandDetail() {
				const {
					data: res
				} = await uni.$http.get('/api/errand/get/' + this.errandId)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				if (res.data.data != null && res.data.data != undefined) {
					this.info = res.data.data
				}
			},
			async getOrderDetail() {
				const {
					data: res
				} = await uni.$http.get('/order/getOrder/' + this.orderId)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				if (res.data.data != null && res.data.data != undefined) {
					this.info = res.data.data
				}
			},
			async getReview() {
				let id = null;
				if (this.cardType === 'errand') {
					id = this.info.orderId
				} else if (this.cardType === 'order'){
					id = this.orderId
				}
				const {data: res
				} = await uni.$http.get('/api/review/getReviewByOrder/' + id)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				if (res.data.data != null && res.data.data != undefined) {
					this.review = res.data.data
				}
				if (this.cardType === 'errand') {
					const content = this.review.content
					uni.showModal({
						title: '收到的评价',
						buttonText: "确定",
						showCancel: false,
						content: content,
					 success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					this.$refs.popup.open('center')
				}
			},
			close() {
				this.$refs.popup.close()
			},
			async confirm(value) {
				const status = this.info.status
				if (value === null || value.length === 0) {
					return uni.$showMsg("请输入评价内容")
				}
				
				console.log(value)
				this.review.reviewedId = this.info.employeeId
				this.review.orderId = this.info.id
				this.review.content = value
				const {
					data: res
				} = await uni.$http.post('/api/review/saveReview', this.review)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				this.getOrderDetail()
				if (status !== this.info.status) {
					this.statusChanged = true
				}
				// if (res.data.data != null && res.data.data != undefined) {
				// 	this.review = res.data.data
				// }
				this.$refs.popup.close()
			},	
		}
	}
</script>

<style lang="scss">
	.displaynone{
		display: none;
	}
	.container {
		padding-bottom: 100rpx;
	}
	.errand-status {
		align-items: center;
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 45rpx;
		padding-left: 30rpx;

		.status {
			font-size: 22px;
			font-weight: 650;
		}

		.chevron {
			padding-left: 15rpx;
			width: 20rpx;
			height: 20rpx;
		}
	}

	.title-section {
		background-color: white;
		border-radius: 10px;
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-top: 20rpx;
		align-items: center;
		padding-bottom: 30rpx;
		padding-top: 30rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;

		.title {
			font-size: 20px;

			font-weight: 700;
		}
	}

	.middle-section {
		background-color: white;
		border-radius: 10px;
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-top: 20rpx;
		padding: 20rpx 20rpx;
		font-size: 14px;

		.row1 {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.row1-left {
				color: gray;
			}

			.row1-right {
				align-items: center;
				display: flex;

				.image-money {
					justify-content: center;
					width: 30rpx;
					height: 30rpx;
					padding-left: 10rpx;
					padding-right: 4rpx;
				}

				.money {}
			}
		}

		.row2 {
			display: flex;
			justify-content: space-between;
			padding-top: 15rpx;

			.row2-left {
				color: gray;
			}

			.row2-right {}
		}

		.row3 {
			display: flex;
			justify-content: space-between;
			padding-top: 15rpx;

			.row3-left {
				color: gray;
			}

			.row3-right {}
		}
	}

	.bottom-section {
		background-color: white;
		border-radius: 10px;
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-top: 20rpx;
		align-items: center;
		padding: 15px 15px;

		.content {
			font-size: 15px;

			font-weight: 540;
		}
	}

	.bottom-button {
		position: fixed;
		bottom: 0;
		width: 100%;
		// z-index: 999;
		background-color: white;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-top: #efefef 1px solid;
		display: flex;
		align-items: center;

		.button-one {
			font-size: 15px;
			font-weight: 580;
			background-color: blue;
			color: #FFF;
			width: 300rpx;
			height: 75rpx;
			border-radius: 20px;

			text-align: center;
			vertical-align: middle;
		}
		.button-three {
			font-size: 15px;
			font-weight: 580;
			background-color: #aa55ff;
			color: #FFF;
			width: 300rpx;
			height: 75rpx;
			border-radius: 20px;
		
			text-align: center;
			vertical-align: middle;
		}
		.button-four {
			font-size: 15px;
			font-weight: 580;
			background-color: #ff702e;
			color: #FFF;
			width: 300rpx;
			height: 75rpx;
			border-radius: 20px;
			text-align: center;
			vertical-align: middle;
		}
		.button-two {
			font-size: 15px;
			font-weight: 580;
			background-color: red;
			color: #FFF;
			width: 300rpx;
			height: 75rpx;
			border-radius: 20px;
			text-align: center;
			vertical-align: middle;
		}
	}
</style>
