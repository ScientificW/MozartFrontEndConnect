<template>
  <div class="form">
    <div class="upload-img">
      <el-upload v-model="fileList" :auto-upload=false accept="image" action="#" drag :limit=1>
        <el-icon class="el-icon--upload">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">将图片拖动到此处或<em>点击上传</em></div>
      </el-upload>
    </div>
    <div class="img-url">
      <span style="width: 150px">或输入图片链接</span>
      <el-input v-model="imgUrl" clearable placeholder="请输入图片链接">
        <template #prepend>
          <el-select v-model="selectedUrlType" placeholder="请选择" style="width: 90px">
            <el-option v-for="i in urlTypes" :value="i"/>
          </el-select>
        </template>
      </el-input>
    </div>
    <div class="options">
      <div class="select">
        <span class="tips">请选择模式</span>
        <el-select v-model="selectedMode" placeholder="请选择模式">
          <el-option v-for=" item  in  modes " :key="(item.value as number)" :label="(item.mode as string)"
                     :value="(item.value as number)">{{ item.mode }}
          </el-option>
        </el-select>
      </div>
      <div class="select">
        <span class="tips">请选择情感</span>
        <el-select v-model="selectedMotion" placeholder="请选择情感">
          <el-option v-for=" i  in  motions " :key="(i.value as number)" :label="(i.motion as string)"
                     :value="(i.value as number)">{{ i.motion }}
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="submit">
      <el-button type="primary" @click="handleClick"> 提交
        <el-icon>
          <Upload/>
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Upload, UploadFilled} from '@element-plus/icons-vue';
import {ElOption, UploadUserFile} from 'element-plus';
import {ref} from 'vue';
// import {postFormData} from "../utils/endpoints.ts";

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

function handleClick() {
  emit('update:modelValue', true)
  console.log(props.modelValue)
}

const fileList = ref<UploadUserFile[]>()
const imgUrl = ref<String>("")
const selectedMode = ref<Number>(0)
const selectedMotion = ref<Number>(0)
const selectedUrlType = ref<String>("https://")

const urlTypes = ["http://", "https://"]
const motions: Array<{
  value: number,
  motion: string
}> = [{
  value: 0,
  motion: "高兴"
},
  {
    value: 1,
    motion: "悲伤"
  },
  {
    value: 2,
    motion: "愤怒"
  },
  {
    value: 3,
    motion: "惊讶"
  },
  {
    value: 4,
    motion: "恐惧"
  },
  {
    value: 5,
    motion: "厌恶"
  },
  {
    value: 6,
    motion: "中性"
  }]
const modes: Array<{
  value: Number,
  mode: String
}>
    = [{
  value: 0,
  mode: "测试用"
},
  {
    value: 1,
    mode: "Mubert模型"
  },
  {
    value: 2,
    mode: "Riffusion模型"
  },
  {
    value: 3,
    mode: "MusicGen模型"
  }]

</script>

<style scoped>
.form {
  width: 100%;
  height: 100%;
  padding: 0 10%;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-img {
  height: fit-content;
  width: 100%;
  padding: 10px;
}

.options {
  width: 100%;
  height: 30%;
  padding: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.img-url {
  height: 20%;
  width: 100%;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.submit {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tips {
  width: 100%;
  text-align: start;
}
</style>