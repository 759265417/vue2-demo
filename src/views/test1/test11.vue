<template>
  <div id="app">
    <div
      v-for="(item, index) in cardList"
      :key="index"
      :id="`card_${index + 1}`"
      class="card"
      :class="item.isBtnSelect ? 'active' : 'card'"
    >
      <div>{{ item.name }}</div>
      <div>{{ item.title }}</div>
      <div @click="selectBtn(item)" class="cardBtn" :class="item.isBtnSelect ? 'cardActive' : 'cardBtn'">Select</div>
    </div>
    <el-form>
      <label for="password">Password</label>
      <el-input id="password" type="password" v-model="passwordValue" />
      <password-meter :password="passwordValue" />
    </el-form>

    <!-- <div style="position: absolute; top: 40%; left:40%">
      <el-row style="width: 300px;">
        <el-col :span="24">
          <el-input
            v-model="password"
            @focus.capture.native="changePasswordTip(true)"
            @blur.capture.native="changePasswordTip(false)"
            auto-complete="new-password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
          <div style="position: absolute">
            <verify-pass-word-tip :password="password" :isShowTip="isShowTip"></verify-pass-word-tip>
          </div>
        </el-col>
      </el-row>
    </div>-->
    <el-upload
      action="https://www.upload.baidu.com"
      list-type="picture-card"
      :class="{ disabled: uploadDisabled }"
      :limit="1"
      :on-success="handleAvatarSuccess"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :show-file-list="true"
      :auto-upload="false"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import passwordMeter from "vue-simple-password-meter";
export default {
  components: { passwordMeter },
  data() {
    return {
      uploadDisabled: false,
      password: "",
      isShowTip: false,
      passwordValue: null,
      score: null,
      cardList: [
        { name: "1", title: "111", isBtnSelect: false },
        { name: "2", title: "222", isBtnSelect: false },
        { name: "3", title: "333", isBtnSelect: false },
      ],
    };
  },
  methods: {
    handleChange(file, fileList) {
      if (fileList.length >= 1) {
        this.uploadDisabled = true;
      }
    },
    handleAvatarSuccess(response) {
      window.console.log(response);
    },
    handleRemove(file) {
      //imgDelete.post({pic_name : file.response.pic_name}).then();
      this.uploadDisabled = false;
    },
    /**
     * 改变密码提示是否显示
     **/
    changePasswordTip(isShow) {
      if (isShow) {
        this.isShowTip = true;
      } else {
        this.isShowTip = false;
      }
    },
    selectBtn(item) {
      console.log(item);
      item.isBtnSelect = !item.isBtnSelect;
    },
  },
};
</script>
<style lang="scss">
.disabled .el-upload--picture-card {
  display: none !important;
}
.card {
  width: 300px;
  margin: 5px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.card.active {
  width: 300px;
  margin: 5px;
  display: inline-block;
  border: 1px solid #65ccd6;
  border-radius: 5px;
}
.cardBtn {
  margin: 0;
  border: 0;
  border-top: 1px solid #ccc;
  background: #ccc;
  cursor: pointer;
}
.cardBtn.cardActive {
  margin: 0;
  border: 0;
  border-top: 1px solid #65ccd6;
  background: #65ccd6;
  cursor: pointer;
}
</style>
