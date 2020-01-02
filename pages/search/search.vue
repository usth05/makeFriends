<template>
	<view>
		<!-- 搜索历史 -->
		<template v-if="searchList.length == 0">
			<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-2" hover-class="bg-light" v-for="(item,index) in list" :key="index"
				 @click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</template>
		<!-- 搜索数据 -->
		<template v-else>
			<block v-for="(item,index) in searchList" :key="index">
				<!-- 帖子搜索列表 -->
				<common-list v-if="type === 'post'" :item="item" :index="index"></common-list>
				<!-- 话题搜索列表 -->
				<topic-list v-else-if="type === 'topic'"  :item="item" :index="index"></topic-list>
				<!-- 用户搜索列表 -->
				<user-list v-else-if="type === 'user'" :item="item" :index="index"></user-list>
			</block>
			
			
		</template>
	</view>
</template>

<script>
	// 帖子测试数据
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
		share_count: 2
	}];
	// 话题数据
	const demo1 = [{
		cover: "/static/demo/datapic/3.jpg",
		title: "话题名称",
		desc: "话题描述",
		todat_count: 0,
		news_count: 10
	}, {
		cover: "/static/demo/datapic/3.jpg",
		title: "话题名称",
		desc: "话题描述",
		todat_count: 0,
		news_count: 10
	}, {
		cover: "/static/demo/datapic/3.jpg",
		title: "话题名称",
		desc: "话题描述",
		todat_count: 0,
		news_count: 10
	}, {
		cover: "/static/demo/datapic/3.jpg",
		title: "话题名称",
		desc: "话题描述",
		todat_count: 0,
		news_count: 10
	}, {
		cover: "/static/demo/datapic/3.jpg",
		title: "话题名称",
		desc: "话题描述",
		todat_count: 0,
		news_count: 10
	}, {
		cover: "/static/demo/datapic/3.jpg",
		title: "话题名称",
		desc: "话题描述",
		todat_count: 0,
		news_count: 10
	}, {
		cover: "/static/demo/datapic/3.jpg",
		title: "话题名称",
		desc: "话题描述",
		todat_count: 0,
		news_count: 10
	}]
	const demo2 = [{
		avatar: "/static/default.jpg",
		userName: "小明",
		sex: 1, //0:未知，1女2：男
		age: 24,
		isFollow: true
	}, {
		avatar: "/static/default.jpg",
		userName: "小明",
		sex: 2, //0:未知，1女2：男
		age: 24,
		isFollow: false
	}, {
		avatar: "/static/default.jpg",
		userName: "小明",
		sex: 0, //0:未知，1女2：男
		age: 24,
		isFollow: false
	}]
	import commonList from '@/components/common/common-list.vue';
	import topicList from '@/components/news/topic-list.vue';
	import userList from '@/components/user-list/user-list.vue';
	export default {
		components: {
			commonList,
			topicList,
			userList
		},
		data() {
			return {
				searchText: "",
				list: ['uni-app第二季商城实战开发', 'uni-app第三季仿微信实战开发', '实战教程', '系列教程'],
				searchList: [],
				type: 'post',
			}
		},
		// 监听导航栏输入
		onNavigationBarSearchInputChanged(e) {
			this.searchText = e.text;
		},
		// 监听点击标题按钮
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent();
			}
		},
		onLoad(e) {
			if (e.type) this.type = e.type
			let pageTitle = "帖子";
			switch (this.type) {
				case 'post':
					pageTitle = "帖子";
					break;
				case 'topic':
					pageTitle = "话题";
					break;
				case 'user':
					pageTitle = "用户";
					break;
				default:
					break;
			}
			// 修改搜索占位
			// #ifdef APP-PLUS
			let currentWebview = this.$mp.page.$getAppWebview();
			let tn = currentWebview.getStyle().titleNView;
			tn.searchInput.placeholder = '搜索' + pageTitle;
			currentWebview.setStyle({
				titleNView: tn
			})
			// #endif
		},
		methods: {
			clickSearchHistory(text) {
				this.searchText = text;
				this.searchEvent();
			},
			// 搜索事件
			searchEvent() {
				// 收起键盘
				uni.hideKeyboard();
				// 处于load状态
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				// 模拟数据
				setTimeout(() => {
					switch (this.type) {
						case 'post':
							this.searchList = demo;
							break;
						case 'topic':
							this.searchList = demo1;
							break;
						case 'user':
							this.searchList = demo2;
							break;
						default:
							break;
					}
					// 隐藏load状态
					uni.hideLoading();
				}, 2000)
			}
		}
	}
</script>

<style>

</style>
