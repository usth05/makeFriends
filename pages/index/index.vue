<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x :scroll-into-view="scrollInto" class="scroll-row">
			<view v-for="(item,index) in tabBars" :key="index" class="scroll-row-item px-3 py-2 font-md" :id="'tab' + index"
			 :class="tabIndex == index ? 'text-main font-lg font-weight-bold' : ''" @click="changeTab(index)">{{item.name}}</view>
		</scroll-view>

		<block v-for="(item,index) in list" :key="index">
			<!-- 列表样式 -->
			<common-list :item="item" :index="index" @follow="follow()" @doSupport="doSupport()"></common-list>
			<!-- 全局分割线 -->
			<divider></divider>
		</block>
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	export default {
		components: {
			commonList
		},
		data() {
			return {
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
				list: [{
					userName: "昵称",
					userPic: "/static/demo/userpic/5.jpg",
					newsTime: "2019-12-30 下午4点30",
					isFollow: false,
					title: "我是标题",
					titlePic: "",
					support: {
						type: "", //顶
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_count: 2
				}, {
					userName: "昵称",
					userPic: "/static/demo/userpic/6.jpg",
					newsTime: "2019-12-30 下午4点30",
					isFollow: false,
					title: "我是标题",
					titlePic: "/static/demo/datapic/3.jpg",
					support: {
						type: "", //踩
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_count: 2
				}, {
					userName: "昵称",
					userPic: "/static/demo/userpic/11.jpg",
					newsTime: "2019-12-30 下午4点30",
					isFollow: false,
					title: "我是标题",
					titlePic: "/static/demo/datapic/11.jpg",
					support: {
						type: "",
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_count: 2
				}],
			}
		},
		onLoad() {

		},
		methods: {
			// 切换选项
			changeTab(index) {
				if (index === this.tabIndex) {
					return
				}
				this.tabIndex = index;
				// 滚动到指定题目
				this.scrollInto = "tab" + index
			},
			// 关注
			follow(e) {
				console.log(e)
				this.list[e].isFollow = true;
				uni.showToast({
					title: '关注成功'
				});
			},
			doSupport(e) {
				console.log(e.index)
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
			}
		}
	}
</script>

<style>
</style>
