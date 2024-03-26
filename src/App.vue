<template>
  <div class="header">
    <h1>点彩成乐</h1>
    <h3>
      Mozart's Touch，一个多模态图像配乐系统<br />
      生活里的所有人，都是音乐家。
    </h3>
  </div>

  <div class="navbar">
    <router-link to="/Intro" active-class="active">项目简介</router-link>
    <router-link to="/" active-class="active">图片配乐</router-link>
    <router-link to="/video" active-class="active">视频配乐</router-link>
    <!-- <router-link to="/team" active-class="active">成员简介</router-link> -->
  </div>

  <router-view />

  <div class="footer">
    <h2>“点彩成乐” 项目组</h2>
    <p>感谢大家的支持！</p>
  </div>
</template>
