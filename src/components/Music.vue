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
      <img
          alt="音频封面"
          src="/audio_image.png"
          style="
              border-radius: 0.6125em;
              box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
                0 2px 10px 0 rgba(34, 36, 38, 0.08);
              max-height: 90%;
              max-width: 90%;
              object-fit: contain;
            "
      />
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
    <p class="show-word">
      <b style="font-size: 1.5em">生成音频：</b>
      <audio controls>
        <source :src="audioFile" type="audio/mpeg"/>
      </audio>
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
import axios from 'axios';
defineEmits(['update:modelValue'])
defineProps({
  modelValue: Boolean
})
async function fetchDataFromBackend() {
  try {
    const response = await axios.get('http://10.129.193.122:3000/music/{result_file}');
    // 处理成功的响应
    const audioFile = response.data.audioFile; // 替换成后端返回的音频文件字段名
    const prompt = response.data.prompt; // 替换成后端返回的提示词字段名
    
    // 更新页面中的音频文件和提示词
    // ...
  } catch (error) {
    // 处理错误
    console.error('Error fetching data from backend:', error);
  }
}

// 调用 fetchDataFromBackend 函数，例如在页面加载时
onMounted(() => {
  fetchDataFromBackend();
});
</script>

<style scoped>
.return-button {
  display: flex;
  justify-content: center;
}
</style>