<template>
  <div class="form">
    <div class="upload-img">
      <span class="tips">请选择图片</span>
    <div></div>
      <!-- <el-upload v-model="fileList" :auto-upload=false accept="image" action="#" drag :limit=1 @change="handleFileChange">
        <el-icon class="el-icon--upload">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">将图片拖动到此处或<em>点击上传</em></div>
      </el-upload> -->
      <input type="file" id="file" multiple @change="handleFileChange">

    </div>
    <!-- <div class="img-url">
      <span style="width: 150px">或输入图片链接</span>
      <el-input v-model="imgUrl" clearable placeholder="请输入图片链接">
        <template #prepend>
          <el-select v-model="selectedUrlType" placeholder="请选择" style="width: 90px">
            <el-option v-for="i in urlTypes" :value="i"/>
          </el-select>
        </template>
      </el-input>
    </div> -->
    <div class="options">
      <div class="select">
        <span class="tips">请选择模式</span>
          <el-select v-model="selectedMode" placeholder="请选择模式">
            <el-option v-for=" item  in  modes " :key="(item.value as number)" :label="(item.mode as string)"
                     :value="(item.value as number)">{{ item.mode }}
            </el-option>        
          </el-select>
      </div>
      <!-- <div class="select">
        <span class="tips">请选择情感</span>
        <el-select v-model="selectedMotion" placeholder="请选择情感">
          <el-option v-for=" i  in  motions " :key="(i.value as number)" :label="(i.motion as string)"
                     :value="(i.value as number)">{{ i.motion }}
          </el-option>
        </el-select>
      </div> -->
    </div>
    <div class="text">
      <span class="tips">请输入音频时长</span>
      <div class="textbox">
        <input type="text" v-model="textInput" placeholder="输入一个数字，单位为秒">
      </div>
      
    </div>

    <!-- <div class="submit">
      <el-button type="primary" @click="handleClick"> 提交
        <el-icon>
          <Upload/>
        </el-icon>
      </el-button>
    </div> -->

    <div class="submit">
      <!-- 使用一个 div 包裹提交按钮和加载动画 -->
      <div>
        <!-- 提交按钮 -->
        <el-button  type="primary" @click="handleClick" :disabled="isLoading"> 
          <span v-if="!isLoading">提交</span>
          <span v-else>处理中…</span> 
          <img v-if="isLoading" class = 'loading' src="/Loading.svg"/>
          <span v-if="isLoading"> 。 </span>  
          <el-icon v-if="!isLoading">
            <Upload/>
          </el-icon>
        </el-button>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {Upload, UploadFilled, Watch} from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
//Loading动画的css样式
import 'animate.css';
// import {ElOption, UploadUserFile} from 'element-plus';
import {ref, onUnmounted} from 'vue';
// import {postFormData} from "../utils/endpoints.ts";

const store = useStore();
const fileList = ref<File[]>([]); // 声明一个 ref，初始化为空数组
const selectedMode = ref<Number>()
const textInput = ref('');
const emit = defineEmits(['update:modelValue'])
// const props = defineProps(['modelValue'])
// const responseInfo = ref('');
//决定Loading动画是否展示
const isLoading = ref(false);

const modes: Array<{
  value: Number,
  mode: String
}>
    = [{
    value: 0,
    mode: "测试用(请勿选择)"
  },
  {
    value: 1,
    mode: "MusicGen模型"
  }]
// const modes = [
//   { value: 0, mode: '测试用' },
//   { value: 1, mode: 'MusicGen模型' }
// ];


const handleFileChange = (event:Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  
  if (files && files.length > 0) {
    // 更新 fileList 的值为选择的文件列表
    fileList.value = Array.from(files);
  }
};



const handleClick = async () => {
  // 一个判断，表格需要填完整才能上传，否则弹窗提醒
  if (selectedMode.value === null || textInput.value === '' || fileList.value.length === 0) {
    window.alert('请完整填写需求');
    console.log(selectedMode.value);
    console.log(textInput.value);
    console.log(fileList.value);

  return;
  }
  
  isLoading.value = true;

// 将表单数据整合进formData
  const formData = new FormData();
  formData.append('file', fileList.value[0]);
  formData.append('mode', selectedMode.value);
  formData.append('time', textInput.value);
// 进行通信
  try {
    for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);  
        }
        // 下面是服务器地址和API接口
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });

    if (!response.ok) {
          window.alert("请求失败，请稍后再试")
          throw new Error('Request failed due to unstable network connection');
        }
        // 获取返回的数据
        const responseData = await response.json();

        // 处理服务器返回的数据
        console.log(responseData);
        const prompt = ref('');
        const music = ref('');
        
        prompt.value = responseData.prompt;
        music.value = responseData.result_file;

        // 在这里可以根据需要进行其他操作
        
    if (response.ok) {
      // 把数据扔进vuex
      store.commit('setPrompt', prompt.value);
      store.commit('setMusic', music.value);
      // 把Exhibition中isSubmitted改成true,实现正常返回后组件变换为Music
      emit('update:modelValue', true) 
    }
   
    } catch (error) {
      console.error('Error during POST request:', error);
      ElMessage.error('An error occurred while submitting the form.');
      isLoading.value = false;
    }
    // finally {
    // // 无论成功还是失败，最终都将 loading 状态设置为 false，隐藏 loading 动画
    // isLoading.value = false;
    // }

    onUnmounted(()=>{
      isLoading.value = false;
    })
};
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
    width: 10%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tips {
    width: 100%;
    text-align: start;
  }

  .text {
    width: 100%;
    height: 20%;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
  }

  .textbox{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .loading{
    width: 43%;
    height: 43%;
  }
</style>