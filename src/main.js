import Vue from 'vue';
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Router from 'vue-router';
import App from './app.vue';
import Recorder from '../component/recorder.vue';
import printMe from './print.js'

Vue.use(Router);
Vue.use(Element);

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

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    });
}