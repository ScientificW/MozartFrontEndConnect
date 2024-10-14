<template>
  <div class="form">
    <div class="forms" style="display: flex;flex-direction: row;align-items: center;">
      <!-- 上传图片模块 -->
      <div class="LeftForm" id="drop_zone" @dragover="handleDragOver" @drop="handleDrop" style="align-items: column;">
        <span class="tips"><b>请选择图片</b></span>
        <div v-if="ImgChosen">
          <img :src="ImgURL" alt=""  class = "showImg">
        </div>
        <input class="imgInput" type="file" image="./DragToUpload.png" id="file" multiple @change="handleFileChange">
        <div v-if="!ImgChosen">
          <img src="public\DragToUpload.png" alt="" style="height: 200px; width: 200px">
        </div>
      </div>


      <!-- 右边的块开始 -->
      <div class="RightForm" style="display: flex;flex-direction: column;align-items: center; ">
        <!-- 选择模式模块 -->
        <div class="options">
          <div class="select">
            <span class="ModeTips"><b>请选择模式</b></span>
            <el-select v-model="selectedMode" placeholder="请选择模式">
              <el-option v-for=" item  in  modes " :key="(item.value as string)" :label="(item.mode as string)"
                :value="(item.value as string)">{{ item.mode }}
              </el-option>        
            </el-select>
          </div>
        </div>
        
        <!-- 文本输入模块 演示 -->
        <div class="text">
          <span class="tips"><b>请简要描述您对生成音乐的期望*</b></span>
          <div class="textbox">
            <el-input v-model="instruction" placeholder="输入您的描述"></el-input>
          </div>
        </div>

        <!-- 选择时长模块 -->
        <div class="text">
          <span class="tips"><b>请输入音频时长（默认 20 秒）*</b></span>
          <div class="textbox">
            <el-input v-model="textInput" placeholder="输入一个数字，单位为秒"></el-input>
          </div>
        </div>

      </div>
      <!-- 右边的块结束 -->
    </div>

    <!-- 提交模块 -->
    <div class="submit">
      <!-- 提交按钮 -->
      <el-button  class="submit-btn" type="primary" @click="handleClick" :disabled="isLoading"> 
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
const selectedMode = ref('')
const textInput = ref('');
const instruction = ref('');
const emit = defineEmits(['update:modelValue'])
// const props = defineProps(['modelValue'])
// const responseInfo = ref('');
//决定Loading动画是否展示
const isLoading = ref(false);
let ImgChosen = ref(false);
const getFileUrl = (file: File) => {
  return URL.createObjectURL(file);
};
let ImgURL = ref("");

const modes: Array<{
  value: String,
  mode: String
}>
    = [{
    value: '0',
    mode: "测试用(请勿选择)"
  },
  {
    value: '1',
    mode: "Suno.ai 模型"
  },
  {
    value: '2',
    mode: "MusicGen 模型"
  }
]


  const handleDragOver = (event:Event) => {
    event.preventDefault();
  };
  const handleDrop = (event:Event) => {
    event.preventDefault();
    console.log("drop image")
    const files = event.dataTransfer.files;
    if (files) {
      // 更新 fileList 的值为选择的文件列表
      fileList.value = Array.from(files);

      ImgChosen.value = true;
      ImgURL.value = fileList.value.length > 0 ? getFileUrl(fileList.value[0]) : ''
      store.commit('setImage', ImgURL.value);
      console.log("files：", files);
    }
    console.log("拖拽图片已上传",ImgURL.value)
  }


  const handleFileChange = (event:Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      // 更新 fileList 的值为选择的文件列表
      fileList.value = Array.from(files);
      ImgChosen.value = true;
      ImgURL.value = fileList.value.length > 0 ? getFileUrl(fileList.value[0]) : ''
      store.commit('setImage', ImgURL.value);
    }
    console.log("图片已上传",ImgURL.value)
  };



const handleClick = async () => {
  // 一个判断，表格需要填完整才能上传，否则弹窗提醒
  if (selectedMode.value === null || fileList.value.length === 0) {
    window.alert('请完整填写需求');
    console.log(selectedMode.value);
    console.log(fileList.value);
    console.log(textInput.value);
    console.log(instruction.value);
  return;
  }
  
  isLoading.value = true;
  //临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用
  // emit('update:modelValue', true) 

// 将表单数据整合进formData
  const formData = new FormData();
  formData.append('file', fileList.value[0]);
  formData.append('mode', selectedMode.value);
  formData.append('music_duration', textInput.value === '' ? '20' : textInput.value);
  formData.append('instruction', instruction.value === '' ? ' ' : instruction.value);
  
  console.log(selectedMode.value);
  console.log(textInput.value);
// 进行通信
  try {
    for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);  
        }
        // 下面是服务器地址和API接口
    const response = await fetch('http://localhost:3001/upload', {
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
    const mode = ref('');
    prompt.value = responseData.converted_prompt;
    music.value = responseData.result_file_url;
    mode.value = responseData.model_name;
    console.log(responseData.result_file_url);

      // 在这里可以根据需要进行其他操作
        
    if (response.ok) {
      // 把数据扔进vuex
      store.commit('setPrompt', prompt.value);
      store.commit('setMusic', music.value);
      store.commit('setMode', mode.value);
      console.log(mode.value);
      // 把Exhibition中isSubmitted改成true,实现正常返回后组件变换为Music
      //临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用临时测试用
      emit('update:modelValue', true); 
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
    font-size: 1.3em;
    width: 100%;
    height: 100%;
    padding: 0 10%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .showImg{
    max-height: 200px;
  }

  .upload-img {
    height: fit-content;
    width: 100%;    height: fit-content;
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

  .tips {
    margin-bottom: 15px;
    display: block;
    width: 100%;
    text-align: start;
  }
  .imgInput{
    color: rgb(22, 22, 35);
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    display: block;
  }
  .ModeTips {
    margin-bottom: 4px;
    display: block;
    width: 100%;
    text-align: start;
  }

  .select {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .text {
    display: block;
    width: 100%;
    height: 20%;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .submit {
    margin-top: 40px;
    display: block;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
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
  .submit-btn {
  background-color: rgb(135, 166, 201);
  color: rgb(255, 255, 255);
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #414f6e;
}
</style>