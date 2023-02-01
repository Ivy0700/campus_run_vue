<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<text class="tips-text">登录后尽享更多权益.</text>

	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	import user from '../../store/user';
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['redirectinfo'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
			getUserProfile(e) {
				const res = uni.getUserProfile({
					desc: "登录",
					success: (res) => {
						console.log(res.userInfo)
						// this.updateUserInfo(res.userInfo)

						this.getToken(res)
					}
				})

			},
			async getToken(info) {
				// 获取code对应的值
				const [err, res] = await uni.login().catch(err => err)
				console.log(res)

				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')


				// console.log(res.code)
				// console.log(info)
				const query = {
					code: res.code,
				}
				// console.log(query)
				const loginRes = await uni.$http.post('/user/wxLogin', query)
				console.log(loginRes)
				if (!loginRes.data.success) return uni.$showMsg('登录失败')
				uni.$showMsg('登录成功')
				this.updateToken(loginRes.data.data.data.token)
				//更新userinfo
				let userInfo = {
					avatar: loginRes.data.data.data.headPortrait,
					nickname: loginRes.data.data.data.username

				}
				this.updateUserInfo(userInfo)
				this.navigateBack()
			},
			navigateBack() {
				console.log(this.redirectinfo)
				if (this.redirectinfo && this.redirectinfo.opentype === 'switchTab') {

					uni.switchTab({
						url: this.redirectinfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;

		&::after {
			content: ' ';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);

		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #0000ff;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
