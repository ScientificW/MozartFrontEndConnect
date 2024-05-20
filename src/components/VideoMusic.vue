<template>
    <!-- <div class="in-page-title" style="text-align: center; width: 85%">
      <h1>生成结果</h1>
      <br/>
    </div> -->
    <div class="content-box" style="display: flex">
      <div class = "ImgDisplay">
        <!-- <img :src="ImageReceived" alt="音频封面"  class = "showImg"> -->
        <br/>
      </div>
      <div style="flex: 6"> 
        <h1>生成结果</h1>
      <br/>
        <p class="show-word">
        <b style="font-size: 1.5em">文字描述：</b><br/>
        {{ prompt }}
      </p>
      <p class="show-word">
        <b style="font-size: 1.5em">选用模型：</b> MusicGen
      </p>
  
      <!-- 这是音乐播放和下载 -->
      <p class="show-word">
        <b style="font-size: 1.5em">生成音频：</b>
        <div>
          <!-- 播放 -->
          <audio ref="audioPlayer" :src="MusicGened" @timeupdate="updateProgress"></audio>
          <input type="range" ref="progressBar" class="progress-bar" min="0" :max="audioDuration" v-model="currentProgress" @input="seekTo">
          <button class="Buttons" @click="playAudio">播放</button>
          <button  class="Buttons" @click="pauseAudio">暂停</button>
        </div>
        <!-- 下载 -->
        <a :href="MusicGened" :download="`${music}`" class="download-link">
          下载音频
        </a>
      </p>
      </div>
    </div>
    <div class="return-button">
      <el-button type="primary" @click="$emit('update:modelValue', false)" class="return-btn">
        返回
        <el-icon style="margin-left: 5px"><CloseBold /></el-icon>
      </el-button>
    </div>
  </template>
  
  
  <script lang="ts" setup>
  
  //音频测试
  // import testWav from '/test.wav'
  
  import { CloseBold } from '@element-plus/icons-vue';
  import {Ref, ref,onMounted,onUnmounted} from 'vue';
  import { useStore } from 'vuex';
  defineEmits(['update:modelValue'])
  defineProps({
    modelValue: Boolean
  })
  // 获取vuex中存储的数据
  const store = useStore();
  const prompt = store.state.prompt;
  const music = store.state.music;
  const ImageReceived = store.state.ImgURL;
  console.log('Prompt1:', prompt);
  console.log('Music1:', music);
  const MusicGened = ref(""); // 响应式变量用于存储音频文件的URL
  
  (async () => {
    try {
      // 假设你有一个变量 music 包含音频文件名
      const musicLocation = `http://localhost:3000/music/${music}`;
  
      // 发起 fetch 请求
      const response = await fetch(musicLocation);
  
      if (response.ok) {
        // 如果响应成功，设置 MusicGened 变量为音频 URL
        MusicGened.value = URL.createObjectURL(await response.blob());
        console.log(MusicGened);
      } else {
        console.error("Failed to fetch music");
      }
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  })();
  
  
  
  
  //接下来是音频播放功能对应的代码
  const audioSrc = ref(`/root/Mozart-Diancai/Diancai-Backend/app/outputs/${music.value}`); // 替换为您的音频文件链接
  const audioPlayer: Ref<HTMLAudioElement | null> = ref(null);
  const progressBar: Ref<HTMLInputElement | null> = ref(null);
  const currentProgress: Ref<number> = ref(0);
  const audioDuration: Ref<number> = ref(0);
  
  const playAudio = () => {
    if (audioPlayer.value) {
      audioPlayer.value?.play();
    }
  };
  
  const pauseAudio = () => {
    if (audioPlayer.value) {
      audioPlayer.value?.pause();
    }
  };
  
  const updateProgress = () => {
    if (audioPlayer.value && progressBar.value) {
      currentProgress.value = audioPlayer.value.currentTime;
      progressBar.value.value = audioPlayer.value.currentTime.toString();
    }
  };
  
  const seekTo = () => {
    if (audioPlayer.value && progressBar.value) {
      audioPlayer.value.currentTime = progressBar.value.valueAsNumber;
    }
  };
  
  // import emitter from "../utils/emitter";
  // const ImageReceived = ref('');
  // //收图片事件
  // emitter.on('getImage',(url:any)=>{
  //   ImageReceived.value = url
  //   console.log("收到url：",url)
  // })//2
  
  onMounted(() => {
    console.log("onMounted触发");
    console.log("收到url：", ImageReceived.value);
    
    if (audioPlayer.value) {
      audioPlayer.value.addEventListener('loadedmetadata', () => {
        //麻痹的老说我有可能为空值，我加了if判定还报nm错，给他这行语法检查关了
        // @ts-ignore
        audioDuration.value = audioPlayer.value.duration;
      });
    }
  });
  // onUnmounted(()=>{
  //   emitter.off('getImage')
  // })//3
  </script>
  
  <style scoped>
  .return-button {
    display: flex;
    justify-content: center;
  }
  .ImgDisplay{
    flex: 4;
    padding-top: 50px;
    display: flex;
    align-items: flex-start;
    /* align-items: center; */
    justify-content: center;
    /* 测试用 */
    /* background-color: rgb(72, 50, 23); */
  }
  .showImg{
    max-height: 350px;
    max-width: 350px;
  }
  .progress-bar {
    margin-top: 20px;
    display: block;
    width: 30%;
    height: 40px;
  }
  .download-link {
    display: block;
    margin-top: 20px;
  }
  .Buttons{
    width: 15%;
    background: none;
    /* margin: 0 10px; */
    font-size: 20px;
    border: none;
    color: #0e0f29;
    cursor: pointer;
    transition: color 0.3s;
  }
  .Buttons:hover {
    color: #e9ffff;
    background-color: #92aac5
  }
  .return-btn {
    background-color: #92aac5;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .return-btn:hover {
    background-color: #414f6e;
  }
  </style>