import { createApp } from "vue";
import "./assets/style.css";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Intro from "./routes/Intro.vue";
import Team from "./routes/Team.vue";
import Exhibition from "./routes/Exhibition.vue";

const routes = [
  { path: "/", component: Intro },
  { path: "/team", component: Team },
  { path: "/exhibition", component: Exhibition },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
