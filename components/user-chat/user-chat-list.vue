<template>
	<view>
		<!-- 时间 -->
		<view v-if="shortTime" class="py-2 flex align-center justify-center font-sm text-light-muted">{{shortTime}}</view>
		<!-- 消息气泡 -->
		<view class="flex align-start px-2 my-2" :style="isSelf ? 'flex-direction: row-reverse;':''">
			<image :src="item.avatar" style="height: 100rpx;width: 100rpx;" class="rounded-circle"></image>
			<view class="bg-light p-2 rounded mx-2" style="max-width: 400rpx;">{{item.data}}</view>
		</view>
	</view>
</template>

<script>
	const uid = 1;
	import $T from '@/common/time.js';
	export default {
		props: {
			item: Object,
			index: Number,
			pretime: [Number, String]
		},
		computed: {
			isSelf() {
				return this.item.user_id === uid
			},
			shortTime() {
				return $T.getChatTime(this.item.create_time, this.pretime)
			}
		},
	}
</script>

<style>
</style>
