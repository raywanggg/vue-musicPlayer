import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  	state: {
    	keyword: ""
  	},
  	mutations: {
    	set (state, search) {
      		state.keyword = search;
		}
  	}
});
export default store;