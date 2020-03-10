<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x :scroll-into-view="scrollInto" :scroll-with-animation="true" class="scroll-row" style="height: 100rpx;">
			<view v-for="(item,index) in tabBars" :key="index" class="scroll-row-item px-3 py-2 font-md" :id="'tab' + index"
			 :class="tabIndex == index ? 'text-main font-lg font-weight-bold' : ''" @click="changeTab(index)">{{item.classname}}</view>
		</scroll-view>

		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :show-scrollbar="false" :style="'height:' + scrollH + 'px'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2,index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<common-list :item="item2" :index="index2" @follow="follow()" @doSupport="doSupport()"></common-list>
							<!-- 全局分割线 -->
							<divider></divider>
						</block>
						<!-- 上拉加载 -->
						<loadMore :loadMore="item.loadmore"></loadMore>
					</template>
					<!-- 加载中 -->
					<template v-else-if="!item.firstLoad">
						<view class="text-light-muted flex align-center justify-center font-md" style="height: 200rpx;">
							加载中
						</view>
					</template>
					<!-- 没有更多数据 -->
					<template v-else>
						<no-thing></no-thing>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	import loadMore from '@/components/common/load-more';
	export default {
		components: {
			commonList,
			loadMore
		},
		data() {
			return {
				scrollH: 600,
				tabBars: [],
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
				url: '../search/search?type=post',
			});
		},
		// 监听导航按钮事件
		onNavigationBarButtonTap(e) {
			this.navigateTo({
				url: '../add-input/add-input',
			});
		},
		methods: {
			// 获取数据
			getData() {
				// 获取分类
				this.$H.get('/postclass').then(res => {
					let [err, result] = res;
					this.tabBars = result.data.data.list;
					let arr = [];
					for (let i = 0; i < this.tabBars.length; i++) {
						arr.push({
							loadmore: "上拉加载更多",
							list: [],
							page: 1,
							firstLoad: false,
						});
					}
					this.newsList = arr;
					if (this.tabBars.length) {
						// this.getList();
					}
				})
			},
			getList() {
				let index = this.tabIndex;
				let id = this.tabBars[index].id;
				let page = this.newsList[index].page;
				let isrefresh = page === 1;
				let url = 'postclass/' + id + '/post/' + page;
				this.$H.get(url).then(res => {
					let [err, result] = res;
					console.log(result)
					return;
					let list = result2.data.data.list.map(v => {
						return this.$U.formatCommonList(v)
					});
					this.newsList[index].list = isrefresh ? list : [...this.newsList[index].list, ...list];
					this.newsList[index].loadmore = list.length < 10 ? '没有更多了' : '上拉加载更多';
					if (isrefresh) {
						this.newsList[index].firstLoad = true;
					}
				})
			},
			// 下拉加载更多
			loadmore(index) {
				// 拿到当前列表数据
				let item = this.newsList[index];
				if (item.loadmore !== "上拉加载更多") return
				// 修改当前列表加载状态
				item.loadmore = "加载中...";
				//模拟加载请求
				this.getList();
			},
			// 切换选项
			changeTab(index) {
				if (index === this.tabIndex) {
					return
				}
				this.tabIndex = index;
				// 滚动到指定题目
				this.scrollInto = "tab" + index;
				if (!this.newsList[index].firstLoad) {
					this.getList();
				}

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
		},
	}
</script>

<style>
</style>
