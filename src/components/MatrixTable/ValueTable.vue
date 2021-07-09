<template>
  <div class="value-table">
    <!-- 多表头表体 -->

    <table class="editTable__block" v-if="edit.rowData.length > 0 && edit.colData.length > 0">
      <tr v-for="(x, xindex) in edit.lastDataCol" :key="xindex">
        <td
          v-for="(y, yindex) in edit.lastDataRow"
          :key="yindex + '_' + xindex"
          :style="tdStyle"
          @click="clickTd(y, x, $event)"
          @contextmenu.prevent="rightClickTd(y, x, $event)"
          :id="setTdId(y, x)"
          :ref="setTdId(y, x)"
        >
          <!-- <el-popover
            placement="bottom-end"
            title="详情"
            width="200"
            trigger="click"
            popper-class="table-popver"
          >
            <p class="tipck">最近24小时</p>
            <p class="tipck">过去一个月</p> -->
          <span v-if="selectVal === 's_to_d_jitterAvg'" slot="reference">{{
            tableData[y.id + "_" + x.id]["s_to_d_jitterAvg"] || 0
          }}</span>
          <span v-if="selectVal === 'd_to_s_jitterAvg'" slot="reference">{{
            tableData[y.id + "_" + x.id]["d_to_s_jitterAvg"] || 0
          }}</span>
          <!-- </el-popover> -->
        </td>
      </tr>
    </table>
    <div class="menu" ref="menu" @contextmenu.prevent="clickMenuOuter($event)">
      <ul>
        <div>详情</div>
        <li onclick="copy()" class="tipck">复制</li>
        <li onclick="zhan()" class="tipck">粘贴</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  inject: ["edit"],
  props: {
    tableData: [Object, Array],
  },
  // computed: {
  //   ...mapState(["selectVal"]),
  // },
  computed: mapState({
    selectVal: state => state.select.selectVal,
  }),
  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler(val) {
        this.valueData = val;
        this.tableData = val;
      },
    },
    valueData: {
      deep: true,
      handler(val) {
        this.$emit("updata:tableData", val);
      },
    },
  },

  data() {
    return {
      valueData: {},
      tdStyle: {
        width: this.edit.headColWidth + "px",
        height: this.edit.tableTdHeight + "px",
        textAlign: "center",
      },
      // selectVal: "s_to_d_jitterAvg",
    };
  },
  mounted() {},
  methods: {
    clickMenuOuter(event) {
      event.preventDefault();
    },
    mousePosition(event) {
      var posX = 0;
      var posY = 0;
      var event = event || window.event;
      if (event.pageX || event.pageY) {
        posX = event.pageX;
        posY = event.pageY;
      } else if (event.clientX || event.clientY) {
        posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
        posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
      }
      return { posX, posY };
    },
    setTdId(y, x) {
      return `${y.id}_${x.id}`;
    },
    //table value 左键 td 点击事件
    clickTd(yItem, xItem, e) {
      this.$emit("tableValLeftClickFunc", yItem, xItem);
    },
    //table 右键td 事件
    rightClickTd(yItem, xItem, e) {
      console.log(yItem.id);
      console.log(xItem.id);
      var menu = this.$refs.menu;
      const appR = document.getElementsByClassName("app-wrapper")[0];
      if (yItem.id !== xItem.id) {
        if (e.button == 2) {
          e = event || window.event;
          var shu = this.mousePosition(e);
          menu.style.display = "block";
          menu.style.left = shu.posX + "px";
          console.log(shu.posX);
          if (shu.posX + 140 >= document.body.clientWidth) {
            menu.style.left = document.body.clientWidth - 200 + "px";
          }

          menu.style.top = shu.posY + "px";
          if (shu.posY + 140 >= document.body.clientHeight) {
            menu.style.top = document.body.clientHeight - 180 + "px";
          }
          menu.onclick = function () {
            menu.style.display = "none";
          };
          appR.onclick = function () {
            menu.style.display = "none";
          };
          // div1.onclick = function () {
          //   menu.style.display = "none";
          // };
        } else {
          return false;
        }
        this.$emit("tableValRightClickFunc", yItem, xItem);
      }
    },
    change(data) {
      this.$emit("tdChange", data);
    },
  },
};
</script>

<style lang="scss">
.value-table {
  .tipck {
    cursor: pointer !important;
    margin: 0;
    padding: 6px 0;
    text-align: center;
  }
  .tipck:hover {
    color: #1989fa !important;
    background: #ecf5ff;
  }
  .menu {
    position: fixed;
    display: none;
  }

  .menu ul li {
    list-style: none;
    display: inline-block;
    width: 176px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    border: 1px solid #e2e2e2;
    background-color: white;
  }

  .menu ul {
    width: 140px;
  }
  table {
    table-layout: fixed;
    min-width: 100%;
  }
  .el-table td {
    padding: 0 !important;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-table th {
    padding: 0 !important;
    height: 39px;
    line-height: 39px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-table .cell {
    padding: 0;
    padding-left: 0;
  }
  .el-input__inner {
    border: 0;
    background: transparent;
  }
}

// }
</style>
