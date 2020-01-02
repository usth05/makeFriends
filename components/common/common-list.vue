<template>

	<view class="p-2">
		<!-- 头像昵称  | 关注按钮-->
		<view class="flex align-center" style="justify-content: space-between;">
			<view class="flex align-center">
				<!-- 头像 -->
				<image class="rounded-circle mr-2" :src="item.userPic" @click.stop="openSpace()" style="width: 65rpx;height: 65rpx;"
				 lazy-load></image>
				<!-- 昵称发布时间 -->
				<view>
					<view class="font" style="line-height: 1.5;">{{item.userName}}</view>
					<text class="font-sm text-light-muted text-white" style="line-height: 1.5;">{{item.newsTime}}</text>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="flex align-center justify-center rounded bg-main text-white animated" hover-class="jello" @click="follow()"
			 v-if="!item.isFollow" style="width: 90rpx;height: 50rpx;">
				关注
			</view>
		</view>
		<!-- 标题 -->
		<view class="font my-1" @click="openDetail()">{{item.title}}</view>
		<!-- 帖子详情 -->
		<slot>
			<!-- 图片 -->
			<image class="rounded w-100" v-if="item.titlePic" :src="item.titlePic" @click="openDetail()" style="height: 350rpx;"></image>
		</slot>
		
		<!-- 图标按钮 -->
		<view class="flex align-center">
			<!-- 顶 -->
			<view class="flex flex-1 align-center justify-center animated faster" hover-class="jello text-main" @click="doSupport('support')"
			 :class="item.support.type == 'support'?'support-active':''">
				<text class="iconfont icon-dianzan2 mr-2"></text>
				<text>{{item.support.support_count ? item.support.support_count : "支持"}}</text>
			</view>
			<!-- 踩 -->
			<view class="flex flex-1 align-center justify-center animated faster" hover-class="jello text-main" @click="doSupport('unsupport')"
			 :class="item.support.type == 'unsupport'?'support-active':''">
				<text class="iconfont icon-cai mr-2"></text>
				<text>{{item.support.unsupport_count ? item.support.unsupport_count : "反对"}}</text>
			</view>
			<!-- 评论 -->
			<view class="flex flex-1 align-center justify-center animated faster" hover-class="jello text-main" @click="openDetail()">
				<text class="iconfont icon-pinglun2 mr-2"></text>
				<text>{{item.comment_count ? item.comment_count : "评论"}}</text>
			</view>
			<!-- 分享 -->
			<view class="flex flex-1 align-center justify-center animated faster" hover-class="jello text-main" @click="openDetail()">
				<text class="iconfont icon-fenxiang mr-2"></text>
				<text>{{item.share_count ? item.share_count : "分享"}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index: {
				type:Number,
				default:-1
			},
			isDetail:{
				type:Boolean,
				default: false
			}
		},
		methods: {
			// 打开个人空间
			openSpace() {
				console.log("打开个人空间");
			},
			// 关注功能
			follow() {
				// 通知父组件
				this.$emit('follow', this.index)
			},
			// 打开详情页
			openDetail() {
				if(this.isDetail)return
				uni.navigateTo({
					url: '../../pages/detail/detail?detail=' + JSON.stringify(this.item),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 顶踩
			doSupport(type) {
				this.$emit("doSupport", {
					type: type,
					index: this.index,
				})
			},
			// 点击评论
			doComment(){
				if(!this.isDetail){
					return this.openDetail()
				}
				this.$emit('doComment')
			},
			// 分享
			doShare(){
				if(!this.isDetail){
					return this.openDetail()
				}
				this.$emit('doShare')
			}
		}
	}
</script>

<style>
	.support-active {
		color: #FF4A6A;
	}
</style>
