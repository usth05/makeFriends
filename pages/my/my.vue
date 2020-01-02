<template>
	<view>
		<navigator url="../login/login">
		<view class="flex align-center p-2" hover-class="bg-light">
			<image src="/static/default.jpg" style="width: 100rpx;height: 100rpx;" class="rounded-circle"></image>
			<view class="flex flex-column flex-1 px-2">
				<text class="font-lg font-weight-bold text-dark">昵称</text>
				<text class="font text-secondary">总贴子10 今日发帖0</text>
			</view>
			<text class="iconfont icon-jinru"></text>
		</view>
		</navigator>
		<view class="flex align-center px-3 py-2">
			<view class="flex-1 flex flex-column align-center justify-center"
			v-for="(item,index) in myData" :key="index">
				<text class="font-lg font-weight-bold">{{item.number}}</text>
				<text class="font text-secondary">{{item.name}}</text>
			</view>
		</view>
		<view class="px-3 py-2">
			<image src="/static/demo/banner1.jpg" mode="aspectFill"
			class="w-100 rounded" style="height: 170rpx;"></image>
		</view>
		<uni-list-item title="浏览历史" showExtraIcon>
			<text slot="icon" class="iconfont icon-liulan"></text>
		</uni-list-item>
		<uni-list-item title="社区认证" showExtraIcon>
			<text slot="icon" class="iconfont icon-huiyuanvip"></text>
		</uni-list-item> 
		<uni-list-item title="审核帖子" showExtraIcon>
			<text slot="icon" class="iconfont icon-keyboard"></text>
		</uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				myData:[{
					name:"帖子",
					number:100,
				},{
					name:"动态",
					number:2,
				},{
					name:"评论",
					number:3,
				},{
					name:"粉丝",
					number:10,
				}]
			}
		},
		provide:{
			list:[]
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../user-set/user-set',
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
