var co = require('co');
var fs = require('co-fs');
var logger = require('koa-logger');
var Router = require('koa-router');
var staticServe = require('koa-static');
var cors = require('kcors');
var Koa = require('koa');

var app = new Koa();
var router = new Router({
    prefix: '/api/v1'
});

app.use(logger());
app.use(cors());
app.use(staticServe('./static/'));

//router for songs
router
    .get('/songs/recommend', co.wrap(function* (ctx, next) {
        let size = parseInt(ctx.request.query.size) || 8;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let result = new Set();
        while (result.size < size) {
            let rand = Math.floor(Math.random(0, 1) * songs.length);
            result.add(songs[rand]);
        }
        ctx.body = Array.from(result);
    }))
    .get('/songs/rank', co.wrap(function* (ctx, next) {
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8')).sort((a, b) => b.liked - a.liked);
        let result = [[], [], []];
        Array.from({length: 9}).forEach(function(d, index){
            result[index % 3].push(songs[index]);
        });
        ctx.body = result;
    }))
    .get('/songs/mine', co.wrap(function* (ctx, next) {
        let size = parseInt(ctx.request.query.size) || 8;
        let page = parseInt(ctx.request.query.page) || 1;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let collectedIds = JSON.parse(yield fs.readFile(`./database/my_collected.js`, 'utf8'));
        let rstSongs = songs.filter(song => collectedIds.includes(song.id)).slice(page * size - size, page * size);
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
        if (!key) {
            ctx.body = {
                data: []
            };
            return;
        }
        let keyReg = new RegExp(key);
        let size = parseInt(ctx.request.query.size) || 8;
        let page = parseInt(ctx.request.query.page) || 1;
        let songs = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        songs = songs.filter(song => keyReg.test(song.name + ' ' +  song.singer + ' ' + song.album));
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
        if (!result) {
            ctx.status = 404;
            ctx.body = '歌曲不存在！';
            return;
        }
        ctx.body = result;
    }))
    .put('/songs/collection/:id', co.wrap(function* (ctx, next) {
        let songsList = JSON.parse(yield fs.readFile(`./database/songs_list.js`, 'utf8'));
        let result = songsList.some((song) => ctx.params.id == song.id);
        if (!result) {
            ctx.status = 404;
            ctx.body = '歌曲不存在！';
            return;
        }
        let collectedIds = JSON.parse(yield fs.readFile(`./database/my_collected.js`, 'utf8'));
        let index = Array.prototype.indexOf.call(collectedIds, +ctx.params.id);
        if(index > -1){
            collectedIds.splice(index, 1);
        } else {
            collectedIds.push(+ctx.params.id);
        }
        ctx.status = 200;
        fs.writeFile(`./database/my_collected.js`, JSON.stringify(collectedIds), {'encoding': 'utf8'});
    }));

//router for lyrics
router
    .get('/lyrics/:md5', co.wrap(function* (ctx, next) {
        ctx.body = JSON.parse(yield fs.readFile(`./database/lyrics/${ctx.params.md5}.js`, 'utf8'));
    }));

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8087, () => {
    console.log('listening on port 8087');
});