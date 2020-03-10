import $C from '@/common/config.js';
export default{
	common:{
		method: 'GET',
		header:{
			"content-type":"application/json"
		},
		data: {},
	},
	request(options = {}){
		options.url= $C.webUrl + '/postclass';
		options.method = options.method || this.common.method
		options.header = options.header || this.common.header
		return uni.request(options);
	},
	get(url,data = {},options = {}){
		options.url = url
		options.data = data;
		options.method = 'GET';
		return this.request(options)
	}
}