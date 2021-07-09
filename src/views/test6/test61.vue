<template>
  <div id="authgroup" class="view-content">
    <div>
      <el-checkbox-group v-model="tableShowColumnList" @change="changeColumnShow">
        <el-checkbox label="name" disabled></el-checkbox>
        <el-checkbox label="type"></el-checkbox>
        <el-checkbox label="tag"></el-checkbox>
        <el-checkbox label="switch"></el-checkbox>
        <el-checkbox label="access"></el-checkbox>
        <el-checkbox label="desc"></el-checkbox>
      </el-checkbox-group>
    </div>
    <cisco-table
      ref="table-parent"
      :height="contentStyleObj.height"
      :list="testData"
      :options="options"
      :columns="columns"
      :operates="operates"
      @handleSelectionChangeFunc="handleSelectionChange"
      @sortChangeFunc="sortChange"
    />
    <div v-for="(item, index) in arr1" :key="'key' + index">
      {{ item }}
    </div>
    <div v-for="(item, index1) in arr2" :key="index1">
      {{ item }}
    </div>
    <!-- <div v-for="(item, index) in arr1" :key="index">
      {{ arr1[index].a }}{{ arr2[index].c }}
    </div> -->
  </div>
</template>

<script>
import EyesTable from "../../components/eyes-table";
import getHeightPX from "@/mixins/getHeight";
export default {
  name: "collection-authgroup",
  components: { "cisco-table": EyesTable },
  mixins: [getHeightPX],
  data() {
    return {
      arr1: [1, 1, 1, 1],
      arr2: [2, 2, 2, 2],
      contentStyleObj: {
        height: "",
      },
      tableShowColumnList: ["name", "type", "tag", "switch", "access", "desc"],
      testData: [
        {
          name: "haha1",
          type: "0", // 不同type tag颜色不同
          tag: ["year", "date", "hour", "second", "minute"],
          switch: false, // 关 文字off
          access: "0", // 显示文字fail + 失败icon
          desc: "desc",
        },
        {
          name: "haha2",
          type: "1", // 不同type tag颜色不同
          tag: ["year", "date", "hour", "second", "minute"],
          switch: true, // 开 文字on
          access: "1", // 显示文字success + 成功icon
          desc: "", // 显示 '-'
        },
        {
          name: "haha2",
          type: "1", // 不同type tag颜色不同
          tag: ["year", "date", "hour", "second", "minute"],
          switch: true, // 开 文字on
          access: "1", // 显示文字success + 成功icon
          desc: "", // 显示 '-'
        },
        {
          name: "haha2",
          type: "1", // 不同type tag颜色不同
          tag: ["year", "date", "hour", "second", "minute"],
          switch: true, // 开 文字on
          access: "1", // 显示文字success + 成功icon
          desc: "", // 显示 '-'
        },
        {
          name: "haha2",
          type: "1", // 不同type tag颜色不同
          tag: ["year", "date", "hour", "second", "minute"],
          switch: true, // 开 文字on
          access: "1", // 显示文字success + 成功icon
          desc: "", // 显示 '-'
        },
        {
          name: "haha2",
          type: "1", // 不同type tag颜色不同
          tag: ["year", "date", "hour", "second", "minute"],
          switch: true, // 开 文字on
          access: "1", // 显示文字success + 成功icon
          desc: "", // 显示 '-'
        },
        {
          name: "haha2",
          type: "1", // 不同type tag颜色不同
          tag: ["year", "date", "hour", "second", "minute"],
          switch: true, // 开 文字on
          access: "1", // 显示文字success + 成功icon
          desc: "", // 显示 '-'
        },
        {
          name: "haha2",
          type: "1", // 不同type tag颜色不同
          tag: ["year", "date", "hour", "second", "minute"],
          switch: true, // 开 文字on
          access: "1", // 显示文字success + 成功icon
          desc: "", // 显示 '-'
        },
      ],
      options: {
        key: "1",
        loading: true, // 是否添加表格loading加载动画
        stripe: false, // 斑马线
        highlightCurrentRow: false, // 是否支持当前行高亮显示
        hasSelect: true, // 是否支持列表项选中功能
        hasIndex: false, // 是否有序号列
        hasHandle: true, // 是否有操作列
      },
      columns: [
        {
          search: "",
          prop: "name",
          label: "name",
          align: "left",
          isColumnShow: true,
          // ascFlg: false,
          //    descFlg: false,
          canSearch: true,
          canSort: false,
          isInput: false,
        },
        {
          search: "",
          prop: "type",
          label: "type",
          align: "left",
          isColumnShow: true,
          // ascFlg: false,
          //    descFlg: false,
          canSearch: false,
          canSort: true,
          isInput: false,
          render: (h, params) => {
            return h("el-tag", params.row.type);
          },
        },
        {
          search: "",
          prop: "tag",
          label: "tag",
          align: "left",
          isColumnShow: true,
          // ascFlg: false,
          //    descFlg: false,
          canSearch: true,
          canSort: true,
          isInput: false,
          render: (h, params) => {
            var arr = params.row.tag;
            return h(
              "div",
              arr.map(item => {
                return h(
                  "el-tag",
                  {
                    style: {
                      margin: "5px",
                    },
                  },
                  item
                );
              })
            );
          },
        },
        {
          search: "",
          prop: "switch",
          label: "switch",
          align: "left",
          isColumnShow: true,
          // ascFlg: false,
          //    descFlg: false,
          canSearch: true,
          canSort: false,
          isInput: false,
          render: (h, params) => {
            return h("div", [
              h("el-switch", {
                props: {
                  "value": params.row.switch,
                  "width": 40,
                  "active-text": "启用",
                  "inactive-text": "停用",
                  "active-color": "#13ce66",
                  "inactive-color": "#ff4949",
                },
                on: {
                  change: status => {
                    this.changeStatus(params.row, status);
                  },
                },
              }),
            ]);
          },
        },
        {
          search: "",
          prop: "access",
          label: "access",
          align: "left",
          isColumnShow: true,
          // ascFlg: false,
          //    descFlg: false,
          canSearch: true,
          canSort: true,
          isInput: false,
          formatter: (row, column, cellValue) => {
            if (row.access === "0") {
              return `<i class="el-icon-circle-close" style="color:red"></i><span style="color:red">Failed</span>`;
            } else if (row.access === "1") {
              return `<i class="el-icon-circle-check" style="color:green"></i><span style="color:green">Success</span>`;
            }
          },
        },
        {
          search: "",
          prop: "desc",
          label: "desc",
          align: "left",
          isColumnShow: true,
          // ascFlg: false,
          //    descFlg: false,
          canSearch: false,
          canSort: false,
          isInput: false,
          formatter: (row, column, cellValue) => {
            if (row.desc) {
              return `${row.desc}`;
            } else {
              return `-`;
            }
          },
        },
      ],
      operates: {
        width: "150px",
        list: [
          {
            id: "1",
            status: "normal",
            label: "编辑",
            type: "text",
            icon: "el-icon-edit",
            method: (index, row) => {
              this.editRow(row);
            },
          },
          {
            id: "2",
            status: "normal",
            label: "删除",
            type: "text",
            icon: "el-icon-delete",
            method: (index, row) => {
              this.deleteRow(row);
            },
          },
          {
            id: "9999",
            status: "action",
            label: "保存",
            type: "text",
            icon: "el-icon-check",
            method: (index, row) => {
              this.saveRow(row);
            },
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.options.loading = false;
    }, 1000);
  },
  computed: {},
  methods: {
    getHeight() {
      this.contentStyleObj.height = window.innerHeight - 100 + "px";
    },
    // 点击 table 排序
    sortChange(item) {
      if (item.order === "ascending") {
        //发请求
      } else if (item.order === "descending") {
        //发请求
      } else {
        //发请求
      }
    },
    changeColumnShow(value) {
      this.columns.forEach(columnItem => {
        try {
          value.forEach(valueItem => {
            if (valueItem === columnItem.prop) {
              this.$set(columnItem, "isColumnShow", true);
              throw "break";
            } else {
              this.$set(columnItem, "isColumnShow", false);
            }
          });
        } catch (e) {}
      });
      this.$nextTick(() => {
        this.$refs["table-parent"].$refs["cisco-table"].doLayout();
      });
    },
    // active 启用停用
    changeStatus(row, status) {
      this.$confirm("是否改变服务状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.switch = !row.switch;
          this.$message({
            type: "success",
            message: "服务状态改变成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消改变服务状态",
          });
        });
    },
    editRow(row) {
      this.$set(row, "isInput", true);
      this.columns.forEach(item => {
        if (item.prop === "name") {
          item.isInput = true;
        }
      });
    },
    saveRow(row) {
      this.$set(row, "isInput", false);
      this.columns.forEach(item => {
        if (item.prop === "name") {
          item.isInput = false;
        }
      });
    },
    handleSelectionChange(selection, row) {
      const idArray = [];
      selection.forEach(item => {
        idArray.push({ id: item.id });
      });
      this.tableSelection = idArray;
    },

    deleteRow(row) {
      // console.error("deleteRow", row);
    },
  },
};
</script>
