<template>
	<view class="search-box">
		<!-- 使用 uni-ui 提供的搜索组件 -->
		<uni-search-bar :focus="true" v-model="kw" :radius="100" cancelButton="none" @confirm="confirm"></uni-search-bar>
		<!-- 搜索建议列表 -->
		<!-- <view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view> -->
		
		<!-- 搜索历史 -->
		<view class="history-box">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			 <!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoOrderList(item)"></uni-tag>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				//搜索的結果列表
				// searchResults: [],
				//搜索历史的数据
				historyList: []
			};
		},
		methods: {
			confirm() {
				uni.showToast({
					title: '?'
				})
				this.saveSearchHistory()
				this.gotoOrderList(this.kw)
			},
			input(e) {
				console.log(e)
				this.kw = e
				// clearTimeout(this.timer)
				// this.timer = setTimeout( () => {
				// 	this.kw = e;
				// 	this.getSearchList()
				// }, 500)
			},
			// async getSearchList() {
			// 	//判断搜索关键词是否为空
			// 	if (this.kw.length === 0) {
			// 		this.searchResults = []
			// 		return
			// 	}
				
			// 	const {data : res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query : this.kw})
				
			// 	if (res.meta.status !== 200) return uni.$showMsg()
			// 	this.searchResults = res.message
				
			// 	this.saveSearchHistory()
			// },
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			saveSearchHistory() {
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
			
				//历史数据持久化到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
				
			},
			clean() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			gotoOrderList(kw) {
				console.log("kw:" + kw)
				uni.setStorageSync('searchKey', kw)
				uni.switchTab({
					url: '/pages/home/home'
					// url: 'subpkg/search/search'
				})
			}
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]') 
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	
	.sugg-list {
		padding: 0 5px;
		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
	.history-box {
		padding: 0 5px;
		.history-title {
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
		
		.history-list {
			display: flex;
			flex-wrap: wrap;
			
			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
		
	}
</style>
