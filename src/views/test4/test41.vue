<template>
  <div class="view-content">
    <div class="toolbar">
      <el-form ref="filterForm" :model="filterForm" label-width="100px" inline>
        <el-form-item>
          <el-input v-model="filterInput" placeholder="过滤" clearable size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="text" title="添加授权组" @click="addClick"> <i class="el-icon-plus" />添加 </el-button>
          <el-button type="text" title="批量删除授权组" @click="batRemoveClick">
            <i class="el-icon-close" />批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tablebar">
      <el-table
        ref="authgroupTable"
        v-loading="loading"
        size="small"
        :height="contentHeight"
        :data="authgroupData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{
          'background-color': '#f5f5f5',
        }"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" sortable />
        <el-table-column type="index" />
        <el-table-column label="授权组名称" prop="auth_group_name" sortable>
          <template slot-scope="scope">
            <el-input v-if="scope.row.isInput" v-model="scope.row.auth_group_name" />
            <span v-if="!scope.row.isInput">{{ scope.row.auth_group_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="管理协议" prop="protocol" sortable>
          <template slot-scope="scope">
            <el-select v-if="scope.row.isInput" v-model="scope.row.protocol" placeholder @change="selectVal">
              <el-option label="SSH" value="ssh" />
            </el-select>
            <span v-if="!scope.row.isInput">{{ scope.row.protocol }}</span>
          </template>
        </el-table-column>
        <el-table-column label="端口号" prop="port" sortable>
          <template slot-scope="scope">
            <el-input v-if="scope.row.isInput" v-model="scope.row.port" />
            <span v-if="!scope.row.isInput">{{ scope.row.port }}</span>
          </template>
        </el-table-column>
        <el-table-column label="#" min-width="120px" width="240px">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isInput" type="text" @click.native.prevent="editRow(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.isInput" type="text" @click.native.prevent="saveRow(scope.row)">保存</el-button>
            <el-button v-if="!scope.row.isInput" type="text" @click.native.prevent="deleteRow(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "collection-authgroup",
  data() {
    return {
      getVal: {},
      formEditType: "add",
      rules: {
        auth_group_name: [{ required: true, message: "请输入管理名称", trigger: "blur" }],
      },
      disabled: false,
      authgroupData: [
        {
          isInput: false,
          id: 261,
          protocol: "ssh",
          auth_group_name: "test",
          port: 22,
        },
        {
          isInput: false,
          id: 262,
          protocol: "ssh",
          auth_group_name: "test",
          port: 22,
        },
      ],
      loading: false,
      num: 1,
      filterInput: "",
      contentHeight: 500,
      filterForm: {},
      tableSelection: [],
      deviceList: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    addClick() {
      this.authgroupData.unshift({
        isInput: false,
        id: null,
        protocol: "",
        auth_group_name: "",
        port: null,
      });
      this.authgroupData[0].isInput = true;
    },
    editRow(item) {
      // this.dialogFormVisible = true;
      // this.disabled = true;
      // this.formEditType = "edit";
      item.isInput = true;
    },
    selectVal(val) {
      // if (val === "ssh") {
      //   this.authgroupForm.port = "22";
      // } else if (val === "telent") {
      //   this.authgroupForm.port = "23";
      // }
    },
    handleInput() {
      this.num = this.num.replace(/[^\w]/g, "");
    },
    _getFormValues() {
      return {
        auth_group_name: this.getVal.auth_group_name,
        protocol: this.getVal.protocol,
        port: this.getVal.port,
      };
    },
    batRemoveClick() {
      if (this.tableSelection.length === 0) {
        this.$message({
          message: "请选择要删除的授权组",
          type: "warning",
        });
        return;
      }
      this._handleRemove(this.tableSelection);
    },
    saveRow(row) {
      this.getVal = row;
      row.isInput = false;
      console.error(this.getVal);
      this._handleEdit();
      // this.$refs[authgroupForm].validate(valid => {
      //   if (valid) {
      //     if (this.formEditType === "edit") {
      //       this._handleEdit();
      //     } else if (this.formEditType === "add") {
      //       this._handleAdd();
      //     }
      //     this.dialogFormVisible = false;
      //   } else {
      //     this.dialogFormVisible = true;
      //   }
      // });
    },

    _handleRemove(idArray) {
      this.open(idArray);
    },

    handleSelectionChange(selection, row) {
      const idArray = [];
      selection.forEach(item => {
        idArray.push({ id: item.id });
      });
      this.tableSelection = idArray;
    },
    deleteRow(rows) {
      this._handleRemove([{ id: rows.id }]);
    },
    _handleEdit() {
      const id = this.getVal.id;
      console.error(id, "id");
      const editParams = Object.assign({ id }, this._getFormValues());
      this.authgroupData.forEach(item => {
        if (item.id === id) {
          Object.assign(item, editParams);
        }
      });
    },
    _handleAdd() {
      const addParams = this._getFormValues();
      this.authgroupData.push(addParams);
      this.$message({
        type: "success",
        message: "添加成功!",
      });
    },
    open(delParams) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delParams.forEach(delItem => {
            this.authgroupData.forEach((item, index) => {
              if (item.id === delItem.id) {
                this.authgroupData.splice(index, 1);
              }
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style lang="scss">
// .authAlert {
//   .el-form-item {
//     .el-textarea .el-textarea__inner {
//       resize: none;
//     }
//     .el-input__inner,
//     .el-textarea__inner {
//       width: 178px;
//     }
//   }
// }
</style>
