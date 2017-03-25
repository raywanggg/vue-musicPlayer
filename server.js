var co = require('co');
var fs = require('co-fs');
var logger = require('koa-logger');
var Router = require('koa-router');
var staticServe = require('koa-static');
var Koa = require('koa');

var app = new Koa();
var router = new Router({
  prefix: '/api/v1'
});

app.use(logger());

app.use(staticServe('./static/'));

router
    .get('/songs/recommend', co.wrap(function *(ctx, next){
        let size = parseInt(ctx.request.query.size) || 8;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let result = new Set();
        while(result.size < size) {
            let rand = Math.floor(Math.random(0, 1) * songs.length);
            result.add(songs[rand]);
        }
        ctx.body = Array.from(result);
    }))
    .get('/songs/rank', co.wrap(function* (ctx, next) {
        let size = parseInt(ctx.request.query.size) || 8;
        let page = parseInt(ctx.request.query.page) || 1;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8')).sort((a, b) => b.liked - a.liked);
        let rstSongs = songs.slice(page * size - size, page * size);
        let result = {
            data: rstSongs,
            totalNum: songs.length,
            page: page,
            size: rstSongs.length
        };
        ctx.body = result;
    }))
    .get('/songs/mine', co.wrap(function* (ctx, next) {
        let size = parseInt(ctx.request.query.size) || 8;
        let page = parseInt(ctx.request.query.page) || 1;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let rstSongs = songs.slice(page * size - size, page * size);
        let result = {
            data: rstSongs,
            totalNum: songs.length,
            page: page,
            size: rstSongs.length
        };
        ctx.body = result;
    }))
    .get('/songs/search', co.wrap(function* (ctx, next) {
        let key = ctx.request.query.key;
        if(!key){
            ctx.body = {data: []};
            return;
        }
        let keyReg = new RegExp(key);
        let size = parseInt(ctx.request.query.size) || 8;
        let page = parseInt(ctx.request.query.page) || 1;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        songs = songs.filter(song => keyReg.test('' + song.name + song.author));
        let rstSongs = songs.slice(page * size - size, page * size);
        let result = {
            data: rstSongs,
            totalNum: songs.length,
            page: page,
            size: rstSongs.length
        };
        ctx.body = result;
    }))
    .get('/songs/:id', co.wrap(function* (ctx, next) {
        let songsList = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let result = songsList.find((song) => ctx.params.id == song.id);
        if(!result){
            ctx.status = 404;
            ctx.body = '歌曲不存在！';
            return;
        }
        ctx.body = result;
    }));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(80, () => {
    console.log('listening on port 80');
});
