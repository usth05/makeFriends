<template>
	<view>
		<view class="flex align-center p-3 border-bottom border-light-secondary">
			<image src="/static/default.jpg" mode="" style="width:180rpx ;height: 180rpx;"></image>
			<view class="pl-3 flex flex-column flex-1">
				<view class="flex align-center mr-1">
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">获赞</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">关注</text>
					</view>
					<view class="flex-1 flex flex-column align-center justify-center">
						<text class="font-lg font-weight-bold">1</text>
						<text class="font text-muted">粉丝</text>
					</view>
				</view>
				<view class="flex align-center justify-center">
					<button type="primary" size="mini" class="bg-main" style="width: 400rpx;">关注</button>
				</view>
			</view>
		</view>
		<!-- tab -->
		<view class="flex align-center py-2">
			<view class="flex-1 flex justify-center align-center" v-for="(item, index) in tabBars" :class="tabIndex===index?'font-lg font-weight-bold text-main':'font-md'"
			 :key="index" @click="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<template v-if="tabIndex === 0">
			<view class="animated fadeIn fast">
				<view class="p-3 border-bottom">
					<view class="font-md">账号信息</view>
					<view class="font">账号年龄:12个月</view>
					<view class="font">账号id:1</view>
				</view>
				<view class="p-3 border-bottom">
					<view class="font-md">个人信息</view>
					<view class="font">星座:天蝎座</view>
					<view class="font">职业:IT</view>
					<view class="font">故乡:中国</view>
					<view class="font">情感:已婚</view>
				</view>
			</view>
		</template>
		
		<template v-else>
			<view  class="animated fadeIn fast">
				<common-list v-for="(item,index) in list" :key="index" 
				@follow="follow()" @doSupport="doSupport()" :item="item"
				:index="index" :isSpace="true"></common-list>
				<divider></divider>
				<load-more :loadMore="loadmore"></load-more>
			</view>
		</template>
		
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="top">
			<view class="w-100 bg-white">
				<view class="flex align-center justify-center font-md border-bottom py-2"
				hover-class="bg-light" @click="popupEvent('friend')">
					<text class="iconfont icon-sousuo mr-2"></text>加入黑名单
				</view>
				<view class="flex align-center justify-center font-md py-2"
				hover-class="bg-light" @click="popupEvent('clear')">
					<text class="iconfont icon-weixin mr-2"></text>聊天
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	const demo = [{
		userName: "昵称",
		userPic: "/static/demo/userpic/5.jpg",
		newsTime: "2019-12-30 下午4点30",
		isFollow: false,
		title: "我是标题",
		titlePic: "/static/demo/datapic/3.jpg",
		support: {
			type: "",
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_count: 2,
		content: "今日上午，台军一架载13人黑鹰直升机因不明原因迫降上去，'参谋总长'沈一鸣已获救",
		images: [{
			url: "/static/demo/datapic/1.jpg",
		}, {
			url: "/static/demo/datapic/3.jpg",
		}, {
			url: "/static/demo/datapic/2.jpg",
		}]
	}, {
		userName: "昵称",
		userPic: "/static/demo/userpic/1.jpg",
		newsTime: "2019-12-30 下午4点30",
		isFollow: false,
		title: "我是标题",
		titlePic: "/static/demo/datapic/1.jpg",
		support: {
			type: "",
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_count: 2,
		content: "今日上午，台军一架载13人黑鹰直升机因不明原因迫降上去，'参谋总长'沈一鸣已获救",
		images: [{
			url: "/static/demo/datapic/1.jpg",
		}, {
			url: "/static/demo/datapic/3.jpg",
		}, {
			url: "/static/demo/datapic/2.jpg",
		}]
	}];
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue';
	export default {
		components: {
			commonList,
			loadMore,
			uniPopup,
			uniSection
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
					name: "主页",
				}, {
					name: "帖子",
					list: demo,
					loadmore: "上拉加载更多",
				}, {
					name: "动态",
					list: demo,
					loadmore: "上拉加载更多",
				}],
			}
		},
		computed: {
			list() {
				return this.tabBars[this.tabIndex].list
			},
			loadmore() {
				return this.tabBars[this.tabIndex].loadmore
			}
		},
		onNavigationBarButtonTap() {
			this.$refs.popup.open();
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index;
			},
			// 关注
			follow(e) {
				this.tabBars[this.tabIndex].list[e].isFollow = true;
				uni.showToast({
					title: '关注成功'
				});
			},
			// 顶踩操作
			doSupport(e) {
				// 拿到当前对象
				const list = this.tabBars[this.tabIndex].list[e.index];
				let msg = e.type === "support" ? '顶' : '踩'
				if (list.support.type === "") { // 之前没有操作过
					list.support[e.type + '_count']++;
				} else if (list.support.type === "support" && e.type === "unsupport") { //之前顶过
					// 顶--
					list.support.support_count--;
					// 踩++ 
					list.support.unsupport_count++;
				} else if (list.support.type === "unsupport" && e.type === "support") { //之前踩过
					// 顶++
					list.support.support_count++;
					// 踩--
					list.support.unsupport_count--;
				}
				list.support.type = e.type;
				uni.showToast({
					title: msg + "成功"
				});
			},
			popupEvent(e){
				console.log(e);
			}
		}
	}
</script>

<style>

</style>
