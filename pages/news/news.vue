<template>
	<view>
		<!-- 导航栏 -->
		<uni-nav-bar :border="false" :fixed="true" :statusBar="true" @click-right="openAddInput()">
			<view class="flex align-center justify-center font-weight-bold w-100">
				<view class="mx-1" @click="changeTab(index)" :class="tabIndex == index ? 'font-lg text-main' : 'font-md text-light-muted'"
				 v-for="(tab,index) in tabBars" :key="index">
					{{tab.name}}
				</view>
			</view>
			<text slot="right" class="iconfont icon-fatie_icon"></text>
		</uni-nav-bar>

		<swiper :current="tabIndex" :duration="150" :style="'height:' + scrollH + 'px'" @change="onChangeTab">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y="true" :show-scrollbar="false" :style="'height:' + scrollH + 'px'" @scrolltolower="loadmoreEvent()">
					<block v-for="(item,index) in list" :key="index">
						<common-list :item="item" :index="index" @doSupport="doSupport()"></common-list>
						<divider></divider>
					</block>
					<load-more :loadMore="loadMore"></load-more>
				</scroll-view>
			</swiper-item>
			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px'">
					<!-- 热门分类 -->
					<hot-cate :hotCate="hotCate"></hot-cate>
					<!-- 搜索框 -->
					<view class="p-2">
						<view class="bg-light flex rounded align-center justify-center py-2 text-secondary">
							<text class="iconfont icon-sousuo mr-2"></text>
							搜索话题
						</view>
					</view>
					<!-- 轮播图 -->
					<swiper class="px-2 pb-2" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
						<swiper-item>
							<image src="/static/demo/banner1.jpg" style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
					</swiper>
					<divider></divider>
					<!-- 最近更新 -->
					<view class="p-2 font-md">最近更新</view>
					<!-- 话题列表组件 -->
					<block v-for="(item,index) in topicList" :key="index">
						<topic-list :item="item" :index="index"></topic-list>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const demo = [{
		userName: "昵称",
		userPic: "/static/demo/userpic/5.jpg",
		newsTime: "2019-12-30 下午4点30",
		isFollow: true,
		title: "我是标题",
		titlePic: "/static/demo/datapic/3.jpg",
		support: {
			type: "",
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_count: 2
	}, {
		userName: "昵称",
		userPic: "/static/demo/userpic/1.jpg",
		newsTime: "2019-12-30 下午4点30",
		isFollow: true,
		title: "我是标题",
		titlePic: "/static/demo/datapic/1.jpg",
		support: {
			type: "",
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_count: 2
	}];
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more.vue'
	import hotCate from '@/components/news/hot-cate.vue'
	import topicList from '@/components/news/topic-list.vue'
	export default {
		components: {
			uniNavBar,
			commonList,
			loadMore,
			hotCate,
			topicList
		},
		data() {
			return {
				tabBars: [{
					name: "关注"
				}, {
					name: "话题"
				}],
				tabIndex: 0,
				scrollH: 500,
				// 关注数据
				list: [],
				// 1.上拉加载更多2.加载中3.没有更多了
				loadMore: '上拉加载更多',
				hotCate: [{
					name: "关注"
				}, {
					name: "推荐"
				}, {
					name: "宣传"
				}, {
					name: "特殊"
				}, {
					name: "视频"
				}, {
					name: "音频"
				}],
				topicList: [{
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
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 94;
				}
			})
			this.list = demo;
		},
		methods: {
			// 打开发布页
			openAddInput() {
				uni.navigateTo({
					url: '../add-input/add-input',
				});
			},
			// 点击导航
			changeTab(index) {
				this.tabIndex = index;
			},
			// 滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},
			// 顶踩操作
			doSupport(e) {
				// 拿到当前对象
				const list = this.list[e.index];
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
			// 下拉加载更多
			loadmoreEvent() {
				// 拿到当前列表数据
				if (this.loadMore !== "上拉加载更多") return
				// 修改当前列表加载状态
				this.loadMore = "加载中...";
				// 模拟加载请求
				setTimeout(() => {
					// 加载数据
					this.list = [...this.list, ...this.list]
					// 设置加载状态
					this.loadMore = "上拉加载更多";
				}, 2000)
			},
		}
	}
</script>

<style>

</style>
