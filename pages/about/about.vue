<template>
	<view>
		<view class="flex align-center justify-center flex-column pt-4 pb-3">
			<image src="/static/default.jpg" style="width: 100rpx;height: 100rpx;" class="rounded-circle" mode=""></image>
			<text class="font text-muted mt-2">version 0.0.0</text>
		</view>
		<uni-list-item title="新版本检测"></uni-list-item>
		<uni-list-item title="社区用户协议"></uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	export default {
		components:{
			uniListItem
		},
		provide:{
			list:[]
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
