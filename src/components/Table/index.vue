<template>
  <div class="tablebar">
    <el-table
      id="xxxTable"
      ref="xxxTable"
      v-loading.iTable="options.loading"
      :row-key="getRowKey"
      :default-expand-all="options.isExpendAll"
      :height="options.height"
      tooltip-effect="dark"
      :highlight-current-row="options.highlightCurrentRow"
      :header-cell-style="{
        'background-color': '#f5f5f5',
      }"
      border
      :data="tableDataComputed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="options.hasSelect" type="selection" style="width: 55px" :reserve-selection="true" />
      <el-table-column v-if="options.hasIndex" type="index" />
      <template v-for="column in columns">
        <el-table-column
          :key="column.id"
          show-overflow-tooltip
          sortable
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
          :min-width="column.minWidth"
        >
          <template slot-scope="scope">
            <template v-if="column.formatter">
              <span @click="clickColumn(scope.row, column)" v-html="column.formatter(scope.row, column)" />
            </template>
            <template v-else>
              <span>{{ scope.row[column.prop] }}</span>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="options.hasHandle && isColShow"
        ref="fixedColumn"
        label="操作"
        align="left"
        :width="operates.width ? operates.width : 170"
        :fixed="operates.fixed"
        :min-width="operates.minWidth"
      >
        <template slot-scope="scope">
          <div class="operate-group">
            <template v-for="(btn, key) in operates.list">
              <span v-if="btn.show" :key="btn.id" class="item">
                <el-button
                  :type="btn.type"
                  size="mini"
                  :icon="btn.icon"
                  @click.native.prevent="btn.method(key, scope.row)"
                  >{{ btn.label }}</el-button
                >
              </span>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import VU from "../../libs/VUtil";
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
    needExpand: {
      type: String,
      default: null,
    },
    columns: {
      type: Array,
      default: [],
    },
    operates: {},
    // table 表格的控制参数
    options: {
      type: Object,
      default: {
        highlightCurrentRow: false, // 是否要高亮当前行
        isExpendAll: false, // table-tree默认不展开
      },
    },
    filterInput: {
      type: String,
      default: "",
    },
    // l2 右侧弹出 操作列 在编辑/添加显示, 详情浏览隐藏
    isColShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputVal: "",
      tableColumns: [],
      contentHeight: 1,
    };
  },
  computed: {
    tableDataComputed() {
      if (this.tableColumns.length !== 0 && this.list.length !== 0) {
        return VU.table.filterTableData(this.tableColumns, this.list, this.inputVal);
      }
    },
  },
  watch: {
    filterInput: {
      handler(newVal, oldVal) {
        this.inputVal = newVal;
      },
    },
    isColShow: {
      handler(newVal, oldVal) {
        this.isCol = newVal;
      },
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.tableColumns = this.$refs.xxxTable.columns;
      if (document.querySelector("#pagebar")) {
        VU.resize.autoResizeContent(this, document.querySelector("#pagebar").offsetHeight);
      } else {
        VU.resize.autoResizeContent(this);
      }
    });
  },
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 多行选中
    handleSelectionChange(val) {
      console.error("123");
      this.$emit("handleSelectionChangeFunc", val);
    },
    // 增加接口
    addInterface(val) {
      this.$emit("addInterfaceFunc", val);
    },
    // +子接口
    chooseChildInterface(val) {
      this.$emit("chooseChildInterfaceFunc", val);
    },
    // 选择
    chooseInterface(val) {
      this.$emit("chooseInterfaceFunc", val);
    },
    // l2 右边弹窗 详情
    showDetails(val) {
      this.$emit("showDetailsFunc", val);
    },
    // 开启 暂停服务
    startRow(val) {
      this.$emit("startRowFunc", val);
    },
    // 操作日志 内容json 展示
    contentShow(val) {
      this.$emit("contentShowFunc", val);
    },
    // 点击列 弹窗 或者 各种事件
    clickColumn(row, column) {
      if (column.prop === "lineName") {
        this.showDetails(row);
      } else if (column.prop === "status") {
        this.startRow(row);
      } else if (column.prop === "content") {
        this.contentShow(row);
      }
    },
  },
};
</script>
<style lang="scss">
.tablebar button i {
  font-size: 13px;
}
</style>
