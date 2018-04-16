import Vue from 'vue';
import Router from 'vue-router';
import Webcam from './views/Webcam.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'webcam',
      component: Webcam,
    },
  ],
});
