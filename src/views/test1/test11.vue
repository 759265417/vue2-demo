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
    <el-select v-model="value1" multiple placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
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

    <ul class="getData">
      <li
        v-for="(item, index) in emailMaterial"
        :key="index"
        clss="dataItem"
        @mouseenter="onMousteIn(index)"
        @mouseleave="onMousteOut()"
      >
        <!-- 鼠标移入移出 -->
        <div class="hoverMask" v-show="seen && index == current">
          <div class="material-header">
            <i class="icon icon-more" @click="delBox()"></i>
            <i class="icon icon-search" @click="previewOff()"></i>
            <i class="icon icon-edit"></i>
          </div>
          <h4>
            素材名称
            <span>{{ item.a }}</span>
          </h4>
          <span class="email-name">{{ item.b }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import passwordMeter from "vue-simple-password-meter";
export default {
  components: { passwordMeter },
  data() {
    return {
      current: 0, //复制成功提示显示或者隐藏
      seen: false, //显示和隐藏
      emailMaterial: [
        { a: "1123", b: "123" },
        { a: "222", b: "333" },
      ],
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
      options: [
        {
          value: "选项1",
          label:
            "Select from existing concepts to scrape historical data as well as creating you own concept searches to build up a picture of the accurate data you require.",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: [],
      value2: [],
    };
  },
  methods: {
    onMousteIn: function (index) {
      this.seen = true; //鼠标移入显示
      this.current = index;
    },
    onMousteOut: function (index) {
      this.seen = false; //鼠标移出隐藏
      this.current = null;
    },
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
