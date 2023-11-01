<template>
  <div class="row">
    <div class="side">
      <div class="col-3 menu">
        <ul>
          <li><a> 操作指南</a></li>
          <p>您可以输入一张您希望获得配乐的图片</p>
          <p>点击添加图片，选择您的图片。</p>
          <p>点击提交，等待生成您的专属配乐吧！</p>
          <br/>
          <li><a>温馨提示</a></li>
          <p>
            图片与音乐的情感色彩本就是主观的，有时出现音乐与图片不适配的情况是正常的。
          </p>
          <p>如果您感到音乐风格与图片并不适配，您可以多次输入进行尝试。</p>
          <p>直到获得令您满意的音乐~</p>
        </ul>
      </div>
    </div>
    <div class="main">
      <component :is="isSubmitted ? Music : Form" v-model="isSubmitted" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Form from '../components/Form.vue';
import Music from "../components/Music.vue";
import {ref} from "vue";

const isSubmitted = ref(false)
</script>

<style scoped>
</style>