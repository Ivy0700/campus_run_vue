<!-- 聊天页面 -->
<template>
	<view class="content">
		<scroll-view class="chat" scroll-y="true" :scroll-with-animation="false" @scrolltoupper="nextPage()" :scroll-into-view="scrollToView" :style="{height: windowHeight + 'px'}">
			<view class="chat-main"  :style="{paddingBottom: paddingHeight + 'px'}">
				<view class="loading" :animation="animationData" v-show="isLoading">
					<image src="../../static/chat_icons/loading3.png" class="loading-image"></image>
				</view>
				<view class="chat-ls" v-for="(item, i) in msgs" :key="i" :id="'msg'+ item.id">
					<view class="chat-time" v-if="item.showTime !== ''">{{item.showTime}}</view>
					<!-- 判断是否为自己，后面再改 -->
					<view class="msg-m msg-left" v-if="item.userId !== '1'">
						<image :src="item.imgUrl" class="user-img"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.type === 0">

							<view class="msg-text">{{item.message}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.type === 1">
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="previewImg(item.message)">
							</image>
							<!-- <view class="msg-text">{{item.message}}</view> -->
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.userId === '1'">
						<image :src="item.imgUrl" class="user-img"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.type === 0">

							<view class="msg-text">{{item.message}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.type === 1">
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="previewImg(item.message)">
							</image>
							<!-- <view class="msg-text">{{item.message}}</view> -->
						</view>

					</view>
				</view>
				<!-- <view class="chat-ls">
					<view class="chat-time">12:32</view>
					<view class="msg-m msg-right">
						<view class="message">
							
							<view class="msg-text">你好啊，我的朋友，多日不见</view>
							<image src="../../static/example/avatar.jpg" class="user-img"></image>
						</view>	
					</view>
				</view> -->
				<!-- <view class="pad"></view> -->
			</view>
		</scroll-view>
		
		<!-- 发送框 -->
		<my-submit @updateHeight="updateHeight" @input="input" @uploadPhoto="uploadPhoto"></my-submit>
	</view>
</template>

<script>
	import dateTool from '../../tools/date_tool.js';
	export default {
		onLoad() {
			
			this.nextPage()
			let height = uni.getWindowInfo().windowHeight
			console.log(height)
			let msgs = [
				{
					"id": "1",
					"userId": "1",
					"imgUrl": "../../static/example/avatar.jpg",
					// "message": '../../static/example/avatar.jpg',
					"message": 'https://img2020.cnblogs.com/blog/2543831/202112/2543831-20211208111755384-1390104080.png',
					"type": 1,
					"time": new Date() - 1000 * 60 * 6
				},
				{
					"id": "2",
					"userId": "2",
					"imgUrl": "../../static/example/avatar.jpg",
					"message": '咋说呢',
					"type": 0,
					"time": new Date() - 1000 * 60 * 7
				},
				{
					"id": "3",
					"userId": "1",
					"imgUrl": "../../static/example/avatar.jpg",
					// "message": '../../static/example/example.jpg',
					"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					"type": 1,
					"time": new Date() - 1000 * 60 * 60 * 24 
				},
				{
					"id": "4",
					"userId": "2",
					"imgUrl": "../../static/example/avatar.jpg",
					// "message": '../../static/example/example.jpg',
					"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					"type": 1,
					"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2
				},
				{
					"id": "5",
					"userId": "1",
					"imgUrl": "../../static/example/avatar.jpg",
					// "message": '../../static/example/example.jpg',
					"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					"type": 1,
					"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2
				},
				{
					"id": "6",
					"userId": "2",
					"imgUrl": "../../static/example/avatar.jpg",
					// "message": '../../static/example/example.jpg',
					"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					"type": 1,
					"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2
				},
				{
					"id": "7",
					"userId": "2",
					"imgUrl": "../../static/example/avatar.jpg",
					// "message": '../../static/example/example.jpg',
					"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					"type": 1,
					"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2
				}
			]
			this.getMsg(1, msgs)
			this.windowHeight = height
			this.connectSocket()
		},
		onUnload() {
			this.isUnLoad = true
			clearInterval(this.reconnectTimer)
			this.closeSocket()
		},
		data() {
			return {
				msgs: [
					// {
					// 	"id": "1",
					// 	"userId": "1",
					// 	"imgUrl": "../../static/example/avatar.jpg",
					// 	// "message": '../../static/example/avatar.jpg',
					// 	"message": 'https://img2020.cnblogs.com/blog/2543831/202112/2543831-20211208111755384-1390104080.png',
					// 	"type": 1,
					// 	"time": new Date() - 1000 * 60 * 6
					// },
					// {
					// 	"id": "2",
					// 	"userId": "2",
					// 	"imgUrl": "../../static/example/avatar.jpg",
					// 	"message": '咋说呢',
					// 	"type": 0,
					// 	"time": new Date() - 1000 * 60 * 7
					// },
					// {
					// 	"id": "3",
					// 	"userId": "1",
					// 	"imgUrl": "../../static/example/avatar.jpg",
					// 	// "message": '../../static/example/example.jpg',
					// 	"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					// 	"type": 1,
					// 	"time": new Date() - 1000 * 60 * 60 * 24 
					// },
					// {
					// 	"id": "4",
					// 	"userId": "2",
					// 	"imgUrl": "../../static/example/avatar.jpg",
					// 	// "message": '../../static/example/example.jpg',
					// 	"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					// 	"type": 1,
					// 	"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2
					// },
					// {
					// 	"id": "5",
					// 	"userId": "1",
					// 	"imgUrl": "../../static/example/avatar.jpg",
					// 	// "message": '../../static/example/example.jpg',
					// 	"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					// 	"type": 1,
					// 	"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2
					// },
					// {
					// 	"id": "6",
					// 	"userId": "2",
					// 	"imgUrl": "../../static/example/avatar.jpg",
					// 	// "message": '../../static/example/example.jpg',
					// 	"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					// 	"type": 1,
					// 	"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2
					// },
					// {
					// 	"id": "7",
					// 	"userId": "2",
					// 	"imgUrl": "../../static/example/avatar.jpg",
					// 	// "message": '../../static/example/example.jpg',
					// 	"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					// 	"type": 1,
					// 	"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2
					// }
				],
				imgMsg: [],
				scrollToView: '',
				windowHeight: '',
				paddingHeight: '60',
				animationData: {},
				//页码
				curPage: 0,
				loading: '',
				isLoading: false,
				socketTask: '',
				timer: '',
				reconnectTimer: '',
				socketOpen: false,
				isUnLoad: false,
				maxTaskCount: 5
				
			};
		},
		methods: {
			//获取聊天数据
			getMsg(page, messages) {
				let msgsArr = messages
				msgsArr.reverse()
				// this.imgMsg = this.msgs.filter(function(msg) {
				// 	if (msg.type === 1) {
				// 		return msg.message
				// 	}
				// })
				// console.log(this.imgMsg)
				let arr = this.imgMsg
				
				let oldTime = ''
				//处理时间
				if (msgsArr.length !== 0) {
				 oldTime = msgsArr[0].time
				} else {
					return;
				}
				
				msgsArr.forEach(function(item, index) {
					// let temp = item.time
					if (item.type === 1) {
						arr.push(item.message)
					}
					console.log(item.time)
					if (index === 0) {
						item.showTime = dateTool.chatTime(item.time)
					} else {
						item.showTime = dateTool.intervalTime(oldTime, item.time) === '' ? '' : dateTool.chatTime(item.time)
					}
					// oldTime = temp
				})
				if (this.curPage === 0) {
					this.msgs = msgsArr
					//处理滚动条
					this.$nextTick(function(){
						this.scrollToView = 'msg' + msgsArr[msgsArr.length - 1].id
					})
				} else {
					clearInterval(this.loading)
					this.isLoading = false
					this.msgs = [...msgsArr, ...this.msgs]
					
					// this.$nextTick(function(){
					// 	this.scrollToView = 'msg' + msgsArr[msgsArr.length - 1].id
					// })
				}
				this.curPage = page
				
			},
			//滚动顶部加载上一页
			nextPage() {
				//判断是否还有数据, 且当前页是否为0
				
				var animation = uni.createAnimation({
				  // transformOrigin: "50% 50%",
				  duration: 1000,
				  timingFunction: "step-start",
				  // delay: 0
				})
				 this.animation = animation
				
				   
				
				  
					let i = 1
				    this.loading = setInterval(function() {
				      animation.rotate(30 * i).step()
				      this.animationData = animation.export()
					  i++
					  this.isLoading = true
					  if (i > 40) {
					  let msg = [
					  	{
					  		"id": "8",
					  		"userId": "2",
					  		"imgUrl": "../../static/example/avatar.jpg",
					  		// "message": '../../static/example/example.jpg',
					  		"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					  		"type": 1,
					  		"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2 * 2
					  	},
					  	{
					  		"id": "9",
					  		"userId": "2",
					  		"imgUrl": "../../static/example/avatar.jpg",
					  		// "message": '../../static/example/example.jpg',
					  		"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					  		"type": 1,
					  		"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2 * 2 * 2
					  	}
					  ]
					 
					  this.getMsg(2, msg)
					  }
				    }.bind(this), 100)
			},
			getTime(date, arr, index) {
				// let arr = this.msgs
				console.log(arr[index-1].time)
				console.log(index)
				if (index === 0) {
					return dateTool.chatTime(date)
				} else {
					return dateTool.intervalTime(arr[index-1].time, date) === '' ? '' : dateTool.chatTime(date)
				}
			},
			//处理时间
			changeTime(date) {
				return dateTool.chatTime(date)
			},
			//预览图片
			previewImg(img) {
				let index = this.imgMsg.findIndex(function(item) {
					
					if (img === item) {
						return true
					}
				})
				console.log(index)
				uni.previewImage({
					current: index,
					urls: [''],
					success() {
						console.log("成功了")
					},
					fail(e) {
						console.log("失败了:" + JSON.stringify(e))
					},
				})
				

			},
			updateHeight(height) {
				console.log("高度为:" + height)
				this.paddingHeight = height
				this.goToBottom()
			},
			//滚动到底部
			goToBottom() {
				console.log("最后一个：" + this.msgs.length)
				this.scrollToView = ''
				setTimeout(()=> {
			 		this.$nextTick(function() {
			 			this.scrollToView = 'msg' + this.msgs[this.msgs.length - 1].id
			 		})
			 	},0)
				
			},
			//发送消息
			input(msg) {
				let message = {
						"id": "8",
						"userId": "1",
						"imgUrl": "../../static/example/avatar.jpg",
						"message": msg.content,
						// "message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
						"type": 0,
						"time": new Date()
					}
					this.msgs.push(message)
					//处理时间
					message.showTime = this.getTime(message.time, this.msgs, this.msgs.length - 1)
					
					// if (msg.type === 1) {
					// 	this.imgMsg.push(msg.content)
					// }
					
					this.goToBottom()
					console.log(msg.content)
			},
			uploadPhoto(filePaths) {
				var self = this;
				let length = this.msgs.length
				filePaths.forEach(function(item, index) {
					let message = {
						"id": length + index,
						"userId": "1",
						"imgUrl": "../../static/example/avatar.jpg",
						"message": item,
						// "message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
						"type": 1,
						"time": new Date()
					}
					self.msgs.push(message)
					message.showTime = self.getTime(message.time, self.msgs, self.msgs.length - 1)
					self.imgMsg.push(item)
				})
				this.goToBottom()
			},
			connectSocket() {
				let that = this
				this.socketTask =  uni.connectSocket({
					url: 'ws://127.0.0.1:8183/campus_runrun',
					// header: {
					// 		'content-type': 'application/json'
					// 	},
					// data() {
					// 	return {
					// 		msg: '123'
					// 	}
					// },
					complete: (e)=> {
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
					console.log("收到服务器内容: " + JSON.stringify(res))
					//对获取内容操作
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
				
				this.socketTask.onClose((e)=> {
					console.log("WebSocket连接关闭")
					clearInterval(that.timer)
					that.timer = ''
					
					//如果不是主动关闭的就重新连接
					//socketOpen在连接成功后应该一直是true, 只有onError是false，false的话就要重连
					if (!that.socketOpen || !that.isUnLoad) {
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
			//发送消息
			sendSocketMessage(msg) {
				console.log("发送信息")
				console.log(JSON.stringify(msg))
				return new Promise((resolve, reject) => {
					this.socketTask.send({
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
			}
		}
	}
</script>

<style lang="scss">
	.chat {
		height: 100%;
		// .pad {
		// 	height: var(--status-bar-height);
		// 	width: 100%;
		// }
		.chat-main {
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 17rpx;
			// padding-bottom: 300px;
			display: flex;
			flex-direction: column;

			.loading{
				text-align: center;
				.loading-image {
					width: 60rpx;
					height: 60rpx;
				}
			}
			.chat-ls {
				.chat-time {
					font-size: 24rpx;
					color: rgba(39, 40, 50, 0.3);
					line-height: 34rpx;
					padding: 20rpx 0;
					text-align: center;
				}

				.msg-m {
					display: flex;
					padding: 20rpx 0;

					.user-img {
						flex: none;
						width: 80rpx;
						height: 80rpx;
						border-radius: 20rpx;
					}

					.message {
						display: flex;
						max-width: 480rpx;


					}

					.msg-text {
						font-size: 32rpx;
						line-height: 44rpx;
						color: rgba(39, 40, 50, 1);
						padding: 18rpx 24rpx;
					}

					.msg-img {
						max-width: 400rpx;
						border-radius: 20rpx;
					}
				}

				.msg-left {
					display: flex;
					flex-direction: row;

					.msg-text {
						margin-left: 16rpx;
						background-color: #fff;
						border-radius: 0px 20px 20rpx 20px;
					}

					.msg-img {
						margin-left: 16rpx;
					}
				}

				.msg-right {
					display: flex;
					flex-direction: row-reverse;

					.msg-text {
						margin-right: 16rpx;
						background-color: lightblue;
						border-radius: 20rpx 0px 20rpx 20rpx;
					}

					.msg-img {
						margin-right: 16rpx;
					}
				}
			}
		}

	}
	
	.send {
		height: 200rpx;
	}
</style>
