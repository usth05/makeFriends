<template>
	<view>
		<input class="uni-input" type="text" v-model="oldPassword" placeholder="输入旧密码" />
		<input class="uni-input" type="text" v-model="newPassword" value="" placeholder="输入新密码" />
		<input class="uni-input" type="text" v-model="renewPassword" placeholder="输入确认密码" />
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
				oldPassword: '',
				newPassword: '',
				renewPassword: ''
			}
		},
		computed:{
			disable(){
				return this.oldPassword === '' || this.newPassword === '' || this.renewPassword === '';
			},
			
		},
		methods: {
			// 验证
			check(){
				if(this.newPassword === this.renewPassword){
					uni.showToast({
						title: '输入的两次密码不一致',
						icon:"none"
					});
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
