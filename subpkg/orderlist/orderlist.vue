<template>
	<view>
		<view class="top-section" >
			<text class="first" @click="clickItem(1)" :class="curIndex === 1 ? 'active': ''">未接单</text>
			<text class="second" @click="clickItem(2)" :class="curIndex === 2 ? 'active': ''">已接单</text>
			<text class="third" @click="clickItem(3)" :class="curIndex === 3 ? 'active': ''">已完成</text>
			<text class="fourth" @click="clickItem(4)" :class="curIndex === 4 ? 'active': ''">已取消</text>
		</view>
		
		<block v-for="(order, i) in list" :key="i" v-if="list.length !== 0" >
			<my-ordercard :order="order" :choice="cardChoice"></my-ordercard>
		</block>
		<view class="empty-section" v-if="list.length === 0">
			<image class="empty-img" mode="widthFix" src="https://img.icons8.com/stickers/100/null/list-is-empty.png" ></image>
			<text class="empty-text">您还没有相关的订单</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				cardChoice: "order",
				curIndex: 1
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
		.first {
			
			
		}
		.second {
			
		}
		.third {
			
		}
		
		.fourth {
			
		}
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
