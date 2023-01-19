<!-- 聊天管理页面 -->
<template>
	<view class="main">
		<view class="apply">

		</view>
		<block v-for="(chat, i) in list" :key="i" v-if="list.length !== 0">
			<view class="friends">
				<view class="friend-list">
					<view class="friend-list-l">
						<text class="tip">{{chat.unReadNum}}</text>
						<image class="img" src="/static/example/avatar.jpg" mode="aspectFill"></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">{{chat.name}}</view>
							<view class="time">{{changeTime(chat.time)}}</view>

						</view>
						<view class="content">{{chat.content}}</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import dateTool from '../../tools/date_tool.js';
	export default {
		data() {
			return {
				list: [
					{
						"id": "123",
						"content": "这钱给的有点少呀~哈哈你说是吧我觉得呢还行啊，怎么说呢啊啊啊啊啊",
						"name": "张三",
						"time": new Date(),
						"unReadNum":2
					},
					{
						"id": "125",
						"content": "这钱给的有点少呀~哈哈你说是吧我觉得呢还行啊，怎么说呢啊啊啊啊啊",
						"name": "张三",
						"time": new Date(),
						"unReadNum":2
					}
				]
			};
		},
		methods: {
			changeTime(date) {
				return dateTool.dateTime(date)
			},
			join() {
				
			}
		}
	}
</script>

<style lang="scss">
	.main {
		// padding-top: 88rpx;
		// border: 1px solid red;

		.friends {
			.friend-list {
				height: 96rpx;
				padding: 16rpx 10rpx;
				&:active{
					background-color: lightgray;
				}
				.friend-list-l {
					position: relative;
					float: left;

					.img {
						width: 96rpx;
						height: 96rpx;
						border-radius: 10px;
					}

					.tip {
						position: absolute;
						z-index: 100;
						top: -6rpx;
						left: 68rpx;
						min-width: 36rpx;
						height: 36rpx;
						background: rgba(255, 93, 91, 1);
						border-radius: 18px;
						font-size: 12px;
						color: white;
						line-height: 36rpx;
						text-align: center;
					}
				}

				.friend-list-r {
					padding-left: 128rpx;

					.top {
						height: 50rpx;

						.name {
							float: left;
							font-size: 36rpx;
							font-weight: 400;
							color: rgba(39, 40, 50, 1);
							line-height: 50rpx;
						}

						.time {
							float: right;
							font-size: 15px;
							color: darkgray;
							line-height: 50rpx;
						}
					}

					.content {
						font-size: 28rpx;
						color: dimgray;
						line-height: 40rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
