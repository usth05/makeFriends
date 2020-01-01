<template>
	<view>
		<!-- 消息列表-->
		<template v-if="list.length > 0">
			<block v-for="(item, index) in list" :key="index">
				<msg-list :item="item" :index="index"></msg-list>
			</block>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
		
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="w-100 bg-white">
				<view class="flex align-center justify-center font-md border-bottom py-2"
				hover-class="bg-light" @click="popupEvent('friend')">
					<text class="iconfont icon-sousuo mr-2"></text>添加好友
				</view>
				<view class="flex align-center justify-center font-md py-2"
				hover-class="bg-light" @click="popupEvent('clear')">
					<text class="iconfont icon-shanchu mr-2"></text>删除列表
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const demo = [{
		avatar: "/static/default.jpg",
		userName: "sth",
		update_time: "1577869664",
		data: "你好啊，朋友",
		noread: 20
	}, {
		avatar: "/static/default.jpg",
		userName: "sth",
		update_time: "1577869664",
		data: "你好啊，朋友",
		noread: 20
	}, {
		avatar: "/static/default.jpg",
		userName: "sth",
		update_time: "1577869664",
		data: "你好啊，朋友",
		noread: 20
	}, {
		avatar: "/static/default.jpg",
		userName: "sth",
		update_time: "1577869664",
		data: "你好啊，朋友",
		noread: 20
	}]
	import msgList from '@/components/msg/msg-list.vue';
	import noThing from '@/components/common/no-thing.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue';
	export default {
		components: {
			msgList,
			noThing,
			uniPopup,
			uniSection
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.list = [...this.list,...demo];
		},
		onPullDownRefresh() {
			this.refresh();
		},
		// 监听导航栏按钮事件
		onNavigationBarButtonTap(e) {
			switch (e.index){
				case 0: //左边
				uni.navigateTo({
					url: '../user-list/user-list'
				});
				this.$refs.popup.close()
					break;
				case 1: //右边
				this.$refs.popup.open();
					break;
				default:
					break;
			}
		},
		methods: {
			refresh() {
				setTimeout(()=>{
					this.list = [...this.list,...demo];
					uni.stopPullDownRefresh();
				},2000)
			},
			// 弹出层点击事件
			popupEvent(e){
				switch (e){
					case 'friend':
					console.log("添加好友")
						break;
					case 'clear':
						console.log("删除列表")
						break;
					default:
						break;
				}
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>

</style>
