<template>
	<view>
		<topic-info :info="info"></topic-info>
		<divider></divider>
		<view class="p-2 flex align-center border-bottom"
		hover-class="bg-light" v-for="(hot , index) in hotList" :key="index">
			<text class="iconfont icon-xihuan text-main"></text>
			<text class="font-md text-dark text-ellipsis">
				{{hot.title}}
			</text>
		</view>
		<divider></divider>
		<!-- tab -->
		<view class="flex align-center py-2">
			<view class="flex-1 flex justify-center align-center"
			v-for="(item, index) in tabBars" 
			:class="tabIndex===index?'font-lg font-weight-bold text-main':'font-md'" 
			:key="index" @click="changeTab(index)">{{item.name}}</view>
		</view>
		<!-- 列表 -->
		<template v-if="listData.length > 0">
			<block v-for="(item ,index) in listData" :key="index">
				<common-list :item="item" :index="index"></common-list>
				<divider></divider>
			</block>
			<!-- 上拉加载 -->
			<load-more :loadMore="loadtext"></load-more>
		</template>
		<template v-else>
			<no-thing></no-thing>
		</template>
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
		share_count: 2
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
		share_count: 2
	}];
	import topicInfo from '@/components/topic-detail/topic-info.vue';
	import commonList from '@/components/common/common-list.vue';
	import noThing from '@/components/common/no-thing.vue';
	import loadMore from '@/components/common/load-more.vue';
	export default {
		components:{
			topicInfo,
			commonList,
			noThing,
			loadMore
		},
		data() {
			return {
				info: {
					cover: "/static/demo/datapic/3.jpg",
					title: "话题名称",
					desc: "话题描述",
					todat_count: 0,
					news_count: 10
				},
				hotList:[{
					title:'【新人必读】uni-app实战第二季商城项目开发'
				},{
					title:'【新人必读】uni-app实战第三季微信项目开发'
				}],
				tabIndex:0,
				tabBars:[{
					name:"默认"
				},{
					name:"最新"
				}],
				list1:[],
				loadText1:"上拉加载更多",//上拉加载
				list2:[],
				loadText2:"上拉加载更多",//上拉加载
			}
		},
		onLoad(e) {
			if(e.detail){
				this.info = JSON.parse(e.detail);
			}
			this.list1 = demo;
		},
		onReachBottom() {
			this.loadmore();
		},
		computed:{
			listData(){
				return this['list' + (this.tabIndex + 1)]
			},
			loadtext(){
				return this['loadText' + (this.tabIndex + 1)]
			}
		},
		methods: {
			// tab切换
			changeTab(index){
				this.tabIndex = index;
			},
			//上拉加载事件
			loadmore(){
				// 拿到当前列表
				let index = this.tabIndex;
				// 判断处于什么状态
				if(this.loadtext !== "上拉加载更多") return;
				// 设置下拉加载处于加载中
				this['loadText' + (index+1)] = "加载中...";
				// 请求数据
				setTimeout(()=>{
					this['list' + (index+1)] = [...this['list' + (index+1)],...this['list' + (index+1)]];
					this['loadText' + (index+1)] = "上拉加载更多";
				},2000)
			}
		}
	}
</script>

<style>
.filter{
	filter: blur(10px);
}
</style>
