<template>
	<div id="home">
		<div id="search">
			<div class="search-wrapper">
				<input id="searchInput" type="text" v-model="keyword" placeholder="输入歌曲名、歌手名或专辑名">
				<!-- 写在内侧的click会优先a跳转执行 -->
				<router-link to="result"><label for="searchInput" v-on:click="searchSong">搜索</label></router-link>
				<img v-show="isSearch" v-on:click="backHome" src="../assets/image/back1.png" class="search-back">
			</div>
		</div>
		<content v-show="!isSearch">
			<ul class="homeTab-wrap">
				<li v-bind:class="[pageflag == 0? isActive: '']" v-on:click="pageflag = 0"><router-link to="recommend">推荐</router-link></li>
				<li v-bind:class="[pageflag == 1? isActive: '']" v-on:click="pageflag = 1"><router-link to="rank">排行</router-link></li>
				<li v-bind:class="[pageflag == 2? isActive: '']" v-on:click="pageflag = 2"><router-link to="person">我的</router-link></li>
			</ul>
		</content>
		<router-view name="viewall"></router-view>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data: function() {
		return {
			isActive: "active"//bind中绑定的是data中的数据，data到类的映射
			// isSearch: false
		}
	},

	computed: {
		keyword: {
			get() {
				return this.$store.state.keyword;
			},
			set(keyword) {
				this.$store.commit("keywordSet", keyword);
			}
		},
		pageflag: {
			get() {
				return this.$store.state.pageflag;
			},
			set(pageflag) {
				this.$store.commit("pageflagSet", pageflag);
			}
		},
		isSearch: {
			get() {
				return this.$store.state.isSearch;
			},
			set(isSearch) {
				this.$store.commit("isSearchSet", isSearch);
			}
		}
	},

	// mapState只能写入，get/set可以双向绑定
	// computed: mapState({
	// 	keyword: state => state.keyword
	// }),

	methods: {
		searchSong: function() {
			// if (this.isSearch == true) {
			// 	location.reload();
			// }
			// this.$store.commit("set", this.keyword);
			this.isSearch = true;
			this.$store.commit("update", this.keyword);
			console.log(this.$store.state.keyword);
		},
		backHome: function() {
			this.isSearch = false;
			this.keyword = "";
			switch(this.pageflag) {//路由改变不用监听
				case 0: this.$router.push("recommend"); break;
				case 1: this.$router.push("rank"); break;
				case 2: this.$router.push("person"); break;
			}
		}
	}
}
</script>
<style scoped>
	@import "../../css/common";
	#search {
		width: 100%;
		height: 70px;
		/*background: var(--color-theme);*/
		background: var(--color-theme);
		.search-wrapper {
			input {
				width: 70%;
			    height: 38px;
			    margin: 15px 20px;
			    border: 1px solid #ddd;
			    border-radius: 20px;
			    outline: none;
			    text-indent: 15px;
			}
			label {
				color: #fff;
				font-size: 20px;
				margin-left: 10px;
				cursor: pointer;
			}
			a {
				color: #fff;
			}
			.search-back {
				width: 22px;
			    height: 22px;
			    margin-top: -6px;
			    margin-left: 6px;
			}
		}
	}
	ul {
		margin-top: 0;
		width: 100%;
		height: 40px;
		line-height: 40px;
		li {
			float: left;
			cursor: pointer;
			font-size: 18px;
			margin: 0 10px;
			width: calc(33% - 20px);
			text-align: center;
			border-bottom: 2px solid transparent;
		}
		.active {
			color: var(--color-theme);
			border-bottom-color: var(--color-theme);
		}
		a {
			display: inline-block;
			color: var(--color-theme);
			width: 100%;
			height: 100%;
		}
	}
</style>