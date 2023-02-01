<template>
	<view>
		<view class="userinfo">
			<image :src="userinfo.avatar" class="avatar"></image>
			<text class="nickname">{{userinfo.nickname}}</text>
		</view>

		<view class="middle-card">
			<navigator class="first" url="../../subpkg/orderlist/orderlist">
				<image class="first-image" src="/static/my-icon/shopping-cart.png"></image>
				<text class="first-text">订单</text>
			</navigator>
			<navigator class="second" url="../../subpkg/errandlist/errandlist">
				<image class="second-image" src="/static/my-icon/note.png"></image>
				<text class="second-text">接单</text>
			</navigator>
			<navigator class="third" url="../../subpkg/review/review">
				<image class="third-image" src="../../static/my-icon/comment.png"></image>
				<text class="third-text">评价</text>
			</navigator>
			<navigator class="fourth" url="../../subpkg/address/address">
				<image class="fourth-image" src="../../static/my-icon/address.png"></image>
				<text class="fourth-text">地址管理</text>
			</navigator>
		</view>

		<view class="choice">
			<view class="left-section" @click="clickLeft" :style="{color: leftColor}">
				<text class="left">订单</text>
				<text class="left-num">{{orderNum}}</text>
			</view>
			<view class="right-section" @click="clickRight" :style="{color: rightColor}">
				<text class="right">接单</text>
				<text class="right-num">{{errandNum}}</text>
			</view>

		</view>

		<!-- 跑腿需求列表 -->
		<block v-for="(order, i) in list" :key="i" v-if="list.length !== 0">
			<my-ordercard :order="order" :choice="choice"></my-ordercard>
		</block>
		<view class="empty-section" v-if="list.length === 0">
			<image class="empty-img" mode="widthFix" src="https://img.icons8.com/stickers/100/null/list-is-empty.png">
			</image>
			<text class="empty-text">您还没有相关的订单</text>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	import user from '../../store/user';
	export default {
		name: "my-userinfo",
		computed: {
			...mapState('m_user', ['userinfo'])
		},
		data() {
			return {
				avatar: "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
				nickname: "123",
				list: [
					// {
					// 	"status": "待评价",
					// 	"updateTime": "10-01 11:59",
					// 	"title": "求帮忙",
					// 	"content": "1233333333333333333333asdddddddddddddddddddd"
					// },
					// {
					// 	"status": "已评价",
					// 	"updateTime": "10-01 11:59",
					// 	"title": "求帮忙",
					// 	"content": "1233333333333333333333asdddddddddddddddddddd"
					// }
				],
				leftColor: 'blue',
				rightColor: 'black',
				orderNum: 0,
				errandNum: 0,
				choice: '',
			};
		},
		methods: {
			clickLeft() {
				this.leftColor = '#0000ff'
				this.rightColor = 'black'
				this.choice = 'order'
				this.list = [{
						"status": "待评价",
						"updateTime": "10-01 11:59",
						"title": "求帮忙",
						"content": "1233333333333333333333asdddddddddddddddddddd",
						"orderId": "1234"
					},
					{
						"status": "已评价",
						"updateTime": "10-01 11:59",
						"title": "求帮忙",
						"content": "1233333333333333333333asdddddddddddddddddddd",
						"orderId": "1234"
					}
				]
			},
			clickRight() {
				this.leftColor = 'black'
				this.rightColor = '#0000ff'
				this.choice = 'errand'
				this.list = [{
						"status": "已完成",
						"updateTime": "10-01 11:59",
						"title": "求帮忙",
						"content": "1233333333333333333333asdddddddddddddddddddd",
						"errandId": "1245"
					},
					{
						"status": "正在跑腿中",
						"updateTime": "10-01 11:59",
						"title": "求帮忙",
						"content": "1233333333333333333333asdddddddddddddddddddd",
						"errandId": "1245"
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	.userinfo {
		height: 350rpx;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.avatar {
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: 2px solid #FFF;
			box-shadow: 0 1px 5px black;
		}

		.nickname {
			font-size: 16px;
			color: black;
			font-weight: bold;
			margin-top: 10px;

		}
	}

	.middle-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 70rpx;
		background-color: white;
		border-radius: 10px;
		margin-left: 10rpx;
		margin-right: 10rpx;

		.first {
			display: flex;
			flex-direction: column;
			align-items: center;

			.first-image {
				width: 60rpx;
				height: 60rpx;
				border-radius: 45px;
			}

			.first-text {
				padding-top: 5rpx;
				font-size: 12px;
			}
		}

		.second {
			display: flex;
			flex-direction: column;
			align-items: center;

			.second-image {
				width: 55rpx;
				height: 55rpx;
				border-radius: 45px;
			}

			.second-text {
				padding-top: 10rpx;
				font-size: 12px;
			}
		}

		.third {
			display: flex;
			flex-direction: column;
			align-items: center;

			.third-image {
				width: 60rpx;
				height: 60rpx;
				border-radius: 45px;
			}

			.third-text {
				padding-top: 5rpx;
				font-size: 12px;
			}
		}

		.fourth {
			display: flex;
			flex-direction: column;
			align-items: center;

			.fourth-image {
				width: 60rpx;
				height: 60rpx;
				border-radius: 45px;
			}

			.fourth-text {
				padding-top: 5rpx;
				font-size: 12px;
			}
		}
	}

	.choice {
		margin-top: 30rpx;
		background-color: white;
		border-radius: 10px;
		border-bottom: 1px solid #efefef;
		box-shadow: 0 0 5px black;
		align-items: center;
		margin-left: 10rpx;
		margin-right: 10rpx;
		display: flex;
		justify-content: space-around;
		padding-top: 13rpx;
		padding-bottom: 13rpx;

		.left-section {
			align-items: center;

			.left {
				font-size: 14px;
				font-weight: 550;
			}

			.left-num {
				padding-left: 5rpx;
				font-size: 14px;
				font-weight: 550;
			}
		}

		.right-section {
			align-items: center;

			.right {

				font-size: 14px;
				font-weight: 550;
			}

			.right-num {
				padding-left: 5rpx;
				font-size: 14px;
				font-weight: 550;
			}
		}

	}

	.empty-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.empty-img {
			padding-top: 50rpx;
			height: 180rpx;
			width: 180rpx;
		}

		.empty-text {
			font-size: 13px;
			padding-top: 17rpx;
			color: #828282;
		}
	}
</style>
