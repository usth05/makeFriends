<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x :scroll-into-view="scrollInto" :scroll-with-animation="true" class="scroll-row" style="height: 100rpx;">
			<view v-for="(item,index) in tabBars" :key="index" class="scroll-row-item px-3 py-2 font-md" :id="'tab' + index"
			 :class="tabIndex == index ? 'text-main font-lg font-weight-bold' : ''" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>

		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :show-scrollbar="false" :style="'height:' + scrollH + 'px'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2,index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<topic-list :item="item2" :index="index2"></topic-list>
						</block>
						<!-- 上拉加载 -->
						<loadMore :loadMore="item.loadmore"></loadMore>
					</template>
					<template v-else>
						<no-thing></no-thing>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const demo = [{
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
	import topicList from '@/components/news/topic-list.vue'
	import loadMore from '@/components/common/load-more';
	export default {
		components: {
			topicList,
			loadMore
		},
		data() {
			return {
				scrollH: 600,
				tabBars: [{
					name: '关注'
				}, {
					name: '推荐'
				}, {
					name: '体育'
				}, {
					name: '热点'
				}, {
					name: '财经'
				}, {
					name: '娱乐'
				}, {
					name: '军事'
				}, {
					name: '历史'
				}, {
					name: '本地'
				}],
				tabIndex: 0,
				scrollInto: "",
				newsList: [],
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(100) - 50;
				}
			})
			// 跟据选项生产列表
			this.getData();
		},
		// 监听点击原生标题栏搜索事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',
			});
		},
		// 监听导航按钮事件
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '../add-input/add-input',
			});
		},
		methods: {
			// 获取数据
			getData() {
				var arr = [];
				for (let i = 0; i < this.tabBars.length; i++) {
					// 生产列表模板
					let obj = {
						loadmore: "上拉加载更多", //1.上拉加载更多 2.加载中... 3.没有更多了
						list: []
					}
					if (i < 2) {
						obj.list = demo;
					}
					arr.push(obj);
				}
				this.newsList = arr;
			},
			// 下拉加载更多
			loadmore(index) {
				// 拿到当前列表数据
				let item = this.newsList[index];
				if (item.loadmore !== "上拉加载更多") return
				// 修改当前列表加载状态
				item.loadmore = "加载中...";
				//模拟加载请求
				setTimeout(() => {
					// 加载数据
					item.list = [...item.list, ...item.list]
					this.newsList[index].loadmore = "上拉加载更多";
				}, 2000)
			},
			// 切换选项
			changeTab(index) {
				if (index === this.tabIndex) {
					return
				}
				this.tabIndex = index;
				// 滚动到指定题目
				this.scrollInto = "tab" + index
			},
			// 监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},
			// 关注
			follow(e) {
				this.newsList[this.tabIndex].list[e].isFollow = true;
				uni.showToast({
					title: '关注成功'
				});
			},
			// 顶踩操作
			doSupport(e) {
				// 拿到当前对象
				const list = this.newsList[this.tabIndex].list[e.index];
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
			}
		}
	}
</script>

<style>
</style>
