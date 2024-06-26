import "./assets/css/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Home from "@components/Home.vue";
import Discover from "@components/Discover.vue";
import News from "@components/News.vue";
import Ratted from "@components/Ratted.vue";
import Match from "@components/Match.vue";
import MediaPrev from "@components/Media.vue";
import { createRouter, createWebHistory } from "vue-router";
import VueSplide from "@splidejs/vue-splide";

const routes = [
  { path: "/", component: Home },
  { path: "/discover", component: Discover },
  { path: "/news", component: News },
  { path: "/ratted", component: Ratted },
  { path: "/match", component: Match },
  { path: "/Media/:id", component: MediaPrev, name: "Media" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(VueSplide);
app.mount("#app");
