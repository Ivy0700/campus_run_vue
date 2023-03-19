<!-- 聊天管理页面 -->
<template>
	<view class="main">
		<view class="apply">

		</view>
		<block v-for="(chat, i) in map" :key="i" v-if="map.size !== 0">
			<view class="friends" @click="goToChat(chat.inboxHash)">
				<view class="friend-list">
					<view class="friend-list-l">
						<text class="tip" v-show="chat.seen === 0"></text>
						<image class="img" :src="chat.otherUserHeadPortrait" mode="aspectFill"></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">{{chat.otherUserName}}</view>
							<view class="time">{{chat.showTime}}</view>
							<!-- <view class="time">{{chat.lastMsgTime}}</view> -->

						</view>
						<view class="content">{{chat.lastMsgType === 0 ?chat.lastMsgContent: "【图片】"}}</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import dateTool from '../../tools/date_tool.js';
	import user from '../../store/user';
	import {
		mapState
	} from 'vuex';
	export default {
		computed: {
			...mapState('m_user', ['token', 'userinfo']),
			
		},
		onLoad() {
			
		},
		onUnload() {
			this.isUnLoad = true
			clearInterval(this.reconnectTimer)
			clearInterval(this.timer)
			this.closeSocket()
		},
		onShow() {
			this.getChatList()
			this.connectSocket()
		},
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
				],
				map: {},
				socketTask: '',
				timer: '',
				reconnectTimer: '',
				socketOpen: false,
				isUnLoad: false,
			};
		},
		methods: {
			changeTime(date) {
				console.log("data:" + date)
				return dateTool.dateTime(date)
			},
			join() {
				
			},
			async getChatList() {
				const {data : res} = await uni.$http.get('/api/inbox/getInboxList')
				
				console.log(res);
				
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				this.list = res.data.data
				this.buildMap(this.list)
				
			},
			buildMap(list) {
				let obj = new Map()
				
				for (let i = 0; i < list.length; i++) {
					let chat = list[i]
					chat.showTime = this.changeTime(chat.lastMsgTime)
					obj[chat.inboxHash] = chat
				}
				console.log("map:" + JSON.stringify(obj))
				console.log("mapSize:" + obj.size)
				// console.log("content:" + obj[0])
				this.map = obj
			},
			goToChat(inboxHash) {
				uni.navigateTo({
					url: '/subpkg/chat/chat?inboxHash=' + inboxHash
				})
			},
			connectSocket() {
				let that = this
				this.socketTask = uni.connectSocket({
					url: 'ws://127.0.0.1:8183/campus_run',
					header: {
						'Authorization': that.token,
						'SocketScene': 'CHAT_LIST'
					},
					data() {
						
					},
					complete: (e) => {
						console.log(e)
					},
					fail: (e) => {
						console.log(e)
					},
					success: (e) => {
						console.log(e)
					}
				})
			
				this.socketTask.onOpen(function(res) {
					console.log("WebSocket连接已打开")
					clearInterval(that.reconnectTimer)
					//定期发送心跳
					that.heart()
				})
			
				this.socketTask.onMessage(function(res) {
					//对获取内容操作
					let obj = JSON.parse(res.data)
					let msg = obj.data.data
					if (msg === undefined) return;
					console.log(msg)
					
					
					//that.msgs.push(msg)
					let chat = that.map[msg.inboxHash]
					chat.lastMsgTime = msg.lastMsgTime
					chat.showTime = that.changeTime(msg.lastMsgTime)
					chat.lastMsgType = msg.lastMsgType
					chat.lastMsgContent = msg.lastMsgContent
					chat.seen = msg.seen
					
					let map = that.map
					//根据最后一条消息时间排序
					let sortedArray = Array.from(map.entries()).forEach(function(a, b) {
						let date1 =  new Date(a[1].lastMsgTime)
						let date2 = new Date(b[1].lastMsgTime)
						
						return date1.getTime() - date2.getTime()
					})
					
					that.map = new Map(sortedArray)
					console.log("sortedArr:" + JSON.stringify(sortedArray))
					
				})
			
				//1. 服务器关闭，onError -> onClose 重连
				//2. 服务器关闭通道， onClose 重连
				//3. wss, onError-> onClose 重连
				this.socketTask.onError(function(res) {
					console.log("WebSocket连接打开失败，请检查")
					console.log(res)
					that.socketOpen = false
					//进入重新连接
					// that.reconnect()
				})
			
				this.socketTask.onClose((e) => {
					console.log("WebSocket连接关闭")
					clearInterval(that.timer)
					that.timer = ''
			
					//如果不是主动关闭的就重新连接
					//socketOpen在连接成功后应该一直是true, 只有onError是false，false的话就要重连
					if (!that.socketOpen && !that.isUnLoad) {
						console.log("不是主动关闭的")
						that.reconnect()
					}
				})
			
			
			},
			//进入重新连接
			reconnect() {
				console.log("进入断线重连")
				this.socketTask = ''
				if (this.reconnectTimer === '') {
					console.log("执行了1次")
					this.reconnectTimer = setInterval(() => {
						this.connectSocket()
					}, 1000)
				}
				// this.connectSocket()
			},
			heart() {
				let that = this
				clearInterval(this.timer)
				this.timer = ''
				let msg = {
					"type": "3"
				}
				this.timer = setInterval(() => {
					that.sendSocketMessage(JSON.stringify(msg)).then(res => {
						console.log("心跳成功")
					}).catch(res => {
						console.log("发送失败")
						console.log(res)
					})
				}, 4000)
			},
			//主动关闭连接
			closeSocket() {
				//已经关了
				if (!this.socketOpen) {
					return
				}
				this.socketTask.closeSocket({
					success(e) {
						console.log("成功关闭连接")
						console.log(e)
					},
					fail(e) {
						console.log("关闭连接失败")
						console.log(e)
					}
				})
			},
			//发送消息
			sendSocketMessage(msg) {
				console.log("发送信息")
				console.log(JSON.stringify(msg))
				const that = this
				return new Promise((resolve, reject) => {
					this.socketTask.send({
						header: {
							'Authorization': that.token,
							'SocketScene': 'CHAT_LIST'
						},
						data: msg,
						success(res) {
							console.log("发送成功")
							resolve(res)
						},
						fail(res) {
							console.log("发送失败")
							console.log(res)
							reject(res)
						}
					})
				})
			},
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
						left: 80rpx;
						min-width: 25rpx;
						height: 25rpx;
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
							font-size: 30rpx;
							font-weight: 400;
							color: rgba(39, 40, 50, 1);
							line-height: 50rpx;
						}

						.time {
							float: right;
							font-size: 13px;
							color: darkgray;
							line-height: 50rpx;
						}
					}

					.content {
						font-size: 25rpx;
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
