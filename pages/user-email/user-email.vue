<template>
	<view>
		<input class="uni-input" type="text" value="" placeholder="请输入你要绑定的邮箱"/>
		<input class="uni-input" type="text" value="" placeholder="请输入密码">
		<view class="px-3 py-2 mt-1">
			<button class="bg-main text-white w-100" :disabled="disable"
			style="border-radius: 50rpx; border: 0;"
			type="primary"
			:class="disable?'bg-main-disable':''" @click="submit()">设置</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:"",
				password:""
			}
		},
		computed:{
			disable(){
				return this.email === '' || this.password === '';
			},
			
		},
		methods: {
			// 验证
			check(){
				let rule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([-Za-z]{2,4})$/;
				if(!rule.test(this.email)){
					uni.showToast({
						title:"邮箱格式不正确",
						icon:"none"
					})
					return false
				}
				return true
			},
			submit(){
				if(!this.check()){
					return;
				}
				uni.showToast({
					title: '提交成功'
				});
			}
		}
	}
</script>

<style>

</style>
