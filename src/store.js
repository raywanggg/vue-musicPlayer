import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  	state: {
    	keyword: "",
    	history: [],
    	collection: [],//存储收藏曲目
    	playlist: []//存储点击播放单曲后的播放歌单
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