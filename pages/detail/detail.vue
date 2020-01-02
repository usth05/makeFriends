<template>
	<view>
		<!-- 帖子详情页详细信息 -->
		<common-list :item="info" isDetail @doSupport="doSupport" @follow="follow" @doShare="doShare" @doComment="doComment">
			<view>{{info.content}}</view>
			<view>
				<image v-for="(item,index) in info.images" :key="index" @click="preview(index)" :src="item.url" class="w-100" mode="widthFix"></image>
			</view>
		</common-list>

		<divider></divider>
		<!-- 评论 -->
		<view class="p-2 font-md font-weight-bold">
			最新评论 3
		</view>
		<view class="px-2">
			<view class="uni-comment-list">
				<view class="uni-comment-face">
					<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
				</view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>小猫咪</text>
					</view>
					<view class="uni-comment-content">支持国产，支持DCloud!</view>
					<view class="uni-comment-date">
						<view>2天前</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<bottom-input @submit="submit()"></bottom-input>
		<!-- 分享 -->
		<more-share ref="share"></more-share>

	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue';
	import bottomInput from '@/components/common/bottom-input.vue';
	import moreShare from '@/components/common/more-share.vue';
	export default {
		components: {
			commonList,
			bottomInput,
			moreShare
		},
		data() {
			return {
				info: {
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
				}
			}
		},
		onLoad(e) {
			// 初始化数据
			if (e.detail) {
				this.init(JSON.parse(e.detail));
			}
		},
		onNavigationBarButtonTap() {
			this.$refs.share.open();
		},
		onBackPress() {
			this.$refs.share.close();
		},
		computed: {
			imagesList() {
				return this.info.images.map(item => item.url);
			}
		},
		methods: {
			init(data) {
				// 修改标题
				uni.setNavigationBarTitle({
					title: data.title
				})
				// 请求api
				this.info = data;
			},
			doComment() {
				console.log("评论")
			},
			doShare() {
				console.log("分享")
			},
			// 关注
			follow() {
				this.info.isFollow = true;
				uni.showToast({
					title: "关注成功"
				});
			},
			// 顶踩功能
			doSupport(e) {
				if (this.info.support.type === e.type) {
					return uni.showToast({
						title: '你已经操作过了',
						icon: "none"
					});
				}
				let msg = e.type === 'support' ? '顶' : '踩';
				if (this.info.support.type === '') {
					this.info.support[e.type + '_count']++;
				} else if (this.info.support.type === "support" && e.type === "unsupport") { //之前顶过
					// 顶--
					this.info.support.support_count--;
					// 踩++ 
					this.info.support.unsupport_count++;
				} else if (this.info.support.type === "unsupport" && e.type === "support") { //之前踩过
					// 顶++
					this.info.support.support_count++;
					// 踩--
					this.info.support.unsupport_count--;
				}
				this.info.support.type = e.type;
				uni.showToast({
					title: msg + "成功"
				});
			},
			// 预览图片
			preview(index) {
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imagesList,
				});
			},
			// 提交评论
			submit(data) {
				console.log(data);
			}
		}
	}
</script>

<style>

</style>
