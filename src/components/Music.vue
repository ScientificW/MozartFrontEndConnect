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
        <!-- 改为后端读取 -->
        Luminous boy cradles celestial artifact, a digital tableau adorned
        with stellar brilliance, evoking ethereal melodies in an artistic
        composition.
      </p>
      <p class="show-word">
        <!-- 改为后端读取 -->
        <b style="font-size: 1.5em">情感指定：</b> contentment
      </p>
      <p class="show-word">
        <!-- 改为后端读取 -->
        <b style="font-size: 1.5em">选用模型：</b> Mubert
      </p>
      <p class="show-word">
        <b style="font-size: 1.5em">生成音频：</b>
        <audio controls>
          <!-- 改为后端读取 -->
          <source src="/audio.mp3" type="audio/mpeg"/>
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

defineEmits(['update:modelValue'])
defineProps({
  modelValue: Boolean
})
</script>

<style scoped>
.return-button {
  display: flex;
  justify-content: center;
}
</style>