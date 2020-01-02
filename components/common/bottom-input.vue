<template>
	<view style="height: 100rpx;" class="fixed-bottom flex align-center border-top bg-white">
		<input type="text" v-model="content" @confirm="submit()" class="border flex-1 rounded bg-light ml-2 p-1" placeholder="文明发言">
		<view class="iconfont icon-fabu flex align-center justify-center font-lg animated" hover-class="jello" style="width: 100rpx;"
		 @click="submit()"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				content :"",
			}
		},
		methods:{
			// 发送消息
			submit() {
				if (this.content === '') {
					return uni.showToast({
						title: '消息不能为空',
						icon: "none"
					});
				}
				this.$emit('submit',this.content);
				this.content = '';
			},
		}
	}
</script>

<style>
</style>
