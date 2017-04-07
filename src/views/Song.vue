<template>
	<div class="song-wrapper">
		<div id="song-back"></div>
		<div class="song-wrap">
			<div class="song-cover">
				<div id="fc-wrapper" v-bind:class="[isCoverOpen? fcOpen: '', fcWrapper]">
					<!-- right-most handle piece -->
					<div class="fc-handle fc-handle-pull" v-on:click="toggleCover()"></div>
					<div class="fc-perspective">
						<!-- right part overlay; get's darker -->
						<div class="fc-overlay fc-overlay-reverse"></div>
						<!-- middle handle piece -->
						<div class="fc-handle fc-handle-out"><div></div></div>
						<!-- inner bottom content part -->
						<div class="fc-bottom">
							<div class="fc-bottom-bg">
								<div class="fc-content">
									<!-- <p>song's name<span>song's singer</span></p> -->
									<p>{{ songInfo.name }}</p>
									<strong>-- 专辑《{{ songInfo.album }}》</strong>
									<div class="fc-content-span-wrap">
										<span>词：{{ songInfo.lyricist }}</span>
										<span>曲：{{ songInfo.composer }}</span>
										<span>唱：{{ songInfo.singer }}</span>
									</div>
								</div>
							</div>
							<div class="fc-overlay fc-overlay-solid"></div>
						</div><!-- fc-bottom end -->
						<!-- front and back of the flipping half -->
						<div class="fc-flip">
							<div class="fc-front">
								<div class="fc-inner">
									<div class="fc-overlay fc-overlay-left"></div>
									<!-- left-most part of handle -->
									<div class="fc-handle fc-handle-in"><div></div></div>
									<div class="fc-content">
										<h3>{{ songInfo.name }}</h3>
										<p>{{ songInfo.singer }}</p>
									</div>
								</div>
							</div><!-- fc-front end -->
							<div class="fc-back">
								<div class="fc-inner">
									<div class="fc-content">
										<div class="feynman" id="album-cover">
											<!-- <span>1918 &ndash; 1988</span> -->
										</div>
									</div>
									<div class="fc-overlay fc-overlay-right"></div>
								</div>
							</div><!-- fc-back end -->	
						</div><!-- fc-flip end -->		
					</div><!-- fc-perspective end -->
				</div>
			</div>
			<div class="song-lyric">
				<div class="lyric-content">
					<ul id="lyric-wrapper">
						<li v-for="item in lyricArray" v-bind:class="[item.isLinePlay? lyricHigh: '', lyricLine]">
							<span class="lyric-time">{{ item.m }}:{{ item.s }}:{{ item.ms }}</span>
							<span class="lyric-word">{{ item.content }}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="song-control">
				<audio id="audio" v-bind:src="songSrc" loop="loop" autoplay="autoplay" @timeupdate = "getSongOffset()"></audio>
				<div class="control-progress">
					<div class="progressBar">
						<div class="progressBac" id="progressBac"></div>
					    <div class="speed" id="speed"></div>
					    <div class="drag" id="drag"></div>
					</div>
					<div id="progressTime">
						<div class="timeDetail">
							<span class="currentTime" id="currentTime">{{ timeCurrent }}</span>/<span class="allTime" id="allTime">{{ timeAll }}</span>
						</div>
					</div>
				</div>
				<div class="control-button">
					<div class="button-play">
						<img v-show="!isCoverOpen" src="../assets/image/song-play.png" v-on:click="playControl()">
						<img v-show="isCoverOpen" src="../assets/image/song-stop.png" v-on:click="playControl()">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data: function() {
		return {
			fcWrapper: "fc-wrapper",
			fcOpen: "fc-wrapper-open",
			lyricLine: "lyric-line",
			lyricHigh: "lyric-high",
			isCoverOpen: true,
			songInfo: "",
			songSrc: "",
			lyricArray: [],
			allTime: 0,
			currentTime: 0
		}
	},
	computed: {
		proBar: {
			get() {
				return this.$store.state.progressBar;
			},
			set(proBar) {
				this.$store.commit("progress", proBar);
			}
		},
		preLine: {
			get() {
				return this.$store.state.lineMark;
			},
			set(preLine) {
				this.$store.commit("lineSet", preLine);
			}
		},
		timeAll: {
			get() {
				return this.$store.state.timeAll;
			},
			set(timeAll) {
				this.$store.commit("timeSetAll", timeAll);
			}
		},
		timeCurrent: {
			get() {
				return this.$store.state.timeCurrent;
			},
			set(timeCurrent) {
				this.$store.commit("timeSetCurrent", timeCurrent);
			}
		}
	},
	methods: {
		//封面切换
		toggleCover: function() {
			// this.isCoverOpen = !this.isCoverOpen;
		},
		//时间转换
		toggleTime: function(time) {
			var minute = time/60;
		    var minutes = parseInt(minute);
		    var second = time%60;
		    var seconds = parseInt(second);
		    if (minutes < 10) {
		        minutes = "0" + minutes;
		    }
		    if (seconds < 10) {
		        seconds = "0" + seconds;
		    }
		    var timeNew = "" + minutes + "" + ":" + "" + seconds + "";
		    return timeNew;
		},
		//播放控制
		playControl: function() {
			var audio = document.getElementById("audio");
			if (this.isCoverOpen == true) {
				audio.pause();
			} else {
				audio.play();
				this.progressMove();
			}
			this.isCoverOpen = !this.isCoverOpen;
		},
		//进度条移动
		progressMove: function() {
			var self = this;
			var audio = document.getElementById("audio");
			var progressBac = document.getElementById("progressBac");
			var drag = document.getElementById("drag");
			var speed = document.getElementById("speed");
			this.proBar = progressBac.clientWidth;
			setInterval(function() {
				//this指向window
				self.proBar = progressBac.clientWidth;
		        drag.style.left = (audio.currentTime / audio.duration) * (self.proBar) + "px";
		        speed.style.left = -((self.proBar) - (audio.currentTime / audio.duration) * (self.proBar)) + "px";
		    }, 250);
		},
		//播放监听
		playListener: function() {
			var audio = document.getElementById("audio");
			var self = this;
			audio.addEventListener("loadeddata", function() {
				// 加载之后才可以拖动进度条

				self.allTime = audio.duration;
				self.timeAll = self.toggleTime(self.allTime);
				self.currentTime = audio.currentTime;
				self.timeCurrent = self.toggleTime(self.currentTime);
				setInterval(function() {
					self.currentTime = audio.currentTime;
					self.timeCurrent = self.toggleTime(self.currentTime);
				}, 1000);
			}, false);
			audio.addEventListener("pause", function() {
				if (audio.currentTime == audio.duration) {
					audio.stop();
					audio.currentTime = 0;
				}
			}, false);
			audio.addEventListener("play", function() {
				self.progressMove();
			}, false);
			audio.addEventListener("ended", function() {
				//默认单曲播放

				console.log("end");
			}, false);
		},
		getSongLyric: function(lyric) {
			var items = [];
			items = lyric.split("\n");
			items.pop();
			items = items.filter(function(item) {
				return item != "" || item != undefined || item != null;
			});
			this.lyricArray = items.map(function(value) {
				//匹配歌词
				var reg = /^\[(\d+):(\d+)\.(\d+)]\s*(.*)/;
				var val = value.match(reg);
				return {
					m: val[1] ? val[1]:'', 
					s: val[2] ? val[2]:'', 
					ms: val[3] ? val[3]:'', 
					content: val[4] ? val[4]:'',
					isLinePlay: false
				};			
			});
		},
		getSongOffset: function() {
			// setInterval(function() {
				var self = this;
				self.preLine = 0;
				var lyricWrapper = document.getElementById("lyric-wrapper");
				for (var i = 0; i < self.lyricArray.length - 1; i++) {
					var lyric = self.lyricArray[i];
					var lyricNext = self.lyricArray[i + 1];
					var lyricTime = (parseInt(lyric.m * 60) + parseInt(lyric.s)) + '.' + lyric.ms;
					var lyricTimeNext = (parseInt(lyricNext.m * 60) + parseInt(lyricNext.s)) + '.' + lyricNext.ms;
					if (self.currentTime >= lyricTime && self.currentTime <= lyricTimeNext) {
						self.preLine = i;
						self.lyricArray[self.preLine].isLinePlay = true;
						self.lyricArray[self.preLine - 1].isLinePlay = false;
						break;
					}
				}
				if (self.preLine > 2) {
					lyricWrapper.style.top = (2 - self.preLine) * 40 + "px";
				}
			// }, 500);
		},
		getSongInfo: function() {
			var songId = this.$router.history.current.params.id;
			this.$http.get('songs/' + songId).then(function(data) {
				console.log(data.body);
				this.songInfo = data.body;
				this.songSrc = "src/assets/song/" + this.songInfo.md5 + ".mp3";
				//设置背景
				var song_background = "src/assets/image/album/" + this.songInfo["album_img"];
				document.getElementById("song-back").style.background = "url(" + song_background + ") no-repeat fixed center/cover";
				document.getElementById("album-cover").style.background = "url(" + song_background + ") no-repeat center right";
				//获取歌词
				this.$http.get('lyrics/' + this.songInfo.md5).then(function(data) {
					this.getSongLyric(data.body.lyric);
				}, function(data) {
					console.log(data.msg);
				});
			}, function(data) {
				console.log(data.msg);
			});
		}
	},
	created: function() {
		this.getSongInfo();
	},
	mounted: function() {
		this.playListener();
	}
}
</script>
<style scoped>
	@import "../../css/common";
	@import "../../css/cover-demo";
	@import "../../css/cover-style";
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
		width: 100%;
		height: 100%;
		position: relative;
		.song-lyric {
			position: relative;
			background: transparent;
			width: 100%;
			height: calc(80% - 310px);
			margin: 0;
			.lyric-content {
				position: absolute;
				width: 95%;
				height: 200px;
				margin: auto;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				overflow: hidden;
				#lyric-wrapper {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					.lyric-line {
						line-height: 40px;
						height: 40px;
						color: #dedede;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						span {
							display: inline-block;
						}
						.lyric-time {
							width: 90px;
							font-size: 16px;
							text-align: center;
						}
						.lyric-word {
							width: calc(100% - 90px);
							font-size: 16px;
							text-align: center;
						}
					}
					.lyric-high {
						color: #fff !important;
					}
				}
			}
		}
		.song-control {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 140px;
			/*进度条*/
			.control-progress {
				/*padding: 10px;*/
				position: relative;
				height: 40px;
				margin: 20px 8px 0 22px;
				overflow: hidden;
				.progressBar{ 
					position: absolute;
					width: 75%; 
					height: 5px;
					left: 0; 
					top: 10px;
					div {
						position: absolute;
					}
					.progressBac {
						width: 100%;
						height: 3px;
						left: 0;
						top: 0;
						background: #dedede;
					}
					.speed {
						width: 100%;
						height: 3px;
						left: -100%;
						background: #ea6f5a;
					}
					.drag {
						width: 10px;
						height: 10px;
						left: 0;
						top: -3px;
						background: #ea6f5a;
						border: 3px solid #ededed;
						border-radius: 50%;
						/*box-shadow: #fff 0 0 5px;  */
					}
				}
				#progressTime {
					position: absolute;
					width: 25%;
					height: 20px;
					right: 0;
					top: 5px;
					.timeDetail {
						color: #dedede;
						font-size: 13px;
						text-align: center;
					}
				}
			}
			.control-button {
				padding: 10px;
				.button-play {
					width: 48px;
					height: 48px;
					margin: auto;
					img {
						width: 100%;
						height: 100%;
						cursor: pointer;
					}
				}
			}
		}
	}
	@media (max-height: 640px) {
		.song-lyric {
			display: none;
		}
	}
</style>
