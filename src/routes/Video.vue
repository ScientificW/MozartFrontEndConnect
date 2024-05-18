<template>
    <div class="row">
      <div class="side">
        <div class="col-3 menu">
          <ul>
            <li><a> 操作指南</a></li>
            <p>您可以输入一份您希望获得配乐的视频。</p>
            <p>选择对应的窗口后，点击或拖拽选择原始素材。</p>
            <p>点击提交，等待生成您的专属配乐吧！</p>
            <br/>
            <li><a>温馨提示</a></li>
            <p>视频的情感色彩较为主观，因而本站生成的音乐不一定一次就能符合您的预想。</p>
            <p>如果生成音乐结果令您不满意，您可以尝试再次输入素材或追加文本描述，重新生成结果。</p>
            <p>直到获得令您满意的音乐~</p>
          </ul>
        </div>
      </div>
      <div class="main">
        <!-- 组件转换逻辑，isSubmitted为false显示music，反之Form -->
        <!-- <component :is="isSubmitted ? Music : Form" v-model="isSubmitted" /> -->
        <!-- 临时测试用 -->
        <component :is="isSubmitted ? Music : Form" v-model="isSubmitted" />
        <!-- <component :is="isSubmitted ? Form : Music" v-model="isSubmitted" /> -->
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    import Form from '../components/VideoForm.vue';
    import Music from "../components/VideoMusic.vue";
    import {ref} from "vue";
  
    const isSubmitted = ref(false)
  </script>
  
  <style scoped>
  </style>