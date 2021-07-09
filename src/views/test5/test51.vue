<template>
  <div id="authgroup" class="view-content">
    <div class="top">
      <!-- <form action="/example/html5/demo_form.asp"> -->

      <input list="url_list" name="link" />
      <datalist id="url_list">
        <option v-for="item in arr" :label="item" :value="item" :key="item"></option>
        <!-- 
        <option label="W3School" value="W3School" />
        <option label="Google" value="Google" />
        <option label="Microsoft" value="Microsoft" />-->
      </datalist>
      <!-- </form> -->
    </div>
    <!-- <div class="toolbar">
      <el-form ref="toolForm" :model="toolForm" label-width="100px" inline>
        <el-form-item>
          <el-input
            v-model="filterInput"
            placeholder="过滤"
            clearable
            size="mini"
            v-focus
            @keyup.esc.native="escClearInput"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="text" title="添加授权组" @click="addClick">
            <i class="el-icon-plus" />添加
          </el-button>
          <el-button type="text" title="批量删除授权组" @click="batRemoveClick">
            <i class="el-icon-close" />批量删除
          </el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <xxx-table
      :list="authgroupData"
      :options="options"
      :columns="columns"
      :operates="operates"
      :filter-input="filterInput"
      @handleSelectionChangeFunc="handleSelectionChange"
    />
    <xxxFormDialog
      :rules="rules"
      :dialog-form-visible="dialogFormVisible"
      :form-edit-type="formEditType"
      :search-data="authgroupForm"
      :search-form="searchForm"
      @validateTrue="validateTrue"
      @validateFalse="validateFalse"
      @closeDialogFunc="closeDialog"
    />
  </div>
</template>

<script>
import xxxTable from "../../components/Table";
import xxxFormDialog from "../../components/FormDialog";
export default {
  name: "collection-authgroup",
  components: { xxxTable, xxxFormDialog },
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    const protocal = [{ label: "SSH", value: "ssh" }];
    return {
      arr: [],
      formEditType: "add",
      storage: "",
      rules: {
        auth_group_name: [{ required: true, message: "请输入授权组名称", trigger: "blur" }],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        enable_password: [{ required: true, message: "请输入管理名称", trigger: "blur" }],
        protocol: [{ required: true, message: "请选择管理协议", trigger: "blur" }],
        port: [{ required: true, message: "请输入管理端口", trigger: "blur" }],
      },
      searchForm: [
        {
          type: "Input",
          label: "授权组名称",
          prop: "auth_group_name",
          width: "120px",
          disabled: true,
          isFormItemShow: true,
          position: "left",
        },
        {
          type: "Input",
          label: "姓名",
          prop: "username",
          width: "120px",
          isFormItemShow: true,
          position: "left",
        },
        {
          type: "Input",
          label: "密码",
          prop: "password",
          width: "120px",
          isFormItemShow: true,
          position: "right",
        },
        {
          type: "Input",
          label: "password",
          prop: "enable_password",
          width: "120px",
          isFormItemShow: true,
          position: "right",
        },
        {
          type: "Select",
          label: "管理协议",
          prop: "protocol",
          width: "120px",
          props: protocal,
          change: row => {
            this.selectVal(row);
          },
          isFormItemShow: true,
          position: "right",
        },
        {
          type: "Input",
          label: "管理端口",
          prop: "port",
          width: "120px",
          isFormItemShow: true,
          position: "right",
        },
        {
          type: "TextArea",
          label: "描述",
          prop: "description",
          width: "120px",
          isFormItemShow: true,
          position: "right",
        },
      ],
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
      filterInput: "",
      contentHeight: 200,
      toolForm: {},
      tableSelection: [],
      tableColumns: [],
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
      options: {
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: false, // 是否支持当前行高亮显示
        hasSelect: true, // 是否支持列表项选中功能
        hasIndex: true, // 是否有序号列
        hasHandle: true,
      },
      columns: [
        {
          prop: "auth_group_name",
          label: `${this.$t("tableHead.authname")}`,
          align: "left",
        },
        {
          prop: "username",
          label: `${this.$t("tableHead.name")}`,
          align: "left",
        },
        {
          prop: "password",
          label: "密码",
          align: "left",
        },
        {
          prop: "enable_password",
          label: "password",
          align: "left",
        },
        {
          prop: "protocol",
          label: "管理协议",
          align: "left",
        },
        {
          prop: "port",
          label: "端口号",
          align: "left",
        },
        {
          prop: "description",
          label: "描述",
          align: "center",
        },
      ],
      operates: {
        width: "150px",
        list: [
          {
            id: "1",
            label: "编辑",
            type: "text",
            show: true,
            icon: "el-icon-edit",
            method: (index, row) => {
              this.editRow(row);
            },
          },
          {
            id: "2",
            label: "删除",
            type: "text",
            icon: "el-icon-delete",
            show: true,
            method: (index, row) => {
              this.deleteRow(row);
            },
          },
        ],
      },
    };
  },
  mounted() {
    for (var i = 0; i < 10; i++) {
      this.arr.push(i + "");
    }
  },
  computed: {},
  methods: {
    escClearInput() {
      this.filterInput = "";
    },
    validateTrue() {
      if (this.formEditType === "edit") {
        this._handleEdit();
      } else if (this.formEditType === "add") {
        this._handleAdd();
      }
      this.dialogFormVisible = false;
    },
    validateFalse() {
      this.dialogFormVisible = true;
    },
    closeDialog(newDialogFormVisible) {
      this.dialogFormVisible = newDialogFormVisible;
    },
    addClick() {
      this.dialogFormVisible = true;
      this.formEditType = "add";
      this.searchForm.forEach(item => {
        if (item.prop === "auth_group_name") {
          item.disabled = false;
        }
      });
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
      this.formEditType = "edit";
      this.searchForm.forEach(item => {
        if (item.prop === "auth_group_name") {
          item.disabled = true;
        }
      });
      Object.assign(this.authgroupForm, item);
    },

    selectVal(val) {
      if (val === "ssh") {
        this.authgroupForm.port = "22";
      } else {
        this.authgroupForm.port = "23";
      }
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
