<template>
	<div class="song-wrapper">
		<div id="song-back"></div>
		<div class="song-wrap">
			<div class="song-cover"></div>
			<div class="song-lyric"></div>
			<div class="song-control"></div>
		</div>
	</div>
</template>
<script>
export default {
	data: function() {
		return {
			songInfo: ""
		}
	},
	methods: {
		getSongInfo: function() {
			var songId = this.$router.history.current.params.id;
			this.$http.get('songs/' + songId).then(function(data) {
				this.songInfo = data.body;
				//设置背景
				var song_background = "src/assets/image/album/" + this.songInfo["album_img"];
				document.getElementById("song-back").style.background = "url(" + song_background + ") no-repeat fixed center/cover";
				//获取歌词
				// getters: {
				//     parseLyric: (state) => {
				//       let lyricArray = [];
				//       if (state.lyric) {
				//         lyricArray = state.lyric.split('\n');
				//         if (lyricArray[0].indexOf('by') !== -1) {
				//           lyricArray.shift();
				//         }
				//         lyricArray = lyricArray.filter(l => l !== '');
				//         lyricArray = lyricArray.map((l) => {
				//           const reg = /^\[(\d+):(\d+)\.(\d+)]\s*(.*)/;
				//           const data = l.match(reg);
				//           return { m: data[1], s: data[2], ms: data[3], content: data[4] };
				//         });
				//       }
				//       console.log(lyricArray);
				//       return lyricArray;
				//     },
				//     topOffset: (state, getters) => {
				//       const time = state.currentTime;
				//       const lyricArray = getters.parseLyric;
				//       let flag = 0;
				//       for (let i = 0; i < lyricArray.length; i += 1) {
				//         const lyric = lyricArray[i];
				//         const lyricTime = (lyric.m * 60) + (+lyric.s) + '.' + lyric.ms;
				//         if (time < lyricTime) {
				//           flag = i - 1;
				//           break;
				//         }
				//       }
				//       if (flag < 0) {
				//         flag = 0;
				//       }
				//       state.lyricRow = flag;
				//       if (flag < 3) {
				//         return 0;
				//       }
				//       return ((flag - 2) * 2) * 16;
				//     }
				//   },
			}, function(data) {
				console.log(data.msg);
			});
		},

	},
	created: function() {
		this.getSongInfo();
	}
}
</script>
<style>
	@import "../../css/common";
	.song-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}
	#song-back {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/*background: url() no-repeat fixed center/cover;*/
		filter: blur(25px);
		opacity: 0.8;
	}
	.song-wrap {

	}
</style>
