import { createRouter, createWebHistory } from "vue-router";
import Intro from '../routes/Intro.vue';
import Team from '../routes/Team.vue';
import Exhibition from '../routes/Exhibition.vue';
const routes = [
    { path: "/", component: Exhibition },
    { path: "/team", component: Team },
    { path: "/Intro", component: Intro },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router