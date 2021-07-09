<template>
  <div>
    <tree-table :data="data" :columns="columns" :expandAll="true" border @getCheckedRow="getCheckedRow" />
  </div>
</template>

<script>
import treeTable from "../../components/TreeTable";

export default {
  name: "course-progress",
  components: {
    treeTable,
  },
  data() {
    return {
      rowArrList: [],
      columns: [
        {
          text: "事件",
          value: "event",
          width: 500,
        },
        {
          text: "ID",
          value: "id",
        },
      ],
      data: [
        {
          id: 0,
          event: "区域1",
          child: [
            {
              id: 1,
              event: "设备11",
            },
            {
              id: 2,
              event: "设备12",
            },
          ],
        },

        {
          id: 1,
          event: "区域2",
          child: [
            {
              id: 3,
              event: "设备21",
            },
            {
              id: 4,
              event: "设备22",
            },
          ],
        },
      ],
    };
  },
  methods: {
    getCheckedRow(arr) {
      this.rowArrList = arr;
      console.log(arr, "父组件拿到 点击行数组");
    },
  },
};
</script>

<style scoped></style>
