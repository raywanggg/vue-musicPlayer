<template>
	<div>
		<p>this is recommend</p>	
	</div>
</template>
<script>
	export default {
		name: "recommend",
		methods: {
			fetch: function() {
				this.$http.get('songs/recommend').then(function(data) {
					//成功回调
					console.log(data);
				}, function(data) {
					//错误回调
					console.log(data.msg);
				});
			}
		},
		created: function() {
			this.fetch();
		}
	}
</script>
<style>
	@import "../../css/common";
</style>