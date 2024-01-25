<template>
  <div class="common-layout">

    <el-container>
      <el-header class="title">
        <el-menu router class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
          active-text-color="#ffd04b" default-active="/">
          <el-menu-item index="/ielts">雅思听力</el-menu-item>
          <el-menu-item index="/cet4">四级听力</el-menu-item>
          <el-menu-item index="/cet6">六级听力</el-menu-item>
        </el-menu>
        <div>
        </div>
      </el-header>
      <!-- 这里放入要显示的内容 -->

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>


<script>
export default {
};
</script>
<style>
.sticky {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>