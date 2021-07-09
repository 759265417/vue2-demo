<template>
  <div id="connect-us-outer">
    <!-- <el-button @click="showDiaog">connect us</el-button> -->
    <div class="connect-btn" @click="showDiaog" v-show="!visible">Connect us</div>

    <transition enter-active-class="animate__fadeInUp" leave-active-class="animate__fadeOutDown">
      <div class="connect-us-custom-dialog animate__animated" v-show="visible">
        <div class="header">
          <slot name="header"> </slot>
          <div class="close-dialog" v-show="showClose" @click="showDiaog">
            <i class="el-icon-close"></i>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="body">
          <slot name="body"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  props: {
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {},
  methods: {
    showDiaog() {
      this.visible = !this.visible;
    },
  },
};
</script>

<style lang="scss">
#connect-us-outer {
  position: absolute;
  right: 0;
  top: 50%;
  z-index: 1100000;
  .connect-btn {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    box-shadow: 0 2px 12px 0 #ccc;
    padding: 10px;
    cursor: pointer;
  }
  .connect-us-custom-dialog {
    width: 300px;
    height: 500px;
    box-shadow: 0 2px 12px 0 #ccc;
    background-color: #fff;
    position: fixed;
    right: 20px;
    bottom: 20px;
    .header {
      padding: 5px;
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      .close-dialog {
        cursor: pointer;
      }
    }
    .el-divider {
      margin: 10px 0;
    }
    .body {
      padding: 5px;
    }
  }
}
</style>
