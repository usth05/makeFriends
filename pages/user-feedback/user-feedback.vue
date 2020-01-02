<template>
	<view>
		<uni-collapse>
			<uni-collapse-item title="标题文字" showAnimation>
				<text class="content">折叠内容主体，可自定义内容及样式</text>
			</uni-collapse-item>
			<uni-collapse-item title="标题文字" showAnimation>
				<text class="content">折叠内容主体，可自定义内容及样式</text>
			</uni-collapse-item>
		</uni-collapse>
		<view class="px-3 py-2 mt-1">
			<button class="bg-main text-white w-100" style="border-radius: 50rpx; border: 0;" type="primary">意见反馈</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-ui/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-ui/uni-collapse-item/uni-collapse-item.vue'
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	export default {
		components: {
			uniSection,
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
