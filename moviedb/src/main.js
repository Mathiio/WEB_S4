import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Home from '@components/Home.vue'
import Discover from '@components/Discover.vue'
import News from '@components/News.vue'
import Ratted from '@components/Ratted.vue'
import Calendar from '@components/Calendar.vue'
import Match from '@components/Match.vue'
import MoviePrev from '@components/MoviePrev.vue'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  { path: '/', component: Home },
  { path: '/discover', component: Discover },
  { path: '/news', component: News },
  { path: '/ratted', component: Ratted },
  { path: '/calendar', component: Calendar },
  { path: '/match', component: Match },
  { path: '/MoviePrev/:id', component: MoviePrev, name: 'MoviePrev' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})


createApp(App).use(router).mount('#app')

