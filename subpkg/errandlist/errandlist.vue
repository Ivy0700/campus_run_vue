<template>
	<view>
		<view>
			<view class="top-section">
				<text class="first" @click="clickItem('ONGOING')" :class="curChoice === 'ONGOING' ? 'active': ''">跑腿中</text>
				<text class="second" @click="clickItem('DELIVERED')" :class="curChoice === 'DELIVERED' ? 'active': ''">已送达</text>
				<text class="third" @click="clickItem('GET_REVIEWED')" :class="curChoice === 'GET_REVIEWED' ? 'active': ''">已收到评价</text>
				<text class="fourth" @click="clickItem('CANCELED')" :class="curChoice === 'CANCELED' ? 'active': ''">已取消</text>
			</view>

			<block v-for="(order, i) in list" :key="i" v-if="list.length !== 0">
				<my-ordercard :order="order" :choice="cardChoice" @getErrandList="clickItem(curChoice)"></my-ordercard>
			</block>
			<view class="empty-section" v-if="list.length === 0">
				<image class="empty-img" mode="widthFix"
					src="https://img.icons8.com/stickers/100/null/list-is-empty.png"></image>
				<text class="empty-text">您还没有相关的订单</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.clickItem('ONGOING')
		},
		onShow() {
			console.log("onShow:")
			const statusChanged = uni.getStorageSync("statusChanged");
			console.log(statusChanged)
			if (statusChanged) {
				this.resetParam()
				this.clickItem(this.curChoice)
			}
			uni.removeStorageSync("statusChanged")
		},
		data() {
			return {
				list: [],
				cardChoice: "errand",
				curChoice: "ONGOING",
				queryObj: {
					page: 1,
					size: 10
				},
				total: 0,
				isLoading: false,
			};
		},
		methods: {
			clickItem(cur) {
				this.resetParam()
				this.curChoice = cur
				this.queryObj.status = this.curChoice
				this.getErrandList()
			},
			async getErrandList(cb) {
				console.log("我被调用了")
				this.isLoading = true
				const {data : res} = await uni.$http.post('/api/errand/getErrandByStatus', this.queryObj)
				this.isLoading = false
				console.log(res);
				cb && cb()
				if (res.code !== 20000) {
					return uni.$showMsg()
				}
				this.list = [...this.list, ...res.data.data.list]
				this.total = res.data.data.totalCount
			},
			resetParam() {
				//重置关键数据
				this.queryObj.page = 1
				this.total = 0
				this.isLoading = false
				this.list = []
			}

		},
		onReachBottom() {
			if (this.queryObj.page * this.queryObj.size >= this.total) return uni.$showMsg('数据加载完毕')
			if (this.isLoading) return
			
			this.queryObj.page++;
			this.getErrandList()
		},
		onPullDownRefresh() {
			
			this.resetParam()
			this.getErrandList(() => uni.stopPullDownRefresh())
			
			
		},
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

		.first {}

		.second {}

		.third {}

		.fourth {}
	}

	.empty-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.empty-img {
			padding-top: 90rpx;
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
