
<template>
  <div class="container">
    <div class="left">
      <div class="ad">
        <h1>Welcome To K-WHAT World</h1>
        <p>Learn with who you love. Love who you learn with.</p>
        <p>ความรักเป็นการเอกลักษณ์ที่เกินกว่า AI</p>
        <p>사랑은 AI를 초월하는 존재입니다.</p>
        <p>愛はAIを超越する存在です。</p>
        <p>爱是超越AI的存在。</p>
      </div>

    </div>
    <div class="right">
      <div class="login">
        <h1 style="margin-bottom: 8px;">Get started.</h1>
        <el-form :model="loginForm" class="login-container" ref="loginData" :rules="rules" lable-position="left"
          label-width="0px">
          <el-form-item prop="email">
            <el-input type="text" v-model="loginForm.email" autocomplete="off" placeholder="账号(邮箱)"
              :trim="true"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
          </el-form-item>
          <div class="submitbutton">

            <el-form-item>
              <el-button color="#626aef" :dark="isDark" id="loginbutton" type="primary" @click="login()"
                :disabled="ableToClick" style="text-align: center;">登录</el-button>
            </el-form-item>
            <el-button id="checkbutton" type="primary" plain @click="onShow">请先验证</el-button>
          </div>
          <Vcode :show="isShow" @success="success" @close="close" />
        </el-form>
        <div>没有账号？<a href="#" @click="showRegisterPopup">点我注册</a></div>
      </div>

    </div>
    <div class="register">
      <el-dialog v-model="dialogTableVisible" title="欢迎注册" style="text-align: center; width: 320px;">
        <el-form :model="registerForm" class="login-container" ref="registerData" :rules="rules" lable-position="left"
          label-width="0px">
          <el-form-item prop="userName">
            <el-input type="text" v-model="registerForm.userName" autocomplete="off" placeholder="用户名"
              style="width: 300px;" :trim="true"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input type="text" v-model="registerForm.email" autocomplete="off" placeholder="账号(邮箱)"
              style="width: 300px;" :trim="true"></el-input>
          </el-form-item>
          <div class="submitbutton">
            <el-form-item prop="code">
              <el-input type="text" v-model="registerForm.code" autocomplete="off" placeholder="验证码" style="width: 170px;"
                :trim="true"></el-input>
            </el-form-item>
            <el-button v-bind:class="{ grey: isGrey, blue: !isGrey }" v-bind:disabled="dis" type="primary"
              style="margin-left: 5px; width: 100px;" @click="getCode">
              <div v-if="show">发送验证码</div>
              <div v-else>重新发送({{ count }}s)</div>
            </el-button>

          </div>

          <el-form-item prop="password">
            <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button color="#626aef" :dark="isDark" type="primary" @click="register"
              style="text-align: center; margin: auto 50px; width: 200px;">注册</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { user } from '../../../api/index';
import Vcode from "vue3-puzzle-vcode";
export default {
  components: {
    Vcode
  },
  data() {
    return {
      dis: false,
      show: true,
      isGrey: false, //按钮样式
      timer: null, //设置计时器,
      count: "",
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        userName: '',
        email: '',
        password: '',
        code: ''
      },
      dialogTableVisible: false,
      isShow: false,
      ableToClick: true,
      rules: {
        email: [
          { type: 'email', required: true, pattern: '[^ \x22]+', message: '请输入正确邮箱地址', trigger: 'blur' },
        ],
        userName: [
          { type: 'string', required: true, pattern: '[^ \x22]+', message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 12, message: '用户名长度过长', trigger: 'blur' }
        ],
        password: [
          { type: 'string', required: true, pattern: '[^ \x22]+', message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在6-12位之间', trigger: 'blur' }
        ],
        code: [
          { type: 'string', required: true, pattern: '[^ \x22]+', message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    getCode() {
      var reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (reg.test(this.registerForm.email)) {
        user.verifyCode(this.registerForm)
          .then(
            res => {
              if (res.code == 200) {
                this.$message.success('邮件已发送，请查收')
              } else {
                this.$message.error('服务器繁忙，请稍等')
              }
            }
          )
        let TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.isGrey = true;
          this.show = false;
          this.dis = true;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.dis = false;
              this.isGrey = false;
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }

      } else {
        this.$message.error('邮件地址有误，请您再检查一下')
      }
    },
    register() {
      this.$refs.registerData.validate((valid) => {
        if (valid) {
          user.register(this.registerForm)
            .then(
              res => {
                if (res.code == 200) {
                  this.dialogTableVisible = false
                  this.$message.success('您已注册成功，让我们开始冒险吧！(*^▽^*)')
                } else {
                  this.$message.error('服务器繁忙，请稍等')
                }
              })
        } else {
          this.$message.error('注册信息不符合要求，请您再检查一下')
          return false;
        }
      })
    },
    login() {
      //组件的vue实例
      this.$refs.loginData.validate((valid) => {

        if (valid) {
          user.login(this.loginForm)
            .then(
              res => {
                if (res.code == 200) {
                  localStorage.setItem("token", res.data.token)
                  this.$router.push({ name: 'kieltsView' })
                } else {
                  this.$message.error('账号或密码错误，请您再检查一下')
                }
              })
        } else {
          this.$message.error('账户(邮箱)或密码缺失，请您再检查一下')
          return false;
        }
      })

    },
    onShow() {
      this.isShow = true;

    },
    // 用户通过了验证
    success(msg) {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.ableToClick = false
    },
    // 用户点击遮罩层，应该关闭模态框
    close() {
      this.isShow = false;
    },
    showRegisterPopup() {
      this.dialogTableVisible = true

    }
  }
}
</script>


<style>
.grey {
  background-color: #EDEEF1;
  border-color: #EDEEF1;
  color: white;
  width: 30%;
}

.blue {
  background-color: rgb(64, 158, 255);
  border-color: rgb(64, 158, 255);
}

* {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.register {
  font-family: Arial, sans-serif;
  text-align: center;
}

.container {
  display: flex;
  height: 100vh;
}


.left {
  background: linear-gradient(90deg, rgba(249, 169, 203, 1) 0%, rgba(195, 190, 254, 1) 31%, rgba(167, 218, 245, 1) 82%);
  flex: 6;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

}

#loginbutton {
  width: 200px;
  border: none;
  margin-right: 20px;
}

.right {
  background-color: #ffffff;
  flex: 4;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submitbutton {
  text-align: center;
  display: flex;
}

.ad {
  text-align: center;
}

.ad p {
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
}

#checkbutton {
  margin-bottom: 10px;
  margin-right: 0px;
  font-size: 12px;
}

.login {
  width: 300px;
  max-width: 100%;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;

}

.ad h1 {
  font-size: 50px;
}

.ad p {
  font-size: 20px;
}

.login h2 {
  text-align: center;
  margin-bottom: 10px;
}
</style>






