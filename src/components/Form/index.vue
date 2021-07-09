<template>
  <div class="ces-search">
    <el-form ref="searchData" :size="size" inline :label-width="labelWidth" :model="searchData">
      <el-form-item v-for="item in searchForm" :key="item.prop" :label="item.label">
        <!-- 输入框 -->
        <el-input v-if="item.type === 'Input'" v-model="searchData[item.prop]" size="mini" />
        <!-- 下拉框 -->
        <el-select
          v-if="item.type === 'Select'"
          v-model="searchData[item.prop]"
          size="mini"
          @change="item.change(searchData[item.prop])"
        >
          <el-option v-for="op in item.props" :key="op.value" :label="op.label" :value="op.value" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item v-for="item in searchHandle" :key="item.label"> -->
      <el-form-item>
        <el-button @click="handle('searchData')">提交</el-button>
      </el-form-item>
      <!-- </el-form-item> -->
    </el-form>
    <!-- <el-form inline v-if="isHandle">
      <el-form-item v-for="item in searchHandle" :key="item.label">
        <el-button :type="item.type" :size="item.size || size" @click="item.handle()">{{item.label}}</el-button>
      </el-form-item>
    </el-form>-->
  </div>
</template>

<script>
export default {
  props: {
    isHandle: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    size: {
      type: String,
      default: "mini",
    },
    searchForm: {
      type: Array,
      default: [],
    },
    searchHandle: {
      type: Array,
      default: () => [],
    },
    searchData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  methods: {
    handle(searchData) {
      this.$refs.searchData.validate(valid => {
        if (valid) {
          console.error("true");
        } else {
          console.error("false");
        }
      });
      this.$emit("handle", searchData);
    },
  },
};
</script>
<style></style>
