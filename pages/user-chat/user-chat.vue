<template>
	<view>
		<!-- 聊天列表 -->
		<scroll-view scroll-y="true" :scroll-into-view="scrolloInto" scroll-with-animation class="position-absolute" style="top: 0;left: 0;right: 0;bottom: 100rpx;">
			<block v-for="(item,index) in list" :key="index">
				<!-- 左边气泡 -->
				<view :id="'chat'+index">
					<user-chat-list :item="item" :index="index" :pretime="index > 0 ? list[index-1].create_time : 0"></user-chat-list>
				</view>

			</block>
		</scroll-view>
		<!-- 底部操作条 -->
		<bottom-input @submit="submit()"></bottom-input>
	</view>
</template>

<script>
	// 模拟当前登录用户的userId

	import userChatList from '@/components/user-chat/user-chat-list.vue';
	import bottomInput from '@/components/common/bottom-input.vue';
	export default {
		components: {
			userChatList,
			bottomInput
		},
		data() {
			return {
				scrolloInto: "",
				content: "",
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
				}, {
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
				}, {
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
				}, {
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
				}, {
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
		onReady() {
			this.pageTogottom();
		},
		methods: {
			// 发送消息
			submit(data) {
				let obj = {
					user_id: 1,
					avatar: "",
					userName: "昵称",
					text: "text",
					data: data,
					create_time: (new Date()).getTime()
				}
				this.list.push(obj);
				this.pageTogottom();
			},
			// 滚动到底部
			pageTogottom() {
				let lastIndex = this.list.length - 1;
				if (lastIndex < 0) return
				this.scrolloInto = 'chat' + lastIndex;
			}
		}
	}
</script>

<style>

</style>
