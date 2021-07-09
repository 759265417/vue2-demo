<template>
  <div class="ces-search">
    <el-dialog
      :title="newFormEditType === 'edit' ? '编辑' : formEditType === 'add' ? '添加' : '设置'"
      :visible.sync="dialogFormVisible"
      :before-close="handleFormModalCancel"
      :width="formEditType === 'set' ? '400px' : '760px'"
      custom-class="modalClass roleClass"
    >
      <el-form
        ref="searchData"
        :size="size"
        inline
        :label-width="labelWidth"
        :model="searchData"
        :rules="rules"
        class="formClass"
      >
        <template v-for="item in searchForm">
          <el-form-item
            v-if="item.isFormItemShow"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
            :label-width="item.width"
          >
            <!-- input -->
            <el-input
              v-if="item.type === 'Input'"
              v-model="searchData[item.prop]"
              size="small"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
            />
            <!-- select -->
            <el-select
              v-if="item.type === 'Select'"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder"
              size="small"
              @change="item.change(searchData[item.prop])"
            >
              <el-option v-for="op in item.props" :key="op.value" :label="op.label" :value="op.value" />
            </el-select>
            <!-- textarea-->
            <el-input
              v-if="item.type === 'TextArea'"
              v-model="searchData[item.prop]"
              type="textarea"
              size="small"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
            />
            <!--tree-->
            <el-tree
              v-if="item.type === 'Tree'"
              ref="tree"
              :data="item.props"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="defaultProps"
              :default-checked-keys="checkedDedault"
              @check-change="getCheckedKeys"
            />
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleFormModalCancel('searchData')">取 消</el-button>
        <el-button type="primary" @click="handleFormModalOk('searchData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    rules: {
      type: Object,
      default: () => {},
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    size: {
      type: String,
      default: "small",
    },
    searchForm: {
      type: Array,
      default: () => [],
    },
    searchData: {
      type: Object,
      default: () => {},
    },
    formEditType: {
      type: String,
      default: "add",
    },
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    checkedDedault: {
      type: Array,
    },
  },
  data() {
    return {
      newDialogFormVisible: false,
      newFormEditType: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    formEditType: {
      handler(newVal, oldVal) {
        this.newFormEditType = newVal;
      },
    },

    dialogFormVisible: {
      handler(newVal, oldVal) {
        this.newDialogFormVisible = newVal;
      },
    },
  },

  methods: {
    handleFormModalOk(searchData) {
      this.$refs.searchData.validate(valid => {
        if (valid) {
          this.$emit("validateTrue", searchData);
          this.$refs.searchData.resetFields();
        } else {
          this.$emit("validateFalse", searchData);
        }
      });
    },
    handleFormModalCancel(searchData) {
      this.newDialogFormVisible = false;
      this.$refs.searchData.resetFields();
      this.$emit("closeDialogFunc", this.newDialogFormVisible);
    },
    getCheckedKeys(data, checked, indeterminate) {
      var roleTemp = [];
      var roleArr = this.$refs.tree[0].getHalfCheckedKeys().concat(this.$refs.tree[0].getCheckedKeys());

      for (var i = 0; i < roleArr.length; i++) {
        roleTemp.push({ id: roleArr[i] });
      }
      this.$emit("getCheckedKeys", roleTemp);
    },
  },
};
</script>
<style lang="scss">
// .el-input__inner {
//   width: 200px;
// }
</style>
