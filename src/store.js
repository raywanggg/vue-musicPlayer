import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  	state: {
    	keyword: "",
    	history: [],
    	collection: [],//存储收藏曲目
    	playlist: [],//存储点击播放单曲后的播放歌单
    	progressBar: 0,//进度条长度
    	lineMark: 0,//播放行数
    	timeAll: "00:00",
		timeCurrent: "00:00"
  	},
  	mutations: {
    	keywordSet (state, search) {
      		state.keyword = search;
		},
		progress (state, bar) {
			state.progressBar = bar;
		},
		timeSetAll (state, time) {
			state.timeAll = time;
		},
		timeSetCurrent (state, time) {
			state.timeCurrent = time;
		},
		lineSet (state, line) {
			state.lineMark = line;  
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