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
							<common-list :item="item2" :index="index2" @follow="follow()" @doSupport="doSupport()"></common-list>
							<!-- 全局分割线 -->
							<divider></divider>
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
	},{
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
	const demo1 = [{
		userName: "昵称",
		userPic: "/static/demo/userpic/1.jpg",
		newsTime: "2019-12-30 下午4点30",
		isFollow: false,
		title: "我是标题",
		titlePic: "/static/demo/datapic/2.jpg",
		support: {
			type: "",
			support_count: 1,
			unsupport_count: 2
		},
		comment_count: 2,
		share_count: 2
	},{
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
				url: '../search/search?type=post',
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
						if(i == 0){
							obj.list = demo;
						}else{
							obj.list = demo1;
						}
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
