<template>
	<view>
		<view class="top-section">
			<text class="first" @click="clickItem(1)" :class="curIndex === 1 ? 'active': ''">我收到的</text>
			<text class="second" @click="clickItem(2)" :class="curIndex === 2 ? 'active': ''">我给出的</text>
		</view>
		<view class="info-section">
			<block v-for="(info, i) in list" :key="i" v-if="list.length !== 0">
				<my-review :info="info"></my-review>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curIndex: 1,
				list: [{
					"avatar": "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
					"nickname": "123",
					"openid": "2344323423234",
					"postTime": "2022-10-01 11:30",
					"reviewId": "434345",
					"title": "求帮带快递",
					// "content": "px 即屏幕像素rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：rpx 计算配置 。vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持：rem 根字体大小可以通过 page-meta 配置vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%nvue 还不支持百分比单位。"
					"content": "求帮忙这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了",
					"review": "这位同学很好哦，很快就送到了",
					"orderId": "123",
					"status": "已完成"
				},{
					"avatar": "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
					"nickname": "123",
					"openid": "2344323423234",
					"postTime": "2022-10-01 11:30",
					"reviewId": "434345",
					"title": "求帮带快递",
					// "content": "px 即屏幕像素rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：rpx 计算配置 。vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持：rem 根字体大小可以通过 page-meta 配置vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%nvue 还不支持百分比单位。"
					"content": "求帮忙这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了",
					"review": "这位同学很好哦，很快就送到了",
					"orderId": "123",
					"status": "已完成"
				},
				{
					"avatar": "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
					"nickname": "123",
					"openid": "2344323423234",
					"postTime": "2022-10-01 11:30",
					"reviewId": "434345",
					"title": "求帮带快递",
					// "content": "px 即屏幕像素rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：rpx 计算配置 。vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持：rem 根字体大小可以通过 page-meta 配置vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%nvue 还不支持百分比单位。"
					"content": "求帮忙这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了",
					"review": "这位同学很好哦，很快就送到了",
					"orderId": "123",
					"status": "已完成"
				},
				{
					"avatar": "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
					"nickname": "123",
					"openid": "2344323423234",
					"postTime": "2022-10-01 11:30",
					"reviewId": "434345",
					"title": "求帮带快递",
					// "content": "px 即屏幕像素rpx 即响应式 px，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大，但在 App（vue2 不含 nvue） 端和 H5（vue2） 端屏幕宽度达到 960px 时，默认将按照 375px 的屏幕宽度进行计算，具体配置参考：rpx 计算配置 。vue 页面支持下面这些普通 H5 单位，但在 nvue 里不支持：rem 根字体大小可以通过 page-meta 配置vh viewpoint height，视窗高度，1vh 等于视窗高度的 1%vw viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%nvue 还不支持百分比单位。"
					"content": "求帮忙这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了这位同学很好哦，很快就送到了",
					"review": "这位同学很好哦，很快就送到了",
					"orderId": "123",
					"status": "已完成"
				}
				]
			};
		},
		methods: {
			clickItem(index) {
				this.curIndex = index
			},

		}
	}
</script>

<style lang="scss">
	.active {
		color: blue;
		font-weight: 555;
	}

	.top-section {
		background-color: white;
		padding-top: 19rpx;
		padding-bottom: 19rpx;
		align-items: center;
		display: flex;
		justify-content: space-evenly;
		font-size: 14px;


	}
</style>
