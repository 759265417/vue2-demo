<template>
  <div class="test50-outer">
    ARDEUT110608

    <el-row :gutter="10">
      <div v-for="(item, index) in list" :key="index">
        <el-col :span="12" v-if="index === 0">
          <div class="grid-content bg-purple bg">{{ item.name }}</div></el-col
        >
        <el-col :span="6" v-else>
          <div class="grid-content bg-purple bg">{{ item.name }}</div></el-col
        >
      </div>
    </el-row>
    <el-select
      v-model="value1"
      multiple
      placeholder="请选择"
      @blur="onBlur('request_msg', 'reqMsgRef')"
      ref="reqMsgRef"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>

    <el-select v-model="value" placeholder="请11111选择" @blur="qwer">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "test-50",
  data() {
    return {
      list: [
        { id: 1, name: "123", num: 1 },
        { id: 2, name: "333", num: 200 },
        { id: 4, name: "222", num: 40 },
        { id: 7, name: "4444", num: 20 },
        { id: 21, name: "555", num: 210 },
      ],
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
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
  mounted() {
    this.list.sort((a, b) => b.num - a.num);
    console.log(this.list);
  },
  computed: {},
  methods: {
    onBlur(flag, ref) {
      console.error(this.$refs[ref]);
      this.$refs[ref].$refs.blur = () => {
        console.error("1111111111");
      };
    },
    qwer() {
      console.error("222");
    },
  },
};
</script>
<style scoped>
.bg {
  background: #ccc;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
