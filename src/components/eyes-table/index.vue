<template>
  <div class="tablebar" id="cisco-table-outer">
    <el-table
      :data="list"
      id="cisco-table"
      ref="cisco-table"
      v-loading.iTable="options.loading"
      :row-key="getRowKey"
      :default-expand-all="options.isExpendAll"
      :height="height"
      :stripe="options.stripe"
      tooltip-effect="dark"
      :highlight-current-row="options.highlightCurrentRow"
      :header-cell-style="{
        'background-color': '#f5f5f5',
      }"
      border
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
    >
      <el-table-column v-if="options.hasSelect" type="selection" style="width: 55px" :reserve-selection="true" />
      <el-table-column v-if="options.hasIndex" type="index" />
      <template v-for="column in columns">
        <el-table-column
          :key="column.id"
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
          :min-width="column.minWidth"
          v-if="column.isColumnShow"
          :sortable="column.canSort"
          :render-header="renderHeader"
        >
          <template slot-scope="scope">
            <template v-if="column.render">
              <expand-dom :column="column" :row="scope.row" :render="column.render"></expand-dom>
            </template>
            <template v-else-if="column.formatter">
              <span v-html="column.formatter(scope.row, column)" @click="clickColumn(scope.row, column)"></span>
            </template>
            <template v-else>
              <template v-if="column.isInput && scope.row.isInput">
                <el-input v-model="scope.row[column.prop]" />
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="options.hasHandle"
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
              <template v-if="scope.row.isInput">
                <template v-if="btn.status === 'action'">
                  <el-button
                    :type="btn.type"
                    size="mini"
                    :icon="btn.icon"
                    :key="key"
                    circle
                    @click.native.prevent="btn.method(key, scope.row)"
                    >{{ btn.label }}</el-button
                  >
                </template>
              </template>
              <template v-else>
                <template v-if="btn.status === 'normal'">
                  <el-button
                    :type="btn.type"
                    size="mini"
                    circle
                    :icon="btn.icon"
                    :key="key"
                    @click.native.prevent="btn.method(key, scope.row)"
                    >{{ btn.label }}</el-button
                  >
                </template>
              </template>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      default: "800px",
    },
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    needExpand: {
      type: String,
      default: null,
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      },
    },
    operates: {},
    // table 表格的控制参数
    options: {
      type: Object,
      default: function () {
        return {
          stripe: false,
          isExpendAll: false,
          loading: true, // 是否添加表格loading加载动画
          highlightCurrentRow: false, // 是否支持当前行高亮显示
          hasSelect: false, // 是否支持列表项选中功能
          hasIndex: false, // 是否有序号列
          hasHandle: false,
        };
      },
    },
  },
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        };
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    searchChange(e) {
      // this.$parent.getHeaderInput();
    },

    getRowKey(row) {
      return row.id;
    },
    // 排序
    sortChange(item) {
      this.$emit("sortChangeFunc", item);
    },
    // 多行选中
    handleSelectionChange(val) {
      this.$emit("handleSelectionChangeFunc", val);
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
    renderHeader(h, { column, $index }) {
      var canSortArr = [];
      this.columns.forEach(item => {
        if (item.isColumnShow && item.canSort) {
          canSortArr.push(item);
        }
      });
      let canSearch = false;
      const headerLabel = document.getElementsByClassName("level-font-class");
      const orderIcon = document.getElementsByClassName("caret-wrapper");

      this.columns.forEach((item, index) => {
        for (var i = 0; i < headerLabel.length; i++) {
          if (item.prop === headerLabel[i].innerHTML) {
            item.labelWidth = headerLabel[i].offsetWidth + 5 + "px";
          }
        }
        if (item.prop === column.property) {
          canSearch = item.canSearch;
        }
      });
      setTimeout(() => {
        for (var j = 0; j < orderIcon.length; j++) {
          canSortArr.forEach((item, index) => {
            if (j === index) {
              orderIcon[j].style.left = item.labelWidth;
            }
          });
        }
      }, 0);

      if (canSearch) {
        return h(
          "div",
          {
            on: {
              click: e => {
                e.stopPropagation();
                e.preventDefault();
              },
            },
          },
          [
            h(
              "span",
              {
                style: {},
                class: "level-font-class",
              },
              column.label
            ),
            h("el-input", {
              props: {
                "value": this.columns[$index] && this.columns[$index - 1].search,
                "prefix-icon": "el-icon-search",
              },
              on: {
                change: this.searchChange,
                input: value => {
                  this.columns[$index - 1].search = value;
                },
              },
            }),
          ]
        );
      } else {
        return h(
          "span",
          {
            style: {},
            class: "level-font-class",
          },
          column.label
        );
      }
    },
  },
};
</script>
<style lang="scss">
#cisco-table-outer {
  .el-table__header {
    tr {
      th {
        .cell {
          position: relative;
          .caret-wrapper {
            position: absolute;
            top: 0;
            // left: 50px;
          }
        }
      }
    }
  }

  .el-input__inner {
    width: inherit !important;
    height: 22px !important;
  }
  .el-table .caret-wrapper {
    height: 21px;
  }
  .el-table .sort-caret.ascending {
    top: 0px;
  }
  .el-table .sort-caret.descending {
    bottom: -1px;
  }
  .el-icon-search {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.tablebar button i {
  font-size: 13px;
}
</style>
