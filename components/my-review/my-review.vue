<template>
	<view class="review-card">
		<view class="first-line">
			<view class="info"  @click.stop="goToChat(info.openid)"  >
				<image class="avatar" :src="info.avatar"></image>
				<text class="nickname">{{info.nickname}}</text>
			</view>
			<text class="time">{{info.postTime}}</text>
		</view>
		<view class="second-line" @click="goToPost">
			<text class="detail">【{{info.title}}】{{info.content}}</text>
		</view>
		<view class="third-line">
			<text class="review">{{info.review}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-review",
		props: {
			info: {
				type: Object,
				default: {}
			}
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
			goToPost() {
				uni.navigateTo({
					url: '/subpkg/order_detail/order_detail?orderId=' + this.info.orderId
				})
			}
		}
	}
</script>

<style lang="scss">
	.review-card {
		background-color: white;
		border-top: 2px solid #efefef;
		padding-top: 15rpx;
	}
	.first-line {
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		// width: 100%;
		padding-left: 20rpx;
		padding-right: 20rpx;
		
		.info {
			display: flex;
	
			justify-content: space-between;
			align-items: center;
			padding-left: 10rpx;
	
			.avatar {
				width: 65rpx;
				height: 65rpx;
				border-radius: 45px;
				border: 2px solid #FFF;
				box-shadow: 0 1px 5px black;
			}
	
			.nickname {
				font-size: 16px;
				color: black;
				padding-left: 10rpx;
				font-weight: 600px;
	
			}
	
		}
	
		.time {
			font-size: 14px;
			color: gray;
		}
	
	}
	
	.second-line {
		background-color: lightgray;
		border-radius: 15rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-top: 15rpx;
		padding-top: 10rpx;
		padding-bottom: 45rpx;
		font-size: 15px;
		// height: 100rpx;
		.detail {
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			padding-left: 10rpx;
			padding-right: 10rpx;
		}
	}
	
	.third-line {
		padding-left: 20rpx;
		padding-top: 10rpx;
		padding-bottom: 40rpx;
		font-weight: 700;
		
		.review {
			
			
		}
	}
	
	
</style>