<template>
	<view>
		<view class="ordercard" @click="goToDetail">
			<view class="top-section">
				<text class="status">{{order.status}}</text>
				<text class="time">{{getTime}}</text>
			</view>

			<view class="content">
				<text class="content-detail">{{"【" + order.title + "】" + order.content}}</text>
			</view>

			<view class="review1" v-if="order.status === '已完成' || order.status === '已评价' || order.status ==='已收到评价'">

				<button class="review1-btn" type="default" @click.stop="goToReview">
					<label class="btn-text">
						{{getReviewText}}
					</label>
				</button>

			</view>
			
			<view class="delivered-view" v-if="choice === 'errand' && order.status === '进行中'">
				<button class="btn-delivered" type="default" @click.stop="goToDelivered">
					<label class="btn-delivered-text">
						确认送达
					</label>
				</button>
			</view>

			<view class="delivered-view" v-if="choice === 'order' && order.status === '已送达'">
				<button class="btn-delivered" type="default" @click.stop="goToOrderDelivered">
					<label class="btn-delivered-text">
						确认送达
					</label>
				</button>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<uni-popup-dialog mode="input" title="订单评价" placeholder="请输入评价,最多200字" :maxLength="200" message="成功消息"
				:duration="2000" :before-close="true" @close="close" @confirm="confirm" :value="review.content"></uni-popup-dialog>

		</uni-popup>
		<!-- <view class="review2" v-if="order.status === '已评价'" @click="getReview">
			<button class="review2-btn" type="default">查看评价</button>
		</view> -->

	</view>

</template>

<script>
	import dateTool from '../../tools/date_tool.js';
	export default {
		name: "my-ordercard",
		props: {
			order: {
				type: Object,
				default: {}
			},
			choice: {
				type: String,
				default: ''
			}

		},
		computed: {
			getTime() {
				
				return dateTool.getPostTime(this.order.updateTime)
			},
			getReviewText() {
				if (this.choice === 'order') {
					if (this.order.status === '已完成') {
						return '评价'
					} else if (this.order.status === '已评价') {
						return '查看评价'
					}
				} else if (this.choice === 'errand') {
					if (this.order.status === '已收到评价') {
						return '查看评价'
					}
				}
			}
		},
		data() {
			return {
				content: '',
				review: {}
			};
		},
		methods: {
			async goToReview() {
				let id = null
				if (this.order.status === '已评价' || this.order.status === '已收到评价') {
					
					if (this.choice === 'order') {
						id = this.order.id
					} else if (this.choice === 'errand') {
						id = this.order.orderId
					}
					const {
						data: res
					} = await uni.$http.get('/api/review/getReviewByOrder/' + id)
					console.log(res)
					if (res.code !== 20000) {
						return uni.$showMsg()
					}
					if (res.data.data != null && res.data.data != undefined) {
						this.review = res.data.data
					}
					if (this.choice === 'errand') {
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
				}
				
			},
			close() {
				this.$refs.popup.close()
			},
			async confirm(value) {
				if (value === null || value.length === 0) {
					return uni.$showMsg("请输入评价内容")
				}
				
				console.log(value)
				this.review.reviewedId = this.order.employeeId
				this.review.orderId = this.order.id
				this.review.content = value
				const {
					data: res
				} = await uni.$http.post('/api/review/saveReview', this.review)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				this.$emit("getOrderList")
				// if (res.data.data != null && res.data.data != undefined) {
				// 	this.review = res.data.data
				// }
				this.$refs.popup.close()
			},
			goToDetail() {
				//对于用户而言是订单
				if (this.choice === 'order') {
					uni.navigateTo({
						url: '/subpkg/errand_detail/errand_detail?orderId=' + this.order.id
					})
				}
				//对于用户而言是接单
				//这是共用了一个页面，但是有的就一个参数，有的两个参数...
				if (this.choice === 'errand') {
					uni.navigateTo({
						url: '/subpkg/errand_detail/errand_detail?errandId=' + this.order.id
					})
				}
			},
			popupStop() {
				console.log("没啥用的方法")
			},
			goToDelivered() {
				const that = this
				uni.showModal({
					title: '提示',
					content: '确认是否已送达',
				 success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.updateErrandStatus("DELIVERED")
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async updateErrandStatus(status) {
				const queryObj = this.order
				queryObj.status = status
				const {
					data: res
				} = await uni.$http.post('/api/errand/save/', queryObj)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				console.log("this.choice:" + this.choice)
				if (this.choice === 'order') {
					console.log("我进来了")
					this.$emit("getOrderList")
				} else if (this.choice === 'errand') {
					console.log("我进来了")
					this.$emit("getErrandList")
				}
				
			},
			goToOrderDelivered() {
				const that = this
				uni.showModal({
					title: '提示',
					content: '确认是否已送达',
				 success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							that.updateOrderStatus("FINISHED")
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async updateOrderStatus(status) {
				const queryObj = this.order
				queryObj.status = status
				const {
					data: res
				} = await uni.$http.post('/api/order/save/', queryObj)
				console.log(res)
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				console.log("this.choice:" + this.choice)
				if (this.choice === 'order') {
					console.log("我进来了")
					this.$emit("getOrderList")
				} else if (this.choice === 'errand') {
					console.log("我进来了")
					this.$emit("getErrandList")
				}
				
			},

		},
		

	}
</script>

<style lang="scss">
	.ordercard {
		background-color: white;
		border-radius: 10px;
		margin-top: 15rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;

		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.top-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 10rpx;

		.status {
			padding-left: 10rpx;
			font-size: 20px;
			font-weight: 600;
		}

		.time {
			font-size: 14px;
			color: gray;
		}
	}

	.content {
		padding-top: 10rpx;
		padding-bottom: 18rpx;

		display: flex;

		.content-detail {
			font-size: 15px;
			color: dimgray;
			overflow: hidden;
			text-overflow: ellipsis;
			// display: -webkit-box;
			// line-clamp: 2;
			// -webkit-box-orient: vertical;
			// -webkit-line-clamp: 2;
			white-space: nowrap;


		}
	}

	.review1 {
		
		padding-bottom: 18rpx;
		.review1-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			
			padding-bottom: 25rpx;
			

			background-color: white;
			color: royalblue;
			width: 180rpx;
			height: 60rpx;
			border-radius: 20px;
			
			position: relative;
			// right: 20%;
			left: 38%;
			
			border: 2px solid royalblue;
			
			.btn-text {
				font-size: 12px;
				font-weight: 560;
				text-align: center;
				vertical-align: middle;
				padding-top: 20rpx;
			}
		}
	}
	
	.delivered-view {
		
		padding-bottom: 18rpx;
		.btn-delivered {
			display: flex;
			justify-content: center;
			align-items: center;
			
			padding-bottom: 25rpx;
			
	
			background-color: white;
			color: royalblue;
			width: 180rpx;
			height: 60rpx;
			border-radius: 20px;
			
			position: relative;
			// right: 20%;
			left: 38%;
			
			border: 2px solid royalblue;
			
			.btn-delivered-text {
				font-size: 12px;
				font-weight: 560;
				text-align: center;
				vertical-align: middle;
				padding-top: 20rpx;
			}
		}
	}

	// .review2 {
	// 	padding-bottom: 15rpx;
	// 	.review2-btn {
	// 		font-size: 12px;
	// 		font-weight: 560;

	// 		background-color: royalblue;
	// 		color: white;
	// 		width: 180rpx;
	// 		height: 60rpx;
	// 		border-radius: 20px;
	// 		text-align: center;
	// 		position: relative;
	// 		// right: 20%;
	// 		left: 38%;
	// 		vertical-align: middle;
	// 		border: 2px solid royalblue;
	// 	}
	// }
</style>
