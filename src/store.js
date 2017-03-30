import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  	state: {
    	keyword: "",
    	history: []
  	},
  	mutations: {
    	set (state, search) {
      		state.keyword = search;
		},
		update (state, search) {
			if (state.history.length == 6) {
				state.history.unshift(search);
				state.history.pop();
			} else {
				state.history.unshift(search);
			}
		}
  	}
});
export default store;