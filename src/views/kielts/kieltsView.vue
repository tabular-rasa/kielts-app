<template>
  <div class="common-layout">

    <el-container>
      <el-header style="--el-header-padding:0px" class="title sticky" ref="headerRef">
        <div class="banner" ref="bannerRef" :style="{ height: scrollDirection == 1 ? '0px' : '50px' }">
          <div>回 归 广 告 位 招 租 </div>
        </div>
        <el-menu id="bg" ref="menuRef" router class="el-menu-demo" mode="horizontal" default-active="/">
          <div id="bullet">welcome to k-what world</div>
          <el-menu-item index="/ielts" class="menu" style="margin-left: 100px;">I e l t s</el-menu-item>
          <el-menu-item index="/cet4" class="menu">C E T 4</el-menu-item>
          <el-menu-item index="/cet6" class="menu">C E T 6</el-menu-item>
        </el-menu>
        <div>
        </div>
      </el-header>
      <!-- 这里放入要显示的内容 -->
      <el-main class="app-main" :style="{ paddingTop: topHeight + 'px' }">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      scrollDirection: -1,
      topHeight: 60
    }
  },
  mounted() {
    this.topHeight = this.$refs.bannerRef?.clientHeight + 60
    window.addEventListener('wheel', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.handleScroll)
  },
  methods: {
    handleScroll(event) {
      this.scrollDirection = event.deltaY > 0 ? 1 : -1
      this.$nextTick(() => {
        this.topHeight = this.$refs.bannerRef?.clientHeight + 60
      })
    }
  }
}
</script>
<style>
.sticky {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.banner {
  font-family: "fangzheng";
  text-align: center;
  transition: all .3s;
  font-size: 30px;
  background-color: rgba(167, 218, 245, 1);
}

body {
  margin: 0px;
}

.app-main {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}



#bullet {
  font-family: "ka1";
  text-align: center;
  font-size: 20px;
  margin-top: 15px;
  margin-left: 10px;
}

.menu {
  font-family: "ka1";
  text-align: center;
  font-size: 25px;
  margin-top: 15px;
  margin-left: 10px;
}

#bg {
  background: linear-gradient(90deg, rgba(249, 169, 203, 1) 0%, rgba(195, 190, 254, 1) 31%, rgba(167, 218, 245, 1) 82%);
}
</style>
