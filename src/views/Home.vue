<template>
	<div id="home">
		<search></search>
		<content>
			<ul>
				<li v-bind:class="[flag == 0? active: '']" v-on:click="flag = 0"><router-link to="recommend">推荐</router-link></li>
				<li v-bind:class="[flag == 1? active: '']" v-on:click="flag = 1"><router-link to="rank">排行</router-link></li>
				<li v-bind:class="[flag == 2? active: '']" v-on:click="flag = 2"><router-link to="person">我的</router-link></li>
			</ul>
		</content>
		<router-view name="viewall"></router-view>
	</div>
</template>
<script>
import Search from "./Search.vue";
export default {
	data: function() {
		return {
			flag: 0,
			active: "active"//bind中绑定的是data中的数据，data到类的映射
		}
	},
	components: {
		Search
	}
}
</script>
<style scoped>
	@import "../../css/common";
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
			color: #ea6f5a;
			border-bottom-color: #ea6f5a;
		}
		a {
			display: inline-block;
			color: #ea6f5a;
			width: 100%;
			height: 100%;
		}
	}
</style>