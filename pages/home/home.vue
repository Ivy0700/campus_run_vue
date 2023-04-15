<template>
	<view class="container">
		<!-- 搜索组件 -->
		<view class="search-box">

			<!-- 左侧选择弹窗 -->
			<view class="choice-content" @click="toggle">
				<text class="text-choice">{{choice}}</text>
				<image class="img-choice" src="../../static/home-icon/blue-triangle.png"></image>
			</view>


			<my-search @click="gotoSearch" :bgcolor="'#ffffff'"></my-search>

			<navigator class="img-chat" url="../../subpkg/chat_list/chat_list">
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
		<block v-for="(post, i) in list" :key="i" @click="gotoOrder(post.orderId)" v-if="list.length !== 0">
			<my-post :post="post"></my-post>
		</block>
		
		<view class="empty-section" v-show="list.length === 0">
			<image class="empty-img" mode="widthFix"
				src="https://img.icons8.com/stickers/100/null/list-is-empty.png">
			</image>
			<text class="empty-text">您还没有相关的订单</text>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			this.queryObj = {
				"content": null,
				"orderBy": "create_time",
				"isAsc": false,
				"page": 1,
				"size": 10
			}
			this.orderList();
		},
		onShow(options) {
			console.log("onShow:" + options)
			
			const searchKey = uni.getStorageSync("searchKey");
			//const searchValue = searchKey.data
			console.log( "searchKey:"+ searchKey)
			
			if (searchKey) {
				this.resetParam()
				this.queryObj = {
					"content": searchKey,
					"orderBy": "create_time",
					"isAsc": false,
					"page": 1,
					"size": 10
				}
				console.log("我进来了searchKey")
				this.orderList()
			}
			const statusChanged = uni.getStorageSync("statusChanged");
			console.log(statusChanged)
			if (statusChanged) {
				this.resetParam()
				this.orderList()
				console.log("我进来了status")
			}
			uni.removeStorageSync("statusChanged")
			uni.removeStorageSync("searchKey")
			
		},
		data() {
			return {
				show: false,
				type: 'top',
				orderBy: 'time',
				order: 'desc',
				choice: '时间最近',
				list: [],
				total: 0,
				isLoading: false,
				queryObj: {
					"content": null,
					"orderBy": "create_time",
					"isAsc": false,
					"page": 1,
					"size": 10
				},

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
				this.queryObj.orderBy = "create_time"
				this.queryObj.isAsc = false
				this.$refs.popup.close('top')
				this.resetParam()
				this.orderList()
			},
			orderByTimeAsc() {
				this.choice = "时间最久"
				this.queryObj.orderBy = "create_time"
				this.queryObj.isAsc = true
				this.$refs.popup.close('top')
				this.resetParam()
				this.orderList()
			},
			orderByPriceDesc() {
				this.choice = "价格降序"
				this.queryObj.orderBy = "cost"
				this.queryObj.isAsc = false
				this.$refs.popup.close('top')
				this.resetParam()
				this.orderList()
			},
			orderByPriceAsc() {
				this.choice = "价格升序"
				this.queryObj.orderBy = "cost"
				this.queryObj.isAsc = true
				this.$refs.popup.close('top')
				this.resetParam()
				this.orderList()
			},
			async orderList(cb) {
				
				this.isLoading = true
				const {data : res} = await uni.$http.post('/order/getOrderList', this.queryObj)
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
				this.queryObj.content = null
				this.list = []
			}
		},
		onReachBottom() {
			if (this.queryObj.page * this.queryObj.size >= this.total) return uni.$showMsg('数据加载完毕')
			if (this.isLoading) return
			
			this.queryObj.page++;
			this.orderList()
		},
		onPullDownRefresh() {
			
			this.resetParam()
			this.orderList(() => uni.stopPullDownRefresh())
			
			
		},
		
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
	// .container {
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: center;
	// 	align-items: center;
	// }
	.empty-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 300rpx;
	
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
