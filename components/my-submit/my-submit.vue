<template>
	<view>
		<view class="submit" :style="{bottom: paddingBottom + 'px'}">
			<view class="submit-chat">



				<textarea :adjust-position="false" :hold-keyboard="true" @keyboardheightchange="KeyboardEvent"
					:show-confirm-bar="false" :auto-height="true" v-model="content" class="chat-send btn" @input="input"
					@blur="blur" @focus="focus" :cursor-spacing="100"></textarea>

				<!-- <input fixed :auto-height="true" v-model="content" class="chat-send btn" @blur="blur" @focus="focus" @input="input"  ></input> -->
				<!-- <view class="icon" v-if="!istyping"> -->
				<!-- <view class="bt-img" @tap="emoji">
						<image src="/static/chat_icons/smile.png"></image>
					</view> -->
				<view class="bt-img" v-if="!istyping">
					<image src="/static/chat_icons/camera.png" @tap="uploadPhoto"></image>
				</view>
				<!-- </view> -->
				<view class="send-div" v-if="istyping">
					<button type="default" @tap="send" class="send-btn"
						style="background-color: blue;color:#fff">发送</button>
				</view>
			</view>
			<!-- <view class="emoji" :class="{displaynone:isemoji}">
				表情
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-submit",
		props: {
			// content :{
			// 	type: String,
			// 	default: ''
			// }
		},
		onLoad() {
			console.log("hello")
		},

		data() {
			return {
				// isemoji: true,
				istyping: false,
				content: '',
				paddingBottom: 0,
				bottomHeight: 100 / (750 / uni.getWindowInfo().screenWidth)
				// disabled: 'true'
			};
		},
		methods: {
			// emoji() {
			// 	this.isemoji = !this.isemoji
			// 	setTimeout(()=> {
			// 		this.getSuHeight()
			// 	},0)

			// },
			focus(e) {
				console.log("input打印" + e)
				console.log("input打印height" + e.detail.height)
				console.log("底部高度:" + this.bottomHeight)
				if (e.detail.height === 0) {
					console.log("键盘没起来")
					return;
				}
				this.paddingBottom = e.detail.height
				// this.postition = 'relative'

				setTimeout(() => {
					// const query = uni.createSelectorQuery().in(this);
					// query.select('.submit-chat').boundingClientRect(data => {
					// 	console.log("submit-chat:" + data.height)
					this.$emit('updateHeight', this.bottomHeight + e.detail.height)
					// this.scrollTop = data.height;
					// }).exec();
				}, 0)
				this.getSuHeight()
			},
			//1. 把键盘下移（更新聊天的高度 + 定位最后一条消息） 2. 点击发送（定位最后一条消息）
			blur() {
				this.paddingBottom = 0
				// this.postition = 'fixed'
				//获取底部的高度，并且定位到最后一条消息
				this.getSuHeight()
			},
			input() {

				if (this.content.length === 0) {
					this.istyping = false
				} else {
					this.istyping = true
				}
			},
			send() {
				console.log("发送消息啦:" + this.content)
				this.$emit('input', {
					content: this.content,
					type: 0
				})
				//没打字的时“发送”图标切回 “照相”
				this.content = ''
				this.istyping = false
			},
			//获取模块高度
			getSuHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					console.log(data.height)
					this.$emit('updateHeight', data.height)
					// this.scrollTop = data.height;
				}).exec();
			},
			//收起键盘时的操作
			KeyboardEvent(e) {
				// console.log("键盘高度变化：" + JSON.stringify(e))

				//“发送”按钮切回“照相”按钮
				if (e.detail.height === 0) {
					this.istyping = false
				} else {
					this.istyping = true
				}

			},
			uploadPhoto() {
				var self = this;
				uni.chooseMedia({
				  count: 9,
				  mediaType: ['image','video'],
				  sourceType: ['album', 'camera'],
				  maxDuration: 30,
				  camera: 'back',
				  success(res) {
				    console.log(res.tempFiles)
					// res.tempFiles.forEach(function(item) {
					// 	let message = {
					// 		"type": 1
					// 	}
					// 	message.content = item.tempFilePath
					// 	self.$emit('input', message)
					// })
					let arr = res.tempFiles.map(x => x.tempFilePath)
					self.$emit('uploadPhoto', arr)
					// self.$emit('input', {
					// 	content: res.tempFiles[0].tempFilePath,
					// 	type: 1
					// })
					
				  }
				})
			}
			// focus() {
			// 	this.istyping = true
			// },
			// blur() {
			// 	this.istyping = false
			// }
		},
		watch: {
			// content: {
			// 	deep: true,
			// 	handler(oldValue, newValue) {
			// 		if (newValue === '') {
			// 			this.istyping = false
			// 			} else {
			// 			this.istyping = true
			// 		}
			// 	}
			// }
		}
	}
</script>

<style lang="scss">
	.submit {
		background: rgba(244, 244, 244, 0.96);
		border-top: 1px solid #efefef;
		width: 100%;
		// height: 100rpx;
		position: fixed;
		bottom: 0;
		z-index: 100;
		// padding-bottom: var(--status-bar-height);
		// padding-bottom: 10rpx;
	}

	.submit-chat {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;

		// position: relative;
		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
			background-color: #efefef;

		}

		.btn {
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}

		.icon {
			display: flex;
		}

	}

	.displaynone {
		display: none;
	}

	// .emoji {
	// 	height: 460rpx;
	// 	width: 100%;
	// 	background: rgba(236, 237, 238, 1);
	// 	box-shadow: 0px -1rpx 0px 0px rgba(0, 0, 0, 0.1);
	// }
	.send-btn {
		background-color: blue;
		color: #FFF;
		width: 150rpx;
		height: 80rpx;
		border-radius: 20px;
		font-size: 14px;
		text-align: center;
		padding-top: 5rpx;
		vertical-align: middle;
	}

	// .input-text {
	// 	position: relative;
	// }
</style>
