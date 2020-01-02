<template>
	<view>
		<view class="iconfont icon-guanbi flex align-center justify-center font-lg position-fixed"
		style="width: 100rpx;height: 100rpx;left: 0;"
		:style="'top:' + statusBarHeight + 'px'" hover-class="bg-light"
		@click="back()"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight:60,
			}
		},
		onLoad() {
			let {statusBarHeight} = uni.getSystemInfo();
			this.statusBarHeight = statusBarHeight;
		},
		methods: {
			back(){
				uni.navigateBack({
					delta: 1,
				});
			}
		}
	}
</script>

<style>

</style>
