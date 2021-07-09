<template>
  <div class="view-content" v-loading="tableLoading">
    <h3>多表头表格</h3>
    <header-select ref="header-select"></header-select>
    <div>
      <div :style="contentStyleObj">
        <matrix-table
          :colData="colHead"
          :rowData="rowHead"
          :tableValue="tableValue1"
          @tableValLeftClickFunc="tableValLeftClick"
          @tableValRightClickFunc="tableValRightClick"
        ></matrix-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import MatrixTable from "../../components/MatrixTable/index.js";
import moreTreeTableJs from "./moreTreeTableJs";
import HeaderSelect from "./components/headerSelect.vue";
export default {
  components: {
    "matrix-table": MatrixTable,
    "header-select": HeaderSelect,
  },
  data() {
    return {
      contentStyleObj: {
        height: "",
      },
      moreTreeTableJs: moreTreeTableJs,
      colHead: [],
      rowHead: [],
      tableValue1: [],
      tableLoading: true,
    };
  },
  computed: {
    ...mapGetters(["getterSelectVal"]),
  },
  watch: {
    getterSelectVal(selevtVal) {
      this.setBackgroundColor(selevtVal);
    },
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  mounted() {
    setTimeout(() => {
      this.colHead = moreTreeTableJs.colHead;
      this.rowHead = moreTreeTableJs.rowHead;
      this.tableValue1 = moreTreeTableJs.tableValueList;
      // console.log(this.colHead.length);
      // console.log(this.rowHead.length);
      console.log(this.tableValue1);
      this.tableLoading = false;
      this.setBackgroundColor(this.$store.state.select.selectVal);
    }, 1000);
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    getHeight() {
      this.contentStyleObj.height = window.innerHeight - 170 + "px";
    },
    getTdIdDom(src, dst) {
      const dom = document.getElementById(src + "_" + dst);
      return dom;
    },
    setBackgroundColor(selevtVal) {
      this.$nextTick(() => {
        let dom = null;
        this.tableValue1.forEach(item => {
          if (selevtVal === "s_to_d_jitterAvg") {
            if (item.s_to_d_jitterAvg > 10 && item.s_to_d_jitterAvg < 50) {
              dom = this.getTdIdDom(item.src_device_id, item.dst_device_id).style.backgroundColor = "yellow";
            } else if (item.s_to_d_jitterAvg >= 50 && item.s_to_d_jitterAvg < 100) {
              dom = this.getTdIdDom(item.src_device_id, item.dst_device_id).style.backgroundColor = "red";
            } else {
              dom = this.getTdIdDom(item.src_device_id, item.dst_device_id).style.backgroundColor = "	#90EE90";
            }
          } else if (selevtVal === "d_to_s_jitterAvg") {
            // dom = "#ccc";
          } else {
            dom = this.getTdIdDom(item.src_device_id, item.dst_device_id).style.backgroundColor = "#ccc";
          }
        });
      });
    },
    tableValLeftClick(yItem, xItem) {
      console.log(yItem, xItem, "left click");
    },
    tableValRightClick(yItem, xItem) {
      console.log(yItem, xItem, "right click");
    },
  },
};
</script>

<style></style>
