<template>
  <div class="login_">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="@/assets/logo.jpg" alt="" />
      </div>
      <!-- 登陆表单 -->
      <el-form
        :rules="rules"
        :model="loginform"
        label-width="0px"
        class="login_form"
        ref="formref"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginform.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginform.password"
            prefix-icon="el-icon-s-goods"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- button -->
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetform">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 登录表单数据绑定对象
      loginform: {
        username: "admin",
        password: "123456",
      },
      //   表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetform(formName) {
      this.$refs.formref.resetFields();
    },
    login() {
      this.$refs.formref.validate(async (val) => {
        if (!val) return;
        const { data: res } = await this.$http.post("login", this.loginform);
        console.log(res);
        if (res.meta.status !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");

        // 1.将登陆之后的token保存到sessstorage
        window.sessionStorage.setItem("token", res.data.token);
        //  2.通过编程式导航跳转到后台主页 地址/home
        this.$router.push("/home");
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
.login_ {
  background-color: #487bad;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 110px;
    width: 110px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 5px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100px;
      height: 90%;
      border-radius: 50%;
      transform: translate(5%, 6%);
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>
