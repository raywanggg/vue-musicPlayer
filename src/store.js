import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  	state: {
  		isShow: sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem('store')).isShow || false,//翻页标志位
  		isSearch: sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).isSearch || false,//搜索标志位
  		pageflag: sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).pageflag || 0,//分页标志位
    	keyword: sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).keyword || "",//搜索关键词
    	history: sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).history || [],//搜索历史记录
    	collection: sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).collection || [],//存储收藏曲目
    	playlist: sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).playlist || [],//存储点击播放单曲后的播放歌单
    	progressBar: sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).progressBar || 0,//进度条长度
    	lineMark: sessionStorage.getItem('store') && sessionStorage.getItem('store') && sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).lineMark || 0,//播放行数
    	timeAll: sessionStorage.getItem('store') && sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).timeAll || "00:00",//播放总时长
		timeCurrent: sessionStorage.getItem('store') && JSON.parse(sessionStorage.getItem("store")).timeCurrent || "00:00"//播放当前时长
  	},
  	mutations: {
  		isShowSet (state, isShow) {
  			state.isShow = isShow;
  		},
  		isSearchSet (state, isSearch) {
  			state.isSearch = isSearch;
  		},
  		pageflagSet (state, pageflag) {
  			state.pageflag = pageflag;
  		},
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
		listSet (state, list) {
			state.playlist = list;
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