import Vue from 'vue'
import VueRouter from 'vue-router'
// var login = require('../views/Login.vue')
import todos from '../views/Todos.vue';

import login from "../views/Login.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/todos',
    name: 'todos',
    component: todos
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
