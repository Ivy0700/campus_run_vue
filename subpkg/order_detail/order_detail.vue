<!-- 这是面向普通用户查看他人订单页面 -->
<template>
	<view>
		<view class="userinfo">
			<view class="userinfo-left">
				<image :src="avatar" class="image-avatar"></image>
				<text class="nickname">{{nickname}}</text>
			</view>
			
			<text class="post-time">{{info.createTime}}</text>
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
		
		<view class="bottom-button" v-if="info.status === '未接单'">
			<button class="button" @click="acceptOrder">接单</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log(options)
		},
		data() {
			return {
				avatar: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				nickname: '匿名',
				info: {
					cost: 3,
					startingPoint: '西六',
					destination: '图书馆',
					title: '求帮忙,var(--status-bar-height) 此变量在微信小程序环境为固定 25px，',
					content: 'var(--status-bar-height) 此变量在微信小程序环境为固定 25px，在 App 里为手机实际状态栏高度。当设置 navigationStyle:custom 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为 var(--status-bar-height) 的 view 放在页面顶部，避免页面内容出现在状态栏。由于在 H5 端，不存在原生导航栏和 tabbar，也是前端 div 模拟。如果设置了一个固定位置的居底 view，在小程序和 App 端是在 tabbar 上方，但在 H5 端会与 tabbar 重叠。此时可使用--window-bottom，不管在哪个端，都是固定在 tabbar 上方。目前 nvue 在 App 端，还不支持 --status-bar-height变量，替代方案是在页面 onLoad 时通过 uni.getSystemInfoSync().statusBarHeight 获取状态栏高度，然后通过 style 绑定方式给占位 view 设定高度。下方提供了示例代码',
					createTime: '2022/12/29 10:00',
					status: '已完成'
				}
			};
		},
		methods: {
			//接单
			acceptOrder() {
				uni.showModal({
				    title: '提示',
				    content: '确认是否接单',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.userinfo {
		// background-color: white;
		// border-radius: 13px;
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.userinfo-left {
			padding-left: 15rpx;
			padding-top: 10rpx;
			align-items: center;
			display: flex;
			.image-avatar {
				width: 60rpx;
				height: 60rpx;
				border-radius: 45px;
				border: 2px solid #FFF;
				box-shadow: 0 1px 5px black;
			}
			
			.nickname {
				padding-left: 10rpx;
				font-size: 14px;
				font-weight: 600;
			}
		}
		
		
		.post-time {
			font-size: 13px;
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
			
			.row2-right {
				
			}
		}
		
		.row3 {
			display: flex;
			justify-content: space-between;
			padding-top: 15rpx;
			.row3-left {
				color: gray;
			}
			
			.row3-right {
				
			}
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
		position: sticky;
		bottom: 0;
		z-index: 999;
		width: 100%;
		background-color: white;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-top: #efefef 1px solid;
		.button {
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
	}
</style>
