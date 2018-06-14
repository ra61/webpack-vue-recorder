import Vue from 'vue';
import Router from 'vue-router';
import App from './app.vue';
import Recorder from "../component/recorder.vue";

Vue.use(Router);

const routes = [
    { path: '/recorder', component: Recorder }
]

const router = new Router({
    routes // (缩写) 相当于 routes: routes
});


new Vue({
    el: '#app',
    router,
    render: h => h(App)
})