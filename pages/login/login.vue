<template>
	<view>
		<uni-nav-bar :shadow="false" :border="false"></uni-nav-bar>

		<view class="iconfont icon-guanbi flex align-center justify-center font-lg" style="width: 100rpx;height: 100rpx;"
		 hover-class="bg-light" @click="back()"></view>
		<view class="text-center" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 55rpx;">
			{{status ? '手机号登录':'账号密码登录'}}
		</view>
		<view class="px-2">
			<!-- 账号密码登录 -->
			<template v-if="!status">
				<view class="mb-2">
					<input type="text" v-model="userName" placeholder="昵称/手机号/邮箱" class="border-bottom p-2">
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="password" placeholder="密码" class="border-bottom p-2 flex-1">
					<view class="flex align-center justify-center border-bottom font text-muted" style="width: 150rpx;">
						忘记密码?
					</view>
				</view>
			</template>
			<!-- 手机号登录 -->
			<template v-else>
				<view class="mb-2 flex align-stretch">
					<view class="border-bottom flex align-center justify-center font px-2 ">+86</view>
					<input type="text" v-model="phone" placeholder="手机号" class="border-bottom p-2 flex-1">
				</view>
				<view class="mb-2 flex align-stretch">
					<input type="text" v-model="code" placeholder="请输入验证码" class="border-bottom p-2 flex-1">
					<view class="mb-1 flex align-center justify-center border-bottom rounded font-sm"
					:class="codeTime > 0 ? 'bg-hover-light text-dark' : 'bg-main text-white'"
					style="width: 180rpx;" @click="getCode()">
						{{codeTime > 0 ? codeTime + ' s' : '获去验证码'}}
					</view>
				</view>
			</template>
		</view>
		<!-- 登录按钮 -->
		<view class="px-3 py-2 mt-1">
			<button class="text-white w-100" :disabled="disabled" style="border-radius: 50rpx; border: 0;"
			type="primary" :class="disabled ?'bg-main-disable':'bg-main'" @click="submit()">登录</button>
		</view>
		<!-- 登录切换 -->
		<view class="flex align-center justify-center pt-1 pb-3">
			<view class="text-primary font-sm" @click="changLogin()">{{status?'验证码登录':'账号密码登录'}}</view>
			<text class="text-muted mx-2">|</text>
			<view class="text-primary font-sm">登录遇到问题</view>
		</view>
		<!-- 第三方登录 -->
		<view class="flex align-center justify-center">
			<view style="height: 1rpx;background-color: #DDDDDD;width: 100rpx;"></view>
			<view class="mx-2 text-muted">社交账号登录</view>
			<view style="height: 1rpx;background-color: #DDDDDD;width: 100rpx;"></view>
		</view>
		<other-login></other-login>
		<!-- 协议 -->
		<view class="flex align-center justify-center text-muted">
			注册即代表同意<text class="text-primary">《xxx社区协议》</text>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import otherLogin from '@/components/common/other-login.vue';
	export default {
		components: {
			uniNavBar,
			otherLogin
		},
		data() {
			return {
				status: false,
				userName: '',
				password: '',
				phone: '',
				code: '',
				codeTime:0,
			}
		},
		onLoad() {

		},
		computed: {
			disabled() {
				if ((this.userName == '' || this.password == '') && (this.phone == '' || this.code == '')) {
					return true
				}else{
					return false
				} 
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1,
				});
			},
			// 初始化表单
			initForm(){
				this.userName = '';
				this.password = '';
				this.phone = '';
				this.code = '';
			},
			// 切换登录方式
			changLogin() {
				// 初始化表单
				this.initForm();
				this.status = !this.status
			},
			// 获去验证码
			getCode(){
				if(this.codeTime > 0)return
				let mPattern = /^1[34578]\d{9}$/; 
				if(this.phone === ''){
					uni.showToast({
						title: '手机号码不能为空',
						icon:"none"
					});
					return
				}else if(!mPattern.test(this.phone)){
					uni.showToast({
						title: '手机号码格式不正确',
						icon:"none"
					});
					return
				}
				this.codeTime = 5;
				let timer = setInterval(()=>{
					if(this.codeTime >= 1){
						this.codeTime--;
					}else{
						this.codeTime = 0;
						clearInterval(timer)
					}
				},1000)
			},
			valiData(){
				let mPattern = /^1[34578]\d{9}$/; 
				if(!mPattern.test(this.phone)){
					uni.showToast({
						title: '手机号码格式不正确',
						icon:"none"
					});
					return false
				}
			},
			// 登录提交
			submit(){
				// 表单验证 
				if(!this.valiData)return
				
				// 提交表单
				
				// 登录成功
			}
		}
	}
</script>

<style>

</style>
