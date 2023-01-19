<template>
	<view class="post-container" @click="goToDetail(post.orderId)">
		<view class="poster-info" >
			<view class="info"  @click.stop="goToChat(post.openid)"  >
				<image class="avatar" :src="post.avatar"></image>
				<text class="nickname">{{post.nickname}}</text>
			</view>
			<text class="post-time">{{post.postTime}}</text>
		</view>

		<view class="post-content">
			<text class="title">{{post.title}}</text>
			<text class="content">{{post.content}}</text>
		</view>

		<view class="post-info">
			<view class="address">
				<image class="img-address" src="/static/home-icon/address.png"></image>
				<text class="text-address">{{post.address}}</text>
			</view>

			<view class="specific-info">
				<view class="cost">
					<image class="img-cost" src="../../static/home-icon/yuan.png"></image>
					<view class="money">
						<text class="currency">￥</text>
						<text class="text-cost">{{post.cost}}</text>
					</view>
				</view>
				<view class="expectedTime">
					<image class="img-expectedTime" src="../../static/home-icon/clock.png"></image>
					<view class="time">
						<text class="expectedStartTime">{{post.expectedStartTime}}</text>
						<text class="time-line">~</text>
						<text class="expectedEndTime">{{post.expectedEndTime}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-post",
		props: {
			post: {
				type: Object,
				default: {}
			},

		},
		data() {
			return {

			};
		},
		methods: {
			goToChat(openid) {
				
				uni.navigateTo({
					url: '/subpkg/chat/chat?openid=' + openid 
					
				})
				
			},
			goToDetail(orderId) {
				
				uni.navigateTo({
					url: '/subpkg/order_detail/order_detail?orderId=' + orderId
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.post-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		background-color: #FFF;
		margin-top: 5px;
		width: 750rpx;
		height: 360rpx;

		.poster-info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;

			.info {
				display: flex;

				justify-content: space-between;
				align-items: center;
				padding-left: 10rpx;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 45px;
					border: 2px solid #FFF;
					box-shadow: 0 1px 5px black;
				}

				.nickname {
					font-size: 13px;
					color: black;
					padding-left: 10rpx;
					font-weight: 580px;

				}

			}

			.post-time {
				font-size: 13px;
				color: gray;
			}

		}

		.post-content {
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-top: 10rpx;
			padding-left: 20rpx;
			// align-items: center;
			height: 300rpx;

			.title {
				font-size: 18px;
				font-weight: 650;

			}

			.content {
				// white-space: nowrap;
				padding-top: 5rpx;
				font-size: 14px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
			}
		}

		.post-info {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.address {
				padding-left: 5rpx;
				align-items: center;
				display: flex;

				.img-address {
					width: 60rpx;
					height: 60rpx;
					border-radius: 45px;
				}

				.text-address {
					padding-left: 5rpx;
					font-weight: 800;
				}
			}

			.specific-info {

				align-items: center;

				.cost {
					display: flex;
					align-items: center;

					.img-cost {
						width: 40rpx;
						height: 40rpx;
						border-radius: 45px;
					}

					.money {
						.currency {
							font-size: 13px;
						}

						.text-cost {
							font-size: 13px;
						}
					}
				}

				.expectedTime {
					display: flex;
					align-items: center;

					.img-expectedTime {
						width: 40rpx;
						height: 40rpx;
						border-radius: 45px;
					}

					.time {

						.expectedStartTime {
							font-size: 13px;
							font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
							color: #55aaff;
							font-weight: 550;
						}

						.time-line {
							font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
							color: #55aaff;
							font-weight: 550;
						}

						.expectedEndTime {
							font-size: 13px;
							font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
							color: #55aaff;
							font-weight: 550;
						}
					}
				}
			}
		}
	}
</style>
