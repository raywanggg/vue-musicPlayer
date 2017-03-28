<template>
	<div class="result-wrapper">
		<ul>
			<li></li>
		</ul>
	</div>
</template>
<script>
export default {
	name: "result",
	data: function() {
		return {
			value: ""
		}
	},
	methods: {
		//从store获取keyword
		getResult: function() {
			this.$store.commit("get", this.value);
			console.log(this.value);
			this.$http.get('songs/search', {key: this.value}).then(function(data) {
				// console.log(data);
				
			}, function(data) {
				// console.log(data.msg);
			});
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