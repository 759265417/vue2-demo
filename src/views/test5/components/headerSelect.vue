<template>
  <div>
    <el-select v-model="selectValue" placeholder="请选择" @change="changeVal" ref="headerSelect">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "s_to_d_loss",
          label: "s_to_d_loss",
        },
        {
          value: "d_to_s_jitterAvg",
          label: "d_to_s_jitterAvg",
        },
        {
          value: "s_to_d_jitterAvg",
          label: "s_to_d_jitterAvg",
        },
        {
          value: "packets",
          label: "packets",
        },
        {
          value: "d_to_s_loss",
          label: "d_to_s_loss",
        },
      ],
      selectValue: "s_to_d_jitterAvg",
    };
  },
  mounted() {
    this.$store.commit("changeSelceValMutation", this.selectValue);
  },
  methods: {
    changeVal(val) {
      this.$store.commit("changeSelceValMutation", val);
    },
  },
};
</script>

<style></style>
