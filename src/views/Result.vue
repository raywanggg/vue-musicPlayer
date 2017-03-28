<template>
	<div class="result-wrapper">
		<ul>
			<li></li>
		</ul>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	name: "result",
	data: function() {
		return {

		}
	},
	computed: mapState({
		value: state => state.keyword
	}),
	methods: {
		//从store获取keyword
		getResult: function() {
			console.log(this.value);
			this.$http.get('songs/search?key=' + this.value).then(function(data) {
				console.log(data);
				
			}, function(data) {
				console.log(data.msg);
			});
		}
	},
	watch: {
		value: function(val) {
			//val是改变之后的value
			this.getResult();
		}
	},
	created: function() {
		this.getResult();
	}
}
</script>
<style>
	@import "../../css/common";
</style>