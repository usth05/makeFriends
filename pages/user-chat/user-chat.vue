<template>
	<view>
		<!-- 聊天列表 -->
		<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
			<block v-for="(item,index) in list" :key="index">
				<!-- 左边气泡 -->
				<user-chat-list :item="item" :index="index" :pretime="index > 0 ? list[index-1].create_time : 0"></user-chat-list>
			</block>
		</scroll-view>
		<!-- 底部操作条 -->
		<view style="height: 100rpx;" class="fixed-bottom flex align-center border-top bg-white">
			<input type="text" class="border flex-1 rounded bg-light ml-2 p-1" placeholder="文明发言">
			<view class="iconfont icon-fabu flex align-center justify-center font-lg animated" hover-class="jello" style="width: 100rpx;"></view>
		</view>
	</view>
</template>

<script>
	// 模拟当前登录用户的userId

	import userChatList from '@/components/user-chat/user-chat-list.vue';
	export default {
		components:{
			userChatList
		},
		data() {
			return {
				scrollH: 500,
				list: [{
					user_id: 2,
					avatar: "/static/demo/userpic/3.jpg",
					userName: "小明",
					data: "想笑",
					type: 'text', //img,audio,video
					create_time: '1577869664'
				}, {
					user_id: 1,
					avatar: "/static/demo/userpic/6.jpg",
					userName: "小明",
					data: "想笑",
					type: 'text', //img,audio,video
					create_time: '1577869664'
				}]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - uni.upx2px(102)
				}
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
