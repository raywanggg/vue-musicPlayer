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
    template: "<app></app>",
    components: {
        App
    }
});

