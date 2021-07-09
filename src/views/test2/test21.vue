<template>
  <div>
    <div id="subDiv1" style="display: none; width: 120px">12312312312312312</div>
    <div style="padding: 20px" id="app">
      <div class="panel panel-primary">
        <table class="table table-bordered table-striped text-center matrixTable" id="table">
          <thead>
            <tr>
              <th rowspan="2">区域</th>
              <th rowspan="2">源设备</th>
              <!--区域数据表头eg:China-->
              <th v-for="(item, index) in tableAreaData" :id="item.areaName + 'Head'" :key="index">
                {{ item.areaName }}
              </th>
            </tr>
            <!--设备数据表头eg:SLA1-->
            <tr>
              <th v-for="(item, index) in tableHeadData" :id="item.src_device_id" :key="index + 99">
                {{ item.srcName }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!--区域数据列 eg:China-->
            <tr v-for="(item, index) in tableAreaData" :key="index + 999">
              <td :id="item.areaName">{{ item.areaName }}</td>
            </tr>
            <!--设备数据列 eg:SLA1-->
            <tr v-for="(item, index) in tableBodyData" :key="index">
              <td :id="item.dst_device_id">{{ item.desName }}</td>
              <td
                v-for="(item1, index) in tableHeadData"
                :id="`${item.dst_device_id}#${item1.src_device_id}`"
                :key="index"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableHeadData: [],
      tableBodyData: [],
      tableAreaData: [],
      endData: [
        {
          s_to_d_loss: 0,
          src_device_id: 12,
          dst_device_id: 13,
          avgrtt: 1,
          operation_id: 1001,
          id: 12811799,
          availability: 1,
          d_to_s_jitterAvg: 0.004,
          s_to_d_jitterAvg: 20.357,
          packets: 10,
          d_to_s_loss: 0,
          srcName: "SLA-1测试",
          desName: "SLA-2",
          areaName: "China",
        },
        {
          s_to_d_loss: 0,
          src_device_id: 12,
          dst_device_id: 14,
          avgrtt: 1,
          operation_id: 1002,
          id: 12811802,
          availability: 1,
          d_to_s_jitterAvg: 0.005,
          s_to_d_jitterAvg: 20.352,
          packets: 10,
          d_to_s_loss: 0,
          srcName: "SLA-1测试",
          desName: "SLA-3",
          areaName: "China",
        },
        {
          s_to_d_loss: 0,
          src_device_id: 13,
          dst_device_id: 14,
          avgrtt: 1,
          operation_id: 1001,
          id: 12811774,
          availability: 1,
          d_to_s_jitterAvg: 20.298,
          s_to_d_jitterAvg: 20.303,
          packets: 10,
          d_to_s_loss: 0,
          srcName: "SLA-2",
          desName: "SLA-3",
          areaName: "China",
        },
        {
          s_to_d_loss: 0,
          src_device_id: 13,
          dst_device_id: 12,
          avgrtt: 0.939,
          operation_id: 30008,
          id: 12811780,
          availability: 1,
          d_to_s_jitterAvg: 20.359,
          s_to_d_jitterAvg: 0.004,
          packets: 10,
          d_to_s_loss: 0,
          desName: "SLA-1测试",
          areaName: "China",
          srcName: "SLA-2",
        },
        {
          s_to_d_loss: 0,
          src_device_id: 14,
          dst_device_id: 13,
          avgrtt: 1,
          operation_id: 1001,
          id: 12811776,
          availability: 1,
          d_to_s_jitterAvg: 20.312,
          s_to_d_jitterAvg: 20.316,
          packets: 10,
          d_to_s_loss: 0,
          desName: "SLA-2",
          areaName: "China",
          srcName: "SLA-3",
        },
        {
          s_to_d_loss: 0,
          src_device_id: 14,
          dst_device_id: 12,
          avgrtt: 0.938,
          operation_id: 30008,
          id: 12811782,
          availability: 1,
          d_to_s_jitterAvg: 20.354,
          s_to_d_jitterAvg: 0.002,
          packets: 10,
          d_to_s_loss: 0,
          desName: "SLA-1测试",
          areaName: "China",
          srcName: "SLA-3",
        },
      ],
    };
  },
  mounted() {
    this.tableHeadData = JSON.parse(JSON.stringify(this.endData));
    this.tableBodyData = JSON.parse(JSON.stringify(this.endData));
    this.tableAreaData = JSON.parse(JSON.stringify(this.endData));
    this.tableHeadData = this.changeDataHead(this.tableHeadData);
    this.tableBodyData = this.changeDataBody(this.tableBodyData);
    this.tableAreaData = this.changeAreaHead(this.tableAreaData);

    this.$nextTick(() => {
      var _cell;
      this.tableHeadData.forEach(headItem => {
        var areaRow = document.getElementById(`${headItem.areaName}`);
        var areaHeadRow = document.getElementById(`${headItem.areaName + "Head"}`);
        areaHeadRow.colSpan = this.tableHeadData.length;
        areaRow.rowSpan = this.tableHeadData.length + 1;
        var c = (document.getElementById(`${headItem.dst_device_id}#${headItem.dst_device_id}`).innerHTML = "-");
        this.tableBodyData.forEach(bodyItem => {
          var c = (document.getElementById(`${bodyItem.src_device_id}#${bodyItem.src_device_id}`).innerHTML = "-");
          if (bodyItem.src_device_id != headItem.dst_device_id) {
            var a1 = document.getElementById(`${headItem.dst_device_id}#${headItem.src_device_id}`);
            var b1 = document.getElementById(`${bodyItem.dst_device_id}#${bodyItem.src_device_id}`);

            var a = (document.getElementById(`${headItem.dst_device_id}#${headItem.src_device_id}`).innerHTML =
              headItem.s_to_d_jitterAvg);

            var b = (document.getElementById(`${bodyItem.dst_device_id}#${bodyItem.src_device_id}`).innerHTML =
              bodyItem.s_to_d_jitterAvg);
          }
          if (document.getElementById(`${bodyItem.dst_device_id}#${bodyItem.src_device_id}`)) {
            _cell = document.getElementById(`${bodyItem.dst_device_id}#${bodyItem.src_device_id}`);
            console.log(_cell);
            _cell.onmouseover = () => {
              this.showColumnDetail(bodyItem, "subDiv1");
            };
            _cell.onmouseout = () => {
              this.hideColumnDetail(bodyItem, "subDiv1");
            };
          }
        });
      });

      var table = document.getElementById("table");
      var rows = table.rows;
      //去 table内空数据
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].cells.length; j++) {
          if (rows[i].cells[j].innerHTML === "") {
            rows[i].cells[j].style = "display:none";
          }
        }
      }
      //去行 重复设备
      var tr = document.getElementsByTagName("tr");
      for (var i = 0; i < tr.length; i++) {
        for (var j = 0; j < tr[i].cells.length; j++) {
          if (tr[i].cells[j].style.display === "none") {
            tr[i].style.display = "none";
          }
        }
      }
    });
  },
  methods: {
    showColumnDetail(column, divID) {
      if (divID != null && divID != "") {
        var v = document.getElementById(divID);
        if (v.style.display == "none") {
          v.style.display = "inline";
          v.innerHTML = `
            <div style="padding:20px 10px 10px 10px;font-size:13px;display: flex;justify-content: space-between;">
                    <div style="text-align:right">接口名称</div>
                    <div style="margin-left:20px;">${linkItem["name"]}</div></div>
                <div style="padding:10px 10px;font-size:13px;display: flex;justify-content: space-between;">
                    <div style="text-align:right">A端设备</div>
                    <div style="margin:0 20px;">${linkItem["source_name"]}</div>
                    <div style="text-align:right">A端地址</div>
                    <div style="margin-left:10px;">${linkItem["source_ip"]}</div></div>
                    <div style="padding:10px 10px;font-size:13px;display: flex;justify-content: space-between;">
                    <div style="text-align:right">B端设备</div>
                    <div style="margin:0 20px;">${linkItem["dest_name"]}</div>
                    <div style="text-align:right">B端地址</div>
                    <div style="margin-left:10px;">${linkItem["dest_ip"]}</div></div>

                    
                    <div style="padding:10px 10px;font-size:13px;display: flex;justify-content: space-between;">
                    <div style="text-align:right">带宽</div>
                    <div style="margin-left:20px;">${linkItem["bandwidth"]}</div><div ${
            linkItem["igress"] ? 'class="showIgress"' : 'class="notShowIgress"'
          }>    
                    <div style="text-align:right">Igress</div>
                    <div style="margin-left:20px;">${linkItem["igress"]}</div></div>
                  
                    <div ${linkItem["egress"] ? 'class="showIgress"' : 'class="notShowIgress"'}>    
                    <div style="text-align:right">Egress</div>
                    <div style="margin-left:20px;">${linkItem["egress"]}</div></div></div>
                    
                    <div style="padding:10px 10px 20px 10px;;font-size:13px;display: flex;justify-content: space-between;">
                    <div style="text-align:right"><button style="
                                                      background-color: #4CAF50;
                                                      border: none;
                                                      color: white;
                                                      padding: 3px 5px;
                                                      text-align: center;
                                                      text-decoration: none;
                                                      display: inline-block;
                                                      font-size: 13px;
                                                      border-radius: 5px;">
                      <a href="http://10.124.0.148:5601/app/kibana#/dashboard/6dc65ac0-b9b0-11ea-bd9e-49e23dc8c278?_g=(refreshInterval:(pause:!t,value:0),time:(from:now-30m,to:now-15m))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(darkTheme:!f,useMargins:!f),panels:!((embeddableConfig:(vis:(params:(sort:(columnIndex:!n,direction:!n)))),gridData:(h:30,i:'10',w:24,x:0,y:18),id:bb92fa50-8020-11e7-bcae-4bd056c878e8,panelIndex:'10',title:'',type:visualization,version:'7.3.0'),(embeddableConfig:(vis:(params:(sort:(columnIndex:!n,direction:!n)))),gridData:(h:30,i:'12',w:24,x:24,y:18),id:ce9157f0-8020-11e7-bcae-4bd056c878e8,panelIndex:'12',title:'',type:visualization,version:'7.3.0'),(gridData:(h:15,i:'21',w:38,x:10,y:3),id:b22f5660-55d2-11e8-a695-171fb712da36,panelIndex:'21',title:'%E6%9C%8D%E5%8A%A1%E6%B5%81%E9%87%8F%20(%E4%BD%8D%2F%E7%A7%92)',type:visualization,version:'7.3.0'),(gridData:(h:15,i:'22',w:10,x:0,y:3),id:'7546a110-55fd-11e8-b711-83a5f93b17f3',panelIndex:'22',title:'',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:3,i:'23',w:29,x:0,y:0),id:'30ff5d70-336b-11e9-aec0-c1d93190f676',panelIndex:'23',title:'',type:visualization,version:'7.3.0'),(embeddableConfig:(),gridData:(h:3,i:'24',w:14,x:29,y:0),id:'1d9c7c30-336c-11e9-aec0-c1d93190f676',panelIndex:'24',title:'',type:visualization,version:'7.3.0')),query:(language:lucene,query:(query_string:(analyze_wildcard:!t,default_field:'*',query:'*',time_zone:Asia%2FShanghai))),timeRestore:!f,title:%E6%B5%81%E9%87%8FTop-N,viewMode:view)" target="view_window">netflow流量成分分析</a></button></div>

                </div>`;
        }
      }
      // const divID = document.getElementById(
      //   `${column.dst_device_id}#${column.src_device_id}`
      // );
      // console.log(divID);
      // //  if (divID != null && divID != "") {
      // //     var v = document.getElementById(divID);
      // if (divID.style.display == "none") {
      //   divID.style.display = "inline";
      // }
      // // }
    },
    hideColumnDetail(column, divID) {
      if (divID != null && divID != "") {
        var vv = document.getElementById(divID);
        if (vv.style.display == "inline") {
          vv.style.display = "none";
        }
      }
    },
    changeAreaHead(tableAreaData) {
      const obj = {};
      var a = [];

      tableAreaData = tableAreaData.reduce((cur, next) => {
        obj[next.areaName] ? "" : (obj[next.areaName] = true && cur.push(next));
        return cur;
      }, []); //设置cur默认类型为数组，并且初始值为空的数组
      return tableAreaData;
    },
    changeDataHead(tableHeadData) {
      const obj = {};
      var a = [];

      tableHeadData = tableHeadData.reduce((cur, next) => {
        obj[next.srcName] ? "" : (obj[next.srcName] = true && cur.push(next));
        return cur;
      }, []); //设置cur默认类型为数组，并且初始值为空的数组
      return tableHeadData;
    },
    changeDataBody(tableBodyData) {
      var a = [];
      var flag = false;
      tableBodyData.forEach(bodyItem => {
        this.tableHeadData.forEach(item => {
          if (bodyItem.src_device_id !== item.src_device_id && bodyItem.dst_device_id !== item.dst_device_id) {
            flag = true;
          }
        });
        if (flag) {
          a.push(bodyItem);
        }
      });
      return a;
    },
  },
};
</script>
<style lang="scss">
.matrixTable {
  width: 100%;
  padding: 0;
  margin: 0;
  th {
    font-weight: bold;
    font-size: 14px;
    color: #515a6e;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    letter-spacing: 2px;
    padding: 6px 6px 6px 12px;
    background: #f5f5f5 no-repeat;
  }
  td {
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    font-size: 14px;
    padding: 6px 6px 6px 12px;
    color: #4f6b72;
  }
  td.alt {
    background: #f5fafa;
    color: #797268;
  }
  th.spec,
  td.spec {
    border-left: 1px solid #e5e5e5;
  }
  /*---------for IE 5.x bug*/
  html > body td {
    font-size: 14px;
  }
  tr.select th,
  tr.select td {
    background-color: #cae8ea;
    color: #797268;
  }
}
</style>
