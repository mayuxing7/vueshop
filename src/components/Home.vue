<template>
  <el-container class="home_con">
    <el-header>
      <div>
        <img src="@/assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- :width 动态绑定折叠的宽 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-btn" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activcePath"
        >
          <!-- 一级菜单 -->
          <!-- 动态绑定唯一的id值用    ：index    ：index只接受字符串不接受数值 id值是数值所以给他拼接个空字符串-->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 一级菜单图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 一级菜单文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 2级菜单图标 -->
                <i class="el-icon-menu"></i>
                <!-- 2级菜单文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
 
<script>
export default {
  props: {},
  data() {
    return {
      menulist: [],
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      //   是否折叠
      isCollapse: false,
      //   被激活的链接地址
      activcePath: "",
    };
  },
  //   生命周期函数 创建时就立即获取左侧菜单
  created() {
    this.getMenuList();
    this.activcePath = window.sessionStorage.getItem("activcePath");
    
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200)
        return this.$message.console.error(res.meta.msg);
      this.menulist = res.data;
      // console.log(res);
    },
    // 点击按钮实现折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存二级菜单激活状态
    saveNavState(activcePath) {
      window.sessionStorage.setItem("activcePath", activcePath);
      this.activcePath = activcePath;
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
.home_con {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-btn {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
