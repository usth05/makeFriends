<template>
	<view>
		<!-- 自定义导航 -->
		<uni-nav-bar left-icon="back" @clickLeft="back" statusBar :border="false">
			<view class="flex justify-center align-center w-100">
				所有人可见 <text class="iconfont icon-shezhi"></text>
			</view>
		</uni-nav-bar>
		<!-- 文本域 -->
		<textarea v-model="content" placeholder="说一句话吧~" class="w-100 px-2" 
		style="box-sizing: border-box;" />
		<!-- 多图上传 -->
		<upload-image :show="show" ref="uploadImage" :list="imageList" @change="changeImage()"></upload-image>
		
		<!-- 底部操作条 -->
		<view class="fixed-bottom bg-white flex align-center" style="height: 85rpx;">
			<view class="iconfont icon-caidan footer-btn animated"
			hover-class="jello"></view>
			<!--  -->
			<view class="iconfont icon-huati footer-btn animated"
			hover-class="jello"></view>
			<!-- 图片 -->
			<view class="iconfont icon-tupian footer-btn animated"
			hover-class="jello" @click="iconClickEvent('uploadImage')"></view>
			<view class="bg-main text-white ml-auto flex justify-center align-center rounded mr-2 animated"
			hover-class="jello"
			style="width: 140rpx;height: 60rpx;">发送</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar';
	import uploadImage from '@/components/common/upload-image';
	export default {
		components:{
			uniNavBar,
			uploadImage
		},
		data() {
			return {
				content:"",
				imageList:[],
				showBack:false,
			}
		},
		// 监听返回
		onBackPress(){
			// return true
			if(!this.showBack && (this.content !== '' || this.imageList.length > 0)){
				uni.showModal({
					content: '是否要保存为草搞',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if (res.confirm){
							this.store()
						}else { //点击不保存，清楚缓存
							uni.removeStorage({
								key:'add-input'
							})
						}
						this.back();
					}
				});
				this.showBack = true;
				return true
			}
		},
		onLoad() {
			uni.getStorage({
				key:"add-input",
				success:(res) => {
					if(res.data){
						let obj = JSON.parse(res.data);
						this.content = obj.content;
						this.imageList = obj.imageList;
					}
					
				}
			})
		},
		computed:{
			show(){
				return this.imageList.length > 0
			}
		},
		methods: {
			// 选中图片
			changeImage(e){
				this.imageList = e;
			},
			// 返回上一步
			back() {
				uni.navigateBack({delta: 1})
			},
			store(){
				uni.setStorage({
					key:'add-input',
					data:JSON.stringify({
						content:this.content,
						imageList:this.imageList
					})
				})
			},
			// 底部图片点击事件
			iconClickEvent(e){
				switch (e){
					case "uploadImage":
					this.$refs.uploadImage.chooseImage()
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style>
.footer-btn{
	width: 86rpx;
	height: 86rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50rpx;
}
</style>
