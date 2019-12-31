<template>
	<view>
		<!-- 搜索历史 -->
		<template v-if="searchList.length == 0">
		<view class="py-2 font-md px-2">搜索历史</view>
			<view class="flex flex-wrap">
				<view class="border rounded font mx-2 my-1 px-2" 
				hover-class="bg-light" 
				v-for="(item,index) in list" :key="index"
				@click="clickSearchHistory(item)">{{item}}</view>
			</view>
		</template>
		<!-- 搜索数据 -->
		<template v-else>
			<block v-for="(item,index) in searchList" :key="index">
				<common-list :item="item" :index="index"></common-list>
			</block>
		</template>
	</view>
</template>

<script>
	// 测试数据
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
	import commonList from '@/components/common/common-list.vue';
	export default {
		components:{
			commonList
		},
		data() {
			return {
				searchText: "",
				list: ['uni-app第二季商城实战开发', 'uni-app第三季仿微信实战开发', '实战教程', '系列教程'],
				searchList: []
			}
		},
		// 监听导航栏输入
		onNavigationBarSearchInputChanged(e) {
			console.log(e.text);
			this.searchText = e.text;
		},
		// 监听点击标题按钮
		onNavigationBarButtonTap(e) {
			console.log(e);
			if (e.index === 0) {
				this.searchEvent();
			}
		},
		methods: {
			clickSearchHistory(text){
				this.searchText = text;
				this.searchEvent();
			},
			searchEvent() {
				// 收起键盘
				uni.hideKeyboard();
				// 处于load状态
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				// 模拟数据
				setTimeout(()=>{
					this.searchList = demo;
					// 隐藏load状态
					uni.hideLoading();
				},2000)
			}
		}
	}
</script>

<style>

</style>
