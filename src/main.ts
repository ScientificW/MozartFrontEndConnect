import App from "./App.vue";
import { createApp } from "vue";

import "./assets/style.css";
import store from './store';

//封装路由
import router from './router'

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
