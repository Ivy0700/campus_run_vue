<template>
	<view>
		<view class="ordercard" @click="goToDetail">
			<view class="top-section">
				<text class="status">{{order.status}}</text>
				<text class="time">{{order.updateTime}}</text>
			</view>

			<view class="content">
				<text class="content-detail">{{"【" + order.title + "】" + order.content}}</text>
			</view>

			<view class="review1" v-if="order.status === '待评价'">

				<button class="review1-btn" type="default" @click.stop="goToReview">评价</button>

			</view>

		</view>
		<uni-popup ref="popup" type="center">
			<uni-popup-dialog mode="input" title="订单评价" placeholder="请输入评价,最多200字" :maxLength="200" message="成功消息"
				:duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>

		</uni-popup>
		<!-- <view class="review2" v-if="order.status === '已评价'" @click="getReview">
			<button class="review2-btn" type="default">查看评价</button>
		</view> -->

	</view>

</template>

<script>
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
		data() {
			return {
				content: ''
			};
		},
		methods: {
			goToReview() {
				this.$refs.popup.open('center')
			},
			close() {
				this.$refs.popup.close()
			},
			confirm() {

				this.$refs.popup.close()
			},
			goToDetail() {
				//对于用户而言是订单
				if (this.choice === 'order') {
					uni.navigateTo({
						url: '/subpkg/errand_detail/errand_detail?orderId=' + this.order.orderId
					})
				}
				//对于用户而言是接单
				//这是共用了一个页面，但是有的就一个参数，有的两个参数...
				if (this.choice === 'errand') {
					uni.navigateTo({
						url: '/subpkg/errand_detail/errand_detail?errandId=' + this.order.errandId
					})
				}
			},
			popupStop() {
				console.log("没啥用的方法")
			}

		}

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
			font-size: 12px;
			font-weight: 560;

			background-color: white;
			color: royalblue;
			width: 180rpx;
			height: 60rpx;
			border-radius: 20px;
			text-align: center;
			position: relative;
			// right: 20%;
			left: 38%;
			vertical-align: middle;
			border: 2px solid royalblue;
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
