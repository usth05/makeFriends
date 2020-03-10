export default {
	// 监听网络
	onNetWork() {
		let func = (res) => {
			if (res.networkType === 'none') {
				uni.showToast({
					title: "您当前处于断网状态,请先连接网络",
					icon: "none"
				})
			} else if (res.networkType === '4g') {
				uni.showToast({
					title: "您当前处于非wifi网络环境下，继续使用可能产生流量",
					icon: "none"
				})
			} else if (res.networkType === '3g' || res.networkType === '2g') {
				uni.showToast({
					title: "您当前网络环境较差，建议切换wifi网络环境",
					icon: "none"
				})
			}
		}
		uni.getNetworkType({ // 获取当前网络
			success: func
		});
		uni.onNetworkStatusChange(func); // 监听网络变化
	},
	// 热更新 
	upDate() {
		// #ifdef APP-PLUS  
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			uni.request({
				url: 'https://ceshi.dishait.cn/api/v1/update/',
				data: {
					version: widgetInfo.version,
					name: widgetInfo.name
				},
				success: (result) => {
					var data = result.data;
					if (data.update && data.wgtUrl) {
						uni.downloadFile({
							url: data.wgtUrl,
							success: (downloadResult) => {
								if (downloadResult.statusCode === 200) {
									plus.runtime.install(downloadResult.tempFilePath, {
										force: false
									}, function() {
										console.log('install success...');
										plus.runtime.restart();
									}, function(e) {
										console.error('install fail...');
									});
								}
							}
						});
					}
				}
			});
		});
		// #endif
	},
	// 转化公共列表数据
	formatCommonList(v) {
		return {
			id: v.id,
			user_id: v.user.id,
			userName: v.user.userName,
			userPic: v.user.userPic,
			newsTime: v.create_time,
			isFollow: false,
			title: v.title,
			titlePic: v.titlepic,
			support: {
				type: "",
				support_count: 1,
				unsupport_count: 2
			},
			comment_count: v.comment_count,
			share_count: v.share_count,
		}
	}
}
