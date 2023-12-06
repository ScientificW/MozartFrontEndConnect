import { createApp } from "vue";
import "./assets/style.css";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Intro from "./routes/Intro.vue";
import Team from "./routes/Team.vue";
import Exhibition from "./routes/Exhibition.vue";
import store from './store';
const routes = [
  { path: "/", component: Exhibition },
  { path: "/team", component: Team },
  { path: "/Intro", component: Intro },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
