<template>
  <div class="navbar">
    <div class="project-logo" />
    <span class="project-name">XXXXXX管理系统</span>
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <el-dropdown @command="handleCommand">
      <el-button type="primary">
        选择语言
        <i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="cn">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <change-theme class="theme-container" />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img src="../../../assets/img/logo.png" class="user-avatar" />
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>Home</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display: block" @click="logout">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChangeTheme from "@/components/theme";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Hamburger,
    ChangeTheme,
  },

  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("user/handleLogOut").then(() => {
        this.$router.push({
          name: "login",
        });
      });
    },

    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    handleCommand(command) {
      console.log(command);
      switch (command) {
        case "cn":
          this.cnChoose();
          break;
        case "en":
          this.enChoose();
          break;
      }
    },
    cnChoose() {
      this.$i18n.locale = "cn";
      localStorage.setItem("lang", this.$i18n.locale);
    },
    enChoose() {
      this.$i18n.locale = "en";
      localStorage.setItem("lang", this.$i18n.locale);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.project-name {
  font-size: 20px;
  float: left;
}
.project-logo {
  width: 40px;
  height: 30px;
  float: left;
  display: inline-block;
  background-image: url("../../../assets/img/logo.png");
  background-size: 100%;
  margin: 9px 5px 0 5px;
}
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  position: fixed;
  width: 100%;
  z-index: 100;
  color: #fff;
  background-color: #304156;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
