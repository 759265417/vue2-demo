<template>
  <div class="view-content">
    <div class="deviceList">
      <div class="toolbar">
        <el-form ref="filterForm" :model="filterForm" label-width="100px" inline>
          <el-form-item>
            <el-input
              v-model="devInput"
              v-focus
              placeholder="设备过滤"
              clearable
              size="mini"
              :disabled="this.leftLoading"
              @input="changeInput"
              @keyup.esc.native="escClearInput"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="tablebar tableDevice">
        <!-- <el-table
          :data="tableDataComputed"
          highlight-current-row
          border
          :show-header="false"
          ref="devTable"
          v-loading="this.leftLoading"
          @row-click="loadRightData"
          :header-cell-style="{
          'background-color': '#f5f5f5'
        }"
        >
          >
          <el-table-column label="设备列表" prop="device_name" sortable></el-table-column>
        </el-table>-->
      </div>
    </div>
    <div class="downInfo">
      <div class="deviceName">设备名称:{{ device_name }}</div>
      <div class="downInfoDiv">
        <el-form ref="communityForm" :inline="true" :model="communityForm" class="demo-form-inline" label-width="0px">
          <el-divider content-position="left">Vrf</el-divider>
          <el-button type="primary" class="addBtn" @click="addDomain('vrfs')">新增vrf</el-button>
          <div class="tablebar">
            <el-table
              ref="vrfsTable"
              v-loading="false"
              size="small"
              :height="187"
              :data="communityForm.vrfs"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{
                'background-color': '#f5f5f5',
              }"
              border
            >
              <el-table-column type="index" />
              <el-table-column label="trap_server_ip" prop="trap_server_ip" sortable>
                <template v-for="(item, index) in communityForm.vrfs" slot-scope="scope">
                  <div :key="index">
                    <el-form-item
                      label=" "
                      :prop="'vrfs[' + index + '].trap_server_ip'"
                      :rules="[
                        {
                          required: true,
                          message: 'trap_server_ip不能为空',
                          trigger: 'blur',
                        },
                        {
                          pattern:
                            /^(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))$/,
                          message: 'trap_server_ip格式不正确',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input v-model="scope.row.trap_server_ip" />
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="community" prop="community" sortable>
                <template v-for="(item, index) in communityForm.vrfs" slot-scope="scope">
                  <div :key="index">
                    <el-form-item
                      label=" "
                      :prop="'vrfs[' + index + '].community'"
                      :rules="{
                        required: true,
                        message: 'community不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <el-input v-model="scope.row.community" />
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="udp_port_number" prop="udp_port_number" sortable>
                <template v-for="(item, index) in communityForm.vrfs" slot-scope="scope">
                  <div :key="index">
                    <el-form-item
                      label=" "
                      :prop="'vrfs[' + index + '].udp_port_number'"
                      :rules="[
                        {
                          required: true,
                          message: 'udp_port_number不能为空',
                          trigger: 'blur',
                        },
                        {
                          pattern:
                            /^(^[1-9]\d{0,3}$)|(^[1-5]\d{4}$)|(^6[0-4]\d{3}$)|(^65[0-4]\d{2}$)|(^655[0-2]\d$)|(^6553[0-5]$)$/,
                          message: 'udp_port_number范围为1-65535',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input v-model="scope.row.udp_port_number" />
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="操作" min-width="120px" width="240px">
                <template slot-scope="scope">
                  <el-button @click.prevent="removeDomain('vrfs', scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <el-divider content-position="left">View</el-divider>
          <el-button type="primary" class="addBtn" @click="addDomain('views')">新增View</el-button>
          <div class="tablebar">
            <el-table
              ref="viewsTable"
              v-loading="false"
              size="small"
              :height="187"
              :data="communityForm.views"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{
                'background-color': '#f5f5f5',
              }"
              border
            >
              <el-table-column type="index" />
              <el-table-column label="oid" prop="oid" sortable>
                <template v-for="(item, index) in communityForm.views" slot-scope="scope">
                  <div :key="index">
                    <el-form-item
                      label=" "
                      :prop="'views[' + index + '].oid'"
                      :rules="[
                        {
                          required: true,
                          message: 'oid不能为空',
                          trigger: 'blur',
                        },
                        {
                          pattern: /^([1-9][0-9]{0,3}|0)(\.([1-9][0-9]{0,3}|0)){5,13}$/,
                          message: 'oid格式不正确',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input v-model="scope.row.oid" />
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="120px" width="240px">
                <template slot-scope="scope">
                  <el-button @click.prevent="removeDomain('views', scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-divider content-position="left">Logging</el-divider>
          <el-button type="primary" class="addBtn" @click="addDomain('loggings')">新增Logging</el-button>
          <div class="tablebar">
            <el-table
              ref="loggingsTable"
              v-loading="false"
              size="small"
              :height="187"
              :data="communityForm.loggings"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{
                'background-color': '#f5f5f5',
              }"
              border
            >
              <el-table-column type="index" />
              <el-table-column label="syslog_server_ip" prop="loggings" sortable>
                <template v-for="(item, index) in communityForm.loggings" slot-scope="scope">
                  <div :key="index">
                    <el-form-item
                      label=" "
                      :prop="'loggings[' + index + '].syslog_server_ip'"
                      :rules="[
                        {
                          required: true,
                          message: 'syslog_server_ip不能为空',
                          trigger: 'blur',
                        },
                        {
                          pattern:
                            /^(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))$/,
                          message: 'syslog_server_ip格式不正确',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input v-model="scope.row.syslog_server_ip" />
                    </el-form-item>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="120px" width="240px">
                <template slot-scope="scope">
                  <el-button @click.prevent="removeDomain('loggings', scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 配置下发button: 当 vrf view logging 页面  有input框 才可点击,然后判断 表单验证是否通过-->
        </el-form>
      </div>
      <div class="downBtn">
        <el-button
          style="display: block; margin: 0 auto"
          type="success"
          :disabled="
            communityForm.vrfs.length === 0 && communityForm.views.length === 0 && communityForm.loggings.length === 0
          "
          @click="submitForm('communityForm')"
          >配置下发</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import AjaxUrls from "../../libs/AjaxUrls";
import VU from "../../libs/VUtil";
import { Loading } from "element-ui";
export default {
  name: "snmp",
  // input 默认 高亮
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    return {
      devInput: "",
      contentStyleObj: {
        height: "",
      },
      communityForm: {
        vrfs: [{ trap_server_ip: "", community: "", udp_port_number: "" }],
        views: [
          {
            oid: "",
          },
        ],
        loggings: [
          {
            syslog_server_ip: "",
          },
        ],
      },
      filterForm: {},
      deviceList: [],
      devRow: {},
      device_name: "",
      deviceColumns: [],
      leftLoading: true,
      activeName: "vrf",
    };
  },
  computed: {
    // 过滤
    // tableDataComputed() {
    //   if (this.deviceColumns.length !== 0 && this.deviceList.length !== 0) {
    //     return VU.table.filterTableData(
    //       this.deviceColumns,
    //       this.deviceList,
    //       this.devInput
    //     );
    //   }
    // }
  },
  created() {
    // 动态右侧 div高度
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },

  mounted() {
    // 默认不显示 input loading遮罩 localstorage 存储 已选设备
    this.communityForm.vrfs = [];
    this.communityForm.views = [];
    this.communityForm.loggings = [];
    // let loadingInstance = Loading.service({
    //   target: document.querySelector(".downInfo")
    // });
    if (this.$refs) {
      this.deviceColumns = this.$refs.devTable.columns;
    }
    // VU.ajax.load(AjaxUrls.devices_loadAll, {}, res => {
    //   res.data.forEach(item => {
    //     if (item.device_model === "asr9k") {
    //       this.deviceList.push(item);
    //     }
    //   });
    //   let storage = window.localStorage;
    //   let hasStorage = storage.getItem("aclDeviceName");
    //   if (hasStorage) {
    //     hasStorage = JSON.parse(hasStorage);
    //     for (var i = 0; i < this.deviceList.length; i++) {
    //       if (hasStorage === this.deviceList[i].device_name) {
    //         this.loadRightData(this.deviceList[i]);
    //       }
    //     }
    //   } else {
    //     if (this.deviceList.length > 0) {
    //       this.loadRightData(this.deviceList[0]);
    //     }
    //   }
    //   this.leftLoading = false;
    //   loadingInstance.close();
    // });
  },

  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  methods: {
    // 当input 为空 设置高亮行
    changeInput(val) {
      if (val === "") {
        this.$nextTick(() => {
          this.$refs.devTable.setCurrentRow(this.devRow);
        });
      }
    },
    // esc清空设备 input
    escClearInput() {
      this.devInput = "";
      this.$nextTick(() => {
        this.$refs.devTable.setCurrentRow(this.devRow);
      });
    },
    getHeight() {
      this.contentStyleObj.height = window.innerHeight - 120 + "px";
    },
    loadRightData(row) {
      // 点击 新设备 清空 数据
      this.device_name = row.device_name;
      this.activeName = "vrf";
      this.devRow = row;
      this.communityForm.vrfs = [];
      this.communityForm.views = [];
      this.communityForm.loggings = [];
      // 点击设备
      this.$nextTick(() => {
        if (this.$refs.devTable) {
          this.$refs.devTable.setCurrentRow(row);
        }
      });
      var storage = window.localStorage;
      var objStr = JSON.stringify(row.device_name);
      storage.setItem("aclDeviceName", objStr);
    },
    // 设备下发 点击 添加 按钮
    addDomain(str) {
      if (str === "vrfs") {
        this.communityForm.vrfs.unshift({
          trap_server_ip: "",
          community: "",
          udp_port_number: "",
        });
      } else if (str === "views") {
        this.isViewShow = true;
        this.communityForm.views.unshift({
          oid: "",
        });
      } else if (str === "loggings") {
        this.isLoggingShow = true;
        this.communityForm.loggings.unshift({
          syslog_server_ip: "",
        });
      }
    },
    // 删除 下发 input
    removeDomain(str, item) {
      console.log(item);
      var index = this.communityForm[str].indexOf(item);
      if (index !== -1) {
        this.communityForm[str].splice(index, 1);
      }
    },
    // 切换 tab页
    handleClick(tab, event) {
      // console.log(tab.label);
    },
    // 表单提交 发请求
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const input = {};
          input.node = [];
          let vrfParams = {};
          let viewParams = {};
          let logParams = {};
          input.node.push({ device: this.device_name, config: [] });
          this.communityForm.vrfs.forEach(item => {
            item.udp_port_number = parseInt(item.udp_port_number);
            if (item.community !== "") {
              return (vrfParams = {
                type: "vrf",
                parameter: this.communityForm.vrfs,
              });
            }
          });
          this.communityForm.views.forEach(item => {
            if (item.oid !== "") {
              return (viewParams = {
                type: "view",
                parameter: this.communityForm.views,
              });
            }
          });
          this.communityForm.loggings.forEach(item => {
            if (item.syslog_server_ip !== "") {
              return (logParams = {
                type: "logging",
                parameter: this.communityForm.loggings,
              });
            }
          });
          // 判断 是不是 空对象{}
          var vrfParamsArr = Object.keys(vrfParams);
          var viewParamsArr = Object.keys(viewParams);
          var logParamsArr = Object.keys(logParams);
          if (vrfParamsArr.length !== 0) {
            input.node[0].config.push(vrfParams);
          }
          if (viewParamsArr.length !== 0) {
            input.node[0].config.push(viewParams);
          }
          if (logParamsArr.length !== 0) {
            input.node[0].config.push(logParams);
          }
          const downParams = { input };
          console.error(downParams);
          // VU.ajax.down(AjaxUrls.SnmpOrSyslog, downParams, res => {});
        } else {
          this.$message.error("请检查 信息是否填的完整");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
// .deviceList {
//   width: 211px;
//   float: left;
//   .toolbar {
//     .el-input__inner {
//       height: 32px;
//       width: 16.5em;
//     }
//   }
//   .el-table__body tr.current-row > td {
//     border-left: 3px solid #22a1ff;
//   }
//   .tableDevice {
//     cursor: pointer;
//   }
// }
// .downInfo {
//   height: calc(100% - 50px);
//   .deviceName {
//     border: 1px solid #e5e5e5;
//     background-color: #f5f5f5;
//     text-align: center;
//     margin-left: 213px;
//     font-size: 16px;
//     height: 43px;
//     line-height: 43px;
//   }
//   .downInfoDiv {
//     float: left;
//     height: inherit;
//     margin-bottom: 10px;
//     width: calc(100% - 213px);
//     margin-left: 2px;
//     overflow-y: scroll;
//   }
//   .downBtn {
//     margin-left: 213px;
//   }
// }

// .formTop {
//   .el-form-item {
//     margin-bottom: 0;
//   }
// }
// .addBtn {
//   margin: 0 0 10px 20px;
//   width: 100px;
// }
// .el-table--border th,
// .el-table--border td {
//   border-right: 0;
// }
</style>
