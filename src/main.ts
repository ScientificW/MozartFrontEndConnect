import App from "./App.vue";
import { createApp } from "vue";

import "./assets/style.css";
import store from './store';
// 导入视频播放组件
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

 


//封装路由
import router from './router'

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
// 视频播放组件
app.use(VueVideoPlayer)