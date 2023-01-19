<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-box">

			<!-- 左侧选择弹窗 -->
			<view class="choice-content" @click="toggle">
				<text class="text-choice">{{choice}}</text>
				<image class="img-choice" src="../../static/home-icon/blue-triangle.png"></image>
			</view>


			<my-search @click="gotoSearch" :bgcolor="'#ffffff'"></my-search>

			<navigator class="img-chat" url="../../subpkg/chat/chat">
				<image class="chat" src="../../static/home-icon/chat.png" mode="aspectFit"></image>
			</navigator>
		</view>
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<text class="pop-item1" @click="orderByTimeDesc">时间最近</text>
					<text class="pop-item2" @click="orderByTimeAsc">时间最久</text>
					<text class="pop-item3" @click="orderByPriceDesc">价格降序</text>
					<text class="pop-item4" @click="orderByPriceAsc">价格升序</text>
				</view>
			</uni-popup>
		</view>

		<!-- 跑腿需求列表 -->
		<block v-for="(post, i) in list" :key="i" @click="gotoOrder(post.orderId)">
			<my-post :post="post"></my-post>
		</block>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				show: false,
				type: 'top',
				orderBy: 'time',
				order: 'desc',
				choice: '时间最近',
				list: [{
					"avatar": "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
					"nickname": "123",
					"openid": "2344323423234",
					"postTime": "2022-10-01 11:30",
					"orderId": "434345",
					"title": "求帮带快递",
					"content": "px 即屏幕像素rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：rpx 计算配置 。vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持：rem 根字体大小可以通过 page-meta 配置vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%nvue 还不支持百分比单位。",
					"address": "西六",
					"cost": 1,
					"expectedStartTime": "10-01 11:30",
					"expectedEndTime": "10-01 12:30"
					},
					{
						"avatar": "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
						"nickname": "123",
						"openid": "2344323423234",
						"postTime": "2022-10-01 11:30",
						"orderId": "434345",
						"title": "求帮带快递",
						"content": "px 即屏幕像素rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：rpx 计算配置 。vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持：rem 根字体大小可以通过 page-meta 配置vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%nvue 还不支持百分比单位。",
						"address": "西六",
						"cost": 1,
						"expectedStartTime": "10-01 11:30",
						"expectedEndTime": "10-01 12:30"
					},
					{
						"avatar": "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
						"nickname": "123",
						"openid": "2344323423234",
						"postTime": "2022-10-01 11:30",
						"orderId": "434345",
						"title": "求帮带快递",
						"content": "px 即屏幕像素rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：rpx 计算配置 。vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持：rem 根字体大小可以通过 page-meta 配置vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%nvue 还不支持百分比单位。",
						"address": "西六",
						"cost": 1,
						"expectedStartTime": "10-01 11:30",
						"expectedEndTime": "10-01 12:30"
					},
					{
						"avatar": "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
						"nickname": "123",
						"openid": "2344323423234",
						"postTime": "2022-10-01 11:30",
						"orderId": "434345",
						"title": "求帮带快递",
						"content": "px 即屏幕像素rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：rpx 计算配置 。vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持：rem 根字体大小可以通过 page-meta 配置vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%nvue 还不支持百分比单位。",
						"address": "西六",
						"cost": 1,
						"expectedStartTime": "10-01 11:30",
						"expectedEndTime": "10-01 12:30"
					}
				],

			};
		},
		methods: {
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			gotoOrder() {
				uni.navigateTo({
					url: ''
				})
			},
			//列表选择弹窗
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open('top')
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			orderByTimeDesc() {
				this.choice = "时间最近"
				this.orderBy = "time"
				this.order = "desc"
				this.$refs.popup.close('top')
			},
			orderByTimeAsc() {
				this.choice = "时间最久"
				this.orderBy = "time"
				this.order = "asc"
				this.$refs.popup.close('top')
			},
			orderByPriceDesc() {
				this.choice = "价格降序"
				this.orderBy = "price"
				this.order = "desc"
				this.$refs.popup.close('top')
			},
			orderByPriceAsc() {
				this.choice = "价格升序"
				this.orderBy = "price"
				this.order = "asc"
				this.$refs.popup.close('top')
			},
			list() {

			}
		}
	}
</script>

<style lang="scss">
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
		display: flex;
		justify-content: space-between;
		background-color: #fff;

		.choice-content {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-right: 20rpx;
			padding-left: 7rpx;


			.text-choice {
				font-size: 14px;
				color: #228BE6;
			}

			.img-choice {
				width: 25rpx;
				height: 25rpx;
				padding-left: 10rpx;
			}

		}

		.chat {
			width: 45rpx;
			height: 45rpx;
			padding-left: 10rpx;
			padding-right: 5rpx;
			padding-top: 18rpx;
			align-items: center;
		}
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx;
		height: 200rpx;
		background-color: #fff;
		position: absolute;
		top: 70rpx;
		left: 12rpx;
		width: 140rpx;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		font-size: 15px;

		.pop-item1 {
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;
		}

		// border-bottom: 1px solid #efefef;
		.pop-item1::after {
			content: '';

			width: 140rpx;
			height: 1px;
			background-color: #efefef;
			position: relative;
			bottom: 0;
			left: 0;

		}

		.pop-item2 {
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;
		}

		.pop-item2::after {
			content: '';

			width: 140rpx;
			height: 1px;
			background-color: #efefef;
			position: relative;
			bottom: 0;
			left: 0;

		}

		.pop-item3 {
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;

		}

		.pop-item3::after {
			content: '';
			width: 140rpx;
			height: 1px;
			background-color: #efefef;
			position: relative;
			bottom: 0;
			left: 0;

		}
	}
</style>
