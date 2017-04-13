import Vue from 'vue';
import App from './App.vue';
import routes from './router';
import store from './store';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// import * as filters from './filters';
// import store from './store';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
    el: "#app",
    router,
    store,
    template: "<app></app>",
    components: {
        App
    }
});

// window.onbeforeunload = function() {
// 	window.location.href = "localhost:8088";
// };
if (performance.navigation.type == '1') {
	window.location.href = "localhost:8088";
}


