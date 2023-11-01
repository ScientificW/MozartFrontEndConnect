<template>
  <div class="header">
    <h1>点彩成乐</h1>
    <h3>
      基于 CLIP & MuBert 的图像配乐工具<br />
      生活里的所有人，都是音乐家。
    </h3>
  </div>

  <div class="navbar">
    <router-link to="/">项目简介</router-link>
    <router-link to="/exhibition">项目展示</router-link>
    <router-link to="/team">成员简介</router-link>
  </div>

  <router-view />

  <div class="footer">
    <h2>“点彩成乐” 项目组</h2>
    <p>感谢大家的支持！</p>
  </div>
</template>
