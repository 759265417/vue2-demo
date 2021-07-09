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
    <p>{{ $t("message.hello") }}</p>
    <div class="tablebar">
      <el-table
        ref="authgroupTable"
        v-loading="loading"
        size="small"
        :height="contentHeight"
        :data="tableDataComputed"
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
        <el-table-column :label="this.$t('tableHead.authname')" prop="auth_group_name" sortable />
        <el-table-column :label="this.$t('tableHead.name')" prop="username" sortable />
        <el-table-column label="密码" prop="password" sortable />
        <el-table-column label="password" prop="enable_password" sortable />
        <el-table-column label="管理协议" prop="protocol" sortable />
        <el-table-column label="端口号" prop="port" sortable />
        <el-table-column prop="description" label="描述" show-overflow-tooltip sortable />
        <el-table-column label="#" min-width="120px" width="240px">
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="editRow(scope.row)">编辑</el-button>
            <el-button type="text" @click.native.prevent="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="formEditType === 'edit' ? '编辑' : '添加'"
      :visible.sync="dialogFormVisible"
      :before-close="handleFormModalCancel"
      custom-class="modalClass"
    >
      <div class="formClass">
        <el-form ref="authgroupForm" :model="authgroupForm" :rules="rules" inline>
          <el-form-item prop="auth_group_name" label="授权组名称" :label-width="formLabelWidth">
            <el-input v-model="authgroupForm.auth_group_name" :disabled="disabled" />
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth" prop="password">
            <el-input v-model="authgroupForm.username" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="authgroupForm.password" />
          </el-form-item>
          <el-form-item label="password" :label-width="formLabelWidth" prop="enable_password">
            <el-input v-model="authgroupForm.enable_password" />
          </el-form-item>

          <el-form-item label="管理协议" :label-width="formLabelWidth" prop="protocol">
            <el-select v-model="authgroupForm.protocol" placeholder @change="selectVal">
              <el-option label="SSH" value="ssh" />
            </el-select>
          </el-form-item>
          <span class="portDiv">
            <el-form-item prop="port" label="管理端口" :label-width="formLabelWidth">
              <el-input v-model.number="authgroupForm.port" @keyup.enter.native="handleInput" />
            </el-form-item>
          </span>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
            <el-input v-model="authgroupForm.description" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleFormModalCancel">取 消</el-button>
        <el-button type="primary" @click="handleFormModalOK('authgroupForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "collection-authgroup",
  data() {
    return {
      formEditType: "add",
      rules: {
        auth_group_name: [{ required: true, message: "请输入管理名称", trigger: "blur" }],
      },
      disabled: false,
      authgroupData: [
        {
          createUser: null,
          createDate: "2012-04-28 05:29:24",
          updateUser: null,
          updateDate: "2012-04-28 05:52:23",
          id: 261,
          protocol: "ssh",
          auth_group_name: "xxx",
          username: "admin",
          password: "admin",
          port: 22,
          enable_password: "admin",
          description: "admin",
        },
        {
          createUser: null,
          createDate: "2012-04-28 05:29:24",
          updateUser: null,
          updateDate: "2012-04-28 05:52:23",
          id: 262,
          protocol: "ssh",
          auth_group_name: "xxx123",
          username: "user",
          password: "user",
          port: 22,
          enable_password: "user",
          description: "user",
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
      authgroupForm: {
        auth_group_name: "",
        enable_password: "",
        protocol: "",
        port: "",
        username: "",
        password: "",
        description: "",
      },
    };
  },
  computed: {
    tableDataComputed() {
      return this.authgroupData.filter(item => {
        return (
          (item.auth_group_name && item.auth_group_name.indexOf(this.filterInput) != -1) ||
          (item.enable_password && item.enable_password.indexOf(this.filterInput) != -1) ||
          (item.password && item.password.indexOf(this.filterInput) != -1) ||
          (item.protocol && item.protocol.indexOf(this.filterInput) != -1) ||
          item.port.toString().indexOf(this.filterInput) != -1
        );
      });
    },
  },
  mounted() {},
  methods: {
    addClick() {
      this.disabled = false;
      this.dialogFormVisible = true;
      this.formEditType = "add";
      Object.assign(this.authgroupForm, {
        auth_group_name: "",
        enable_password: "",
        protocol: "",
        port: "",
        username: "",
        password: "",
        description: "",
      });
    },
    editRow(item) {
      this.dialogFormVisible = true;
      this.disabled = true;
      this.formEditType = "edit";
      Object.assign(this.authgroupForm, item);
    },
    selectVal(val) {
      if (val === "ssh") {
        this.authgroupForm.port = "22";
      } else if (val === "telent") {
        this.authgroupForm.port = "23";
      }
    },
    handleInput() {
      this.num = this.num.replace(/[^\w]/g, "");
    },
    _getFormValues() {
      return {
        auth_group_name: this.authgroupForm.auth_group_name,
        enable_password: this.authgroupForm.enable_password,
        protocol: this.authgroupForm.protocol,
        port: this.authgroupForm.port,
        username: this.authgroupForm.username,
        password: this.authgroupForm.password,
        description: this.authgroupForm.description,
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
    handleFormModalOK(authgroupForm) {
      this.$refs[authgroupForm].validate(valid => {
        if (valid) {
          if (this.formEditType === "edit") {
            this._handleEdit();
          } else if (this.formEditType === "add") {
            this._handleAdd();
          }
          this.dialogFormVisible = false;
        } else {
          this.dialogFormVisible = true;
        }
      });
    },
    handleFormModalCancel() {
      this.dialogFormVisible = false;
      this.$refs.authgroupForm.resetFields();
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
      const id = this.authgroupForm.id;
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
