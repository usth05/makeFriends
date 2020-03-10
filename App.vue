<script>
	export default {
		onLaunch: function() {
			// 检测更新
			// this.$U.upDate();
			// 网络监听
			this.$U.onNetWork(); 
			// 数据初始化
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入官方css库 */
	@import url("/common/uni.css");
	/* 引入自定义图标库 */
	@import url("/common/icon.css");
	/* 引入动画库 */
	@import url("/common/animate.css");
	/* 自定义样式 */
	/* @import url("/common/base.css"); */
	@import url("/common/free.css");
	/* 公共自定义 */
	@import url("/common/common.css");
</style>
