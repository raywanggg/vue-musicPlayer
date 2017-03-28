import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  	state: {
    	keyword: "",
    	tabActive: ""
  	},
  	mutations: {
    	set (state, search) {
      		state.keyword = search;
		},
    	get (state, search) {
    		search = state.keyword;
    	}
  	}
});
export default store;