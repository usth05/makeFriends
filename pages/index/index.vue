<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<!-- 列表样式 -->
			<common-list :item="item" :index="index" @follow="follow()"></common-list>
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
				list: [{
					userName: "昵称",
					userPic: "/static/demo/userpic/5.jpg",
					newsTime: "2019-12-30 下午4点30",
					isFollow: false,
					title: "我是标题",
					titlePic: "",
					support: {
						type: "support",
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
						type: "support",
						support_count: 1,
						unsupport_count: 2
					},
					comment_count: 2,
					share_count: 2
				}, ]
			}
		},
		onLoad() {

		},
		methods: {
			// 关注
			follow(e){
				console.log(e)
				this.list[e].isFollow = true;
				uni.showToast({
					title: '关注成功'
				});
			}
		}
	}
</script>

<style>
</style>
