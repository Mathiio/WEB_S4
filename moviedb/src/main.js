import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Home from '@components/Home.vue'
import Discover from '@components/Discover.vue'
import News from '@components/News.vue'
import Ratted from '@components/Ratted.vue'
import Calendar from '@components/Calendar.vue'
import Match from '@components/Match.vue'
import MediaPrev from '@components/MediaPrev.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', component: Home },
  { path: '/discover', component: Discover },
  { path: '/news', component: News },
  { path: '/ratted', component: Ratted },
  { path: '/calendar', component: Calendar },
  { path: '/match', component: Match },
  { path: '/MediaPrev/:id', component: MediaPrev, name: 'MediaPrev' },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

const app = createApp(App)


app.use(router)

app.mount('#app')

