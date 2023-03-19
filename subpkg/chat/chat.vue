<!-- 聊天页面 -->
<template>
	<view class="content">
		<scroll-view class="chat" scroll-y="true" :scroll-with-animation="false" @scrolltoupper="nextPage()"
			:scroll-into-view="scrollToView" :style="{height: windowHeight + 'px'}">
			<view class="chat-main" :style="{paddingBottom: paddingHeight + 'px'}">
				<view class="loading" :animation="animationData" v-show="isLoading">
					<image src="../../static/chat_icons/loading3.png" class="loading-image"></image>
				</view>
				<view class="chat-ls" v-for="(item, i) in msgs" :key="i" :id="'msg'+ item.createTime">
					<view class="chat-time" v-if="item.showTime !== ''">{{item.showTime}}</view>
					<!-- 判断是否为自己，后面再改 -->
					<view class="msg-m msg-left" v-if="item.senderId !== userinfo.openId">
						<image :src="item.senderHeadPortrait" class="user-img"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.messageType === 0">

							<view class="msg-text">{{item.messageContent}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.messageType === 1">
							<image :src="item.messageContent" class="msg-img" mode="widthFix" @tap="previewImg(item.messageContent)">
							</image>
							<!-- <view class="msg-text">{{item.message}}</view> -->
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.senderId === userinfo.openId">
						<image :src="item.senderHeadPortrait" class="user-img"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.messageType === 0">

							<view class="msg-text">{{item.messageContent}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.messageType === 1">
							<image :src="item.messageContent" class="msg-img" mode="widthFix" @tap="previewImg(item.messageContent)">
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
	import user from '../../store/user';
	import {
		mapState
	} from 'vuex';
	export default {
		computed: {
			...mapState('m_user', ['token', 'userinfo'])
		},
		onLoad(options) {
			this.queryObj.inboxHash = options.inboxHash
		//	this.nextPage()
			let height = uni.getWindowInfo().windowHeight
			console.log(height)
			// let msgs = [{
			// 		"id": "1",
			// 		"userId": "1",
			// 		"imgUrl": "../../static/example/avatar.jpg",
			// 		// "message": '../../static/example/avatar.jpg',
			// 		"message": 'https://img2020.cnblogs.com/blog/2543831/202112/2543831-20211208111755384-1390104080.png',
			// 		"type": 1,
			// 		"time": new Date() - 1000 * 60 * 6
			// 	},
			// 	{
			// 		"id": "2",
			// 		"userId": "2",
			// 		"imgUrl": "../../static/example/avatar.jpg",
			// 		"message": '咋说呢',
			// 		"type": 0,
			// 		"time": new Date() - 1000 * 60 * 7
			// 	},
			// 	{
			// 		"id": "3",
			// 		"userId": "1",
			// 		"imgUrl": "../../static/example/avatar.jpg",
			// 		// "message": '../../static/example/example.jpg',
			// 		"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
			// 		"type": 1,
			// 		"time": new Date() - 1000 * 60 * 60 * 24
			// 	},
			// 	{
			// 		"id": "4",
			// 		"userId": "2",
			// 		"imgUrl": "../../static/example/avatar.jpg",
			// 		// "message": '../../static/example/example.jpg',
			// 		"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
			// 		"type": 1,
			// 		"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2
			// 	},
			// 	{
			// 		"id": "5",
			// 		"userId": "1",
			// 		"imgUrl": "../../static/example/avatar.jpg",
			// 		// "message": '../../static/example/example.jpg',
			// 		"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
			// 		"type": 1,
			// 		"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2
			// 	},
			// 	{
			// 		"id": "6",
			// 		"userId": "2",
			// 		"imgUrl": "../../static/example/avatar.jpg",
			// 		// "message": '../../static/example/example.jpg',
			// 		"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
			// 		"type": 1,
			// 		"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2
			// 	},
			// 	{
			// 		"id": "7",
			// 		"userId": "2",
			// 		"imgUrl": "../../static/example/avatar.jpg",
			// 		// "message": '../../static/example/example.jpg',
			// 		"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
			// 		"type": 1,
			// 		"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2
			// 	}
			// ]
			//this.getMsg(1, msgs)
			this.getChatRecords()
			this.windowHeight = height
			this.connectSocket()
		},
		onUnload() {
			this.isUnLoad = true
			clearInterval(this.reconnectTimer)
			clearInterval(this.timer)
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
				maxTaskCount: 5,
				queryObj: {
					page: 1,
					size: 8,
					inboxHash: ''
				},
				total: 0,

			};
		},
		methods: {
			async getChatRecords() {
				this.isLoading = true
				const {data : res} = await uni.$http.get('/api/chat-record/getChatRecord', this.queryObj)
				this.isLoading = false
				console.log(res);
				
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				
				//this.list = [...this.list, ...res.data.data.list]
				const msg = res.data.data.list;
				console.log(JSON.stringify(msg))
				this.total = res.data.data.totalCount
				this.isLoading = false;
				
				this.getMsg(msg)
			},
			//获取聊天数据
			getMsg(messages) {
				//clearInterval(this.loading)
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
					oldTime = msgsArr[0].createTime
				} else {
					return;
				}

				msgsArr.forEach(function(item, index) {
					let temp = item.createTime
					if (item.type === 1) {
						arr.push(item.messageContent)
					}
					console.log(item.createTime)
					if (index === 0) {
						item.showTime = dateTool.chatTime(item.createTime)
					} else {
						item.showTime = dateTool.intervalTime(oldTime, item.createTime) === '' ? '' : dateTool.chatTime(
							item.createTime)
					}
					item.createTime = new Date(item.createTime).getTime()
					 oldTime = temp
				})
				if (this.queryObj.page === 1) {
					this.msgs = msgsArr
					//处理滚动条
					this.$nextTick(function() {
						this.scrollToView = 'msg' + msgsArr[msgsArr.length - 1].createTime
					})
				} else {
					clearInterval(this.loading)
					this.isLoading = false
					this.msgs = [...msgsArr, ...this.msgs]

					// this.$nextTick(function(){
					// 	this.scrollToView = 'msg' + msgsArr[msgsArr.length - 1].id
					// })
				}
				// this.curPage = page

			},
			//滚动顶部加载上一页
			nextPage() {
				console.log("下一页")
				//判断是否还有数据, 且当前页是否为0
				if (this.queryObj.size * this.queryObj.page > this.total) {
					console.log("超过了")
					return;
				}
				if (this.isLoading) return;
				// var animation = uni.createAnimation({
				// 	// transformOrigin: "50% 50%",
				// 	duration: 1000,
				// 	timingFunction: "step-start",
				// 	// delay: 0
				// })
				// this.animation = animation
				this.queryObj.page++;
				this.getChatRecords()
				let i = 1
				let that = this
				
				// this.loading = setInterval(function() {
				// 	animation.rotate(30 * i).step()
				// 	this.animationData = animation.export()
				// 	i++
				// 	if (this.isLoading) return;
				// 	this.isLoading = true
				// 	if (i > 40) {
						
				// 		// let msg = [{
				// 		// 		"id": "8",
				// 		// 		"userId": "2",
				// 		// 		"imgUrl": "../../static/example/avatar.jpg",
				// 		// 		// "message": '../../static/example/example.jpg',
				// 		// 		"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
				// 		// 		"type": 1,
				// 		// 		"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2 * 2
				// 		// 	},
				// 		// 	{
				// 		// 		"id": "9",
				// 		// 		"userId": "2",
				// 		// 		"imgUrl": "../../static/example/avatar.jpg",
				// 		// 		// "message": '../../static/example/example.jpg',
				// 		// 		"message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
				// 		// 		"type": 1,
				// 		// 		"time": new Date() - 1000 * 60 * 60 * 24 * 365 * 2 * 2 * 2 * 2
				// 		// 	}
				// 	 // ]
				// 	 console.log("参数:" + this.queryObj.page)
				// 	 this.queryObj.page++;
				// 	 this.getChatRecords()
				// 	 //this.getMsg(msg)
				// 	}
				// }.bind(this), 100)
			},
			getTime(date, arr, index) {
				// let arr = this.msgs
				//console.log(arr[index - 1].time)
				console.log("getTime index:"+index)
				if (index === 0) {
					return dateTool.chatTime(date)
				} else {
					return dateTool.intervalTime(arr[index - 1].createTime, date) === '' ? '' : dateTool.chatTime(date)
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
				setTimeout(() => {
					this.$nextTick(function() {
						this.scrollToView = 'msg' + this.msgs[this.msgs.length - 1].createTime
					})
				}, 0)

			},
			//发送消息
			input(msg) {
				
				let message = {
					//"id": res.data.data,
					"senderId": this.userinfo.openId,
					"senderHeadPortrait": this.userinfo.avatar,
					"messageContent": msg.content,
					"inboxHash": this.queryObj.inboxHash,
					// "message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
					"messageType": 0,
					"createTime": new Date().getTime()
				}
				this.msgs.push(message)
				//处理时间
				let index = this.msgs.length === 0 ? 0 : this.msgs.length - 1
				message.showTime = this.getTime(message.createTime, this.msgs, index)
				this.goToBottom()
				console.log(msg.messageContent)
				
				let queryObj = {
					"type": 1,
					"chatRecordSendDTO": {
						"inboxHash": this.queryObj.inboxHash,
						"messageContent": msg.content,
						"messageType": 0,
						"createTime": new Date().getTime()
					}
				}
				let that = this
				this.sendSocketMessage(JSON.stringify(queryObj)).then(res => {
					console.log("sendRes:" + JSON.stringify(res))
					console.log("发送成功")
					
				}).catch(res => {
					console.log("发送失败")
					console.log(res)
				})
				// if (msg.type === 1) {
				// 	this.imgMsg.push(msg.content)
				// }

				
			},
			uploadPhoto(filePaths) {
				var self = this;
				let length = this.msgs.length
				filePaths.forEach(function(item) {
					let message = {
						"inboxHash": self.queryObj.inboxHash,
						"senderId": self.userinfo.openId,
						"senderHeadPortrait": self.userinfo.avatar,
						"messageContent": item,
						// "message": 'https://img-blog.csdn.net/20181002101903185?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTc5NjYzMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70',
						"messageType": 1,
						"createTime": new Date().getTime()
					}
					self.msgs.push(message)
					let index = self.msgs.length === 0? 0 : self.msgs.length - 1
					message.showTime = self.getTime(message.createTime, self.msgs, index)
					self.imgMsg.push(item)
					
					let queryObj = {
						"type": 1,
						"chatRecordSendDTO": {
							"inboxHash": self.queryObj.inboxHash,
							"messageContent": item,
							"messageType": 1,
							"createTime": new Date().getTime()
						}
					}
					
					self.sendSocketMessage(JSON.stringify(queryObj)).then(res => {
						console.log("sendRes:" + JSON.stringify(res))
						console.log("发送成功")
						
					}).catch(res => {
						console.log("发送失败")
						console.log(res)
					})
				})
				this.goToBottom()
			},
			connectSocket() {
				let that = this
				this.socketTask = uni.connectSocket({
					url: 'ws://127.0.0.1:8183/campus_run',
					header: {
						'Authorization': that.token,
						'SocketScene': 'CHAT_RECORD'
					},
					// header: {
					// 		'content-type': 'application/json'
					// 	},
					data() {
						return {
							type: '0'
						}
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
					
					// console.log("我收到消息:" + JSON.stringify(msg))
					// let arr = []
					// arr.push(msg)
					that.msgs.push(msg)
					let index = that.msgs.length === 0? 0 : that.msgs.length - 1
					msg.showTime = that.getTime(msg.createTime, that.msgs, index)
					
					if (msg.messageType === 1) {
						that.imgMsg.push(msg.messageContent)
					}
					that.goToBottom()
					//that.getMsg(arr)
					
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
			//发送消息
			sendSocketMessage(msg) {
				console.log("发送信息")
				console.log(JSON.stringify(msg))
				const that = this
				return new Promise((resolve, reject) => {
					this.socketTask.send({
						header: {
							'Authorization': that.token,
							'SocketScene': 'CHAT_RECORD'
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

			.loading {
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
