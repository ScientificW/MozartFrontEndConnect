<template>
  <div class="in-page-title" style="text-align: center; width: 85%">
    <h1>生成结果</h1>
    <br/>
  </div>
  <div class="content-box" style="display: flex">
    <div
        style="
            flex: 4;
            padding-right: 10px;
            display: flex;
            align-items: flex-start;
            /*align-items: center;*/
            justify-content: center;
          "
    >
      <!-- <img
          alt="音频封面"
          src={{ imageFile }}
          style="
              border-radius: 0.6125em;
              box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
                0 2px 10px 0 rgba(34, 36, 38, 0.08);
              max-height: 90%;
              max-width: 90%;
              object-fit: contain;
            "
      /> -->
      <br/>
    </div>
    <div style="flex: 6">
      <p class="show-word">
      <b style="font-size: 1.5em">文字描述：</b><br/>
      {{ prompt }}
    </p>
    <p class="show-word">
      <b style="font-size: 1.5em">选用模型：</b> MusicGen
    </p>
    <!-- 这是播放器 -->
    <!-- <p class="show-word">
      <b style="font-size: 1.5em">生成音频：</b>
      <audio controls>
        <source :src="MusicGened" type="audio/mpeg"/>
      </audio>
    </p> -->
    <!-- 这是下载 -->
    <p class="show-word">
      <b style="font-size: 1.5em">生成音频：</b>
      <div>
        <!-- <audio ref="audioPlayer" :src="MusicGened"></audio> -->
        <audio ref="audioPlayer" :src="audioSrc" @timeupdate="updateProgress"></audio>
        <input type="range" ref="progressBar" min="0" :max="audioDuration" v-model="currentProgress" @input="seekTo">
        <button @click="playAudio">播放</button>
        <button @click="pauseAudio">暂停</button>
      </div>
      <a :href="MusicGened" download="generated_audio.mp3">
        下载音频
      </a>
    </p>
    </div>
  </div>
  <div class="return-button">
    <el-button type="primary" @click="$emit('update:modelValue', false)">
      返回
      <el-icon style="margin-left: 5px"><CloseBold /></el-icon>
    </el-button>
  </div>
</template>


<script lang="ts" setup>
import { CloseBold } from '@element-plus/icons-vue';
import {Ref, ref,onMounted} from 'vue';
import { useStore } from 'vuex';
defineEmits(['update:modelValue'])
defineProps({
  modelValue: Boolean
})
// 获取vuex中存储的数据
const store = useStore();
const prompt = store.state.prompt;
const music = store.state.music;
console.log('Prompt1:', prompt);
console.log('Music1:', music);
// 进行拼接，得到API返回音频的地址
// const musicLocation = `http://localhost:3000/music/${music}`;
// try{
//   const musicGened = await fetch(musicLocation)
//   if (response.ok) {
//           // 如果响应成功，设置getMusic变量为音频URL
//           console.log('OK');
//         } else {
//           console.error("Failed to fetch music");
//         }
//       } catch (error) {
//         console.error("Error fetching music:", error);
//       }
const MusicGened = ref(""); // 响应式变量用于存储音频文件的URL

(async () => {
  try {
    // 假设你有一个变量 music 包含音频文件名
    const musicLocation = `http://localhost:3000/music/${music}`;

    // 发起 fetch 请求
    const response = await fetch(musicLocation);

    if (response.ok) {
      // 如果响应成功，设置MusicGened变量为音频URL
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
const audioSrc = ref(MusicGened.value); // 替换为您的音频文件链接
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

onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.addEventListener('loadedmetadata', () => {
      //麻痹的老说我有可能为空值，我加了if判定还报nm错，给他这行语法检查关了
      // @ts-ignore
      audioDuration.value = audioPlayer.value.duration;
    });
  }
});

</script>

<style scoped>
.return-button {
  display: flex;
  justify-content: center;
}
</style>