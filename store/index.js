import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginStatus: false
  },
  mutations: {
    changeLoginStatus (state,status) {
		// console.log(status)
		state.loginStatus = status;
    }
  }
})