<template>
	<view>
		<!-- tab -->
		<view class="flex align-center py-2">
			<view class="flex-1 flex justify-center align-center" v-for="(item, index) in tabBars" :class="tabIndex===index?'font-lg font-weight-bold text-main':'font-md'"
			 :key="index" @click="changeTab(index)">
				{{item.name}}<text class="ml-2" v-if="item.num > 0">{{item.num}}</text>
			</view>
		</view>
		<!-- 列表 -->
		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px'">
			<swiper-item v-for="(item,index) in newsList" :key="index">
				<scroll-view scroll-y="true" :show-scrollbar="false" :style="'height:' + scrollH + 'px'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length > 0">
						<!-- 列表 -->
						<block v-for="(item2,index2) in item.list" :key="index2">
							<!-- 列表样式 -->
							<user-list :item="item2" :index="index2"></user-list>
						</block>
						<!-- 上拉加载 -->
						<loadMore v-if="item.list.length > 10" :loadMore="item.loadmore"></loadMore>
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
	import loadMore from '@/components/common/load-more.vue';
	import noThing from '@/components/common/no-thing.vue';
	import userList from '@/components/user-list/user-list.vue';
	export default {
		components: {
			noThing,
			loadMore,
			userList
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
					name: "互关",
					num: 0
				}, {
					name: "关注",
					num: 2
				}, {
					name: "粉丝",
					num: 30
				}],
				scrollH: 500,
				newsList: [],
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(100);
				}
			})
			// 跟据选项生产列表
			this.getData();
		},
		// 点击导航栏搜索框
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search',
			});
		},
		// 点击导航栏按钮
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
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
			// tab切换
			changeTab(index) {
				this.tabIndex = index;
				console.log()
			},
			// 监听滑动
			onChangeTab(e) {
				this.changeTab(e.detail.current);
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
		}
	}
</script>

<style>

</style>
