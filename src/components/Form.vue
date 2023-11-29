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
    <div class="submit">
      <el-button type="primary" @click="handleClick"> 提交
        <el-icon>
          <Upload/>
        </el-icon>
      </el-button>
    </div>
  </div>
</template>
<!-- 
<script lang="ts" setup>
import {Upload, UploadFilled} from '@element-plus/icons-vue';
import {ElOption, UploadUserFile} from 'element-plus';
import {ref} from 'vue';
// import {postFormData} from "../utils/endpoints.ts";
const handleClick = async () => {
      try {
        console.log(fileList.length)
        // 构建要发送的数据对象
        const formData = new FormData();
        // 将 textInput 添加到 FormData
        formData.append('time', parseInt(textInput.value));

        // 处理 fileList，假设是一个数组
        formData.append('file', fileList[0])

        // 将 selectedMode 添加到 FormData
        formData.append('mode', parseInt(selectedMode.value));

        for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);  
        }
        const response = await fetch('http://10.129.193.122:3000/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data; boundary=${formData.boundary}',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        // 处理服务器返回的数据
        console.log(responseData);

        // 在这里可以根据需要进行其他操作
      } catch (error) {
        console.error('Error during POST request:', error);
        // 处理错误
      }
    };
const textInput = ref<String>("")
const fileList = ref<UploadUserFile[]>()
const selectedMode = ref<Number>(0)

const modes: Array<{
  value: Number,
  mode: String
}>
    = [{
  value: 0,
  mode: "测试用"
  },
//   {
//     value: 1,
//     mode: "Mubert模型"
//   },
//   {
//     value: 2,
//     mode: "Riffusion模型"
//   },
  {
    value: 1,
    mode: "MusicGen模型"
  }]
// 放入一个form data
const imgInfo = new FormData();

// 将 textInput 添加到 FormData
imgInfo.append('time', textInput.value);

// 处理 fileList，假设是一个数组
imgInfo.append('file', fileList[0])

// 将 selectedMode 添加到 FormData
imgInfo.append('mode', selectedMode.value);

// 与后端进行通信
async function backEnd() {
  try{
    const response = await fetch('http://10.129.193.122:3000/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: imgInfo
    });
    return await response.json();
  }
  catch (error) {
    return { error: error.message || 'Unknown error' };
  }
}
</script> -->
<script lang="ts" setup>
import {Upload, UploadFilled} from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';

// import {ElOption, UploadUserFile} from 'element-plus';
import {ref} from 'vue';
// import {postFormData} from "../utils/endpoints.ts";
const store = useStore();
const fileList = ref([]);
const selectedMode = ref<Number>()
const textInput = ref('');
const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])
const responseInfo = ref('');

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
    mode: "MusicGen模型"
  }]
// const modes = [
//   { value: 0, mode: '测试用' },
//   { value: 1, mode: 'MusicGen模型' }
// ];

const handleFileChange = (event) => {
  fileList.value = [event.target.files[0]];
};


const handleClick = async () => {
  // 一个判断，表格需要填完整才能上传，否则弹窗提醒
  if (selectedMode.value === null || textInput.value === '' || fileList.value.length === 0) {
    window.alert('请完成所有项目');
    console.log(selectedMode.value);
  console.log(textInput.value);
  console.log(fileList.value);

  return;
}
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
    const response = await fetch('http://10.129.193.122:3000/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
          window.alert("请求失败，请稍后再试")
          throw new Error('Network response was not ok');
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

      }
      
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
</style>