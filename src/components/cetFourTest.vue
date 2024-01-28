<template>
  <div class="container">
    <div class="image-container">
      <img id="occupied" src="../assets/cat.gif" />
    </div>
    <div style="margin-left: 100px;">
      敬 请 期 待 ！
    </div>
    <div>
      <img src="../assets/heart.png" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}

* {
  font-family: "fangzheng";
  text-align: center;
  transition: all .3s;
  font-size: 35px;
}

.image-container {
  margin-right: 10px;
  /* 调整图片和文本之间的间距 */
}
</style>