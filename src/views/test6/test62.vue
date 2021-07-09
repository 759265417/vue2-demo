<template>
  <div class="tree-drag">
    <!-- <el-tree
      :data="treeData1"
      ref="tree1"
      class="tree"
      node-key="id"
      draggable
      default-expand-all
      :allow-drop="returnFalse"
      @node-drag-start="handleDragstart"
      @node-drag-end="handleDragend"
    ></el-tree> -->

    <!-- <el-tree
      :data="treeData2"
      ref="tree2"
      class="tree"
      node-key="id"
      draggable
      default-expand-all
      :allow-drop="returnTrue"
    ></el-tree> -->
    <div style="width: 600px; height: 600px; margin: 100px; border: 1px solid #ccc">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        @node-drag-start="handleDragStart"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello-world",
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
              children: [
                {
                  id: 11,
                  label: "三级 3-2-1",
                },
                {
                  id: 12,
                  label: "三级 3-2-2",
                },
                {
                  id: 13,
                  label: "三级 3-2-3",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // treeData1: [
      //   {
      //     id: 1,
      //     label: "一级 1",
      //     children: [
      //       {
      //         id: 4,
      //         label: "二级 1-1",
      //         children: [{ id: 9, label: "三级 1-1-1" }]
      //       }
      //     ]
      //   }
      // ],
      // treeData2: [
      //   {
      //     id: 2,
      //     label: "一级 1",
      //     children: [
      //       {
      //         id: 5,
      //         label: "二级 1-1",
      //         children: [{ id: 8, label: "三级 1-1-1" }]
      //       }
      //     ]
      //   }
      // ]
    };
  },
  methods: {
    // handleDragEnter(draggingNode, dropNode, ev) {
    //   console.log("tree drag enter: ", dropNode.label);
    // },
    // handleDragLeave(draggingNode, dropNode, ev) {
    //   console.log("tree drag leave: ", dropNode.label);
    // },
    // handleDragOver(draggingNode, dropNode, ev) {
    //   console.log("tree drag over: ", dropNode.label);
    // },
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    handleDragstart(node, event) {
      this.$refs.tree2.$emit("tree-node-drag-start", event, { node: node });
    },
    handleDragend(draggingNode, endNode, position, event) {
      // 插入一个空节点用于占位
      const emptyData = { id: +new Date(), children: [] };
      this.$refs.tree1.insertBefore(emptyData, draggingNode);

      this.$refs.tree2.$emit("tree-node-drag-end", event);
      this.$nextTick(() => {
        // 如果是移动到了当前树上，需要清掉空节点
        if (this.$refs.tree1.getNode(draggingNode.data)) {
          this.$refs.tree1.remove(emptyData);
        } else {
          // 如果移动到了别的树上，需要恢复该节点，并清掉空节点
          const data = JSON.parse(JSON.stringify(draggingNode.data));
          this.$refs.tree1.insertAfter(data, this.$refs.tree1.getNode(emptyData));
          this.$refs.tree1.remove(emptyData);
        }
      });
    },
    // returnTrue() {
    //   return true;
    // },
    // returnFalse() {
    //   return false;
    // }
  },
};
</script>

<style scoped>
.tree {
  display: inline-block;
  vertical-align: top;
  width: 30%;
  height: 400px;
  border: 1px solid #999;
}
</style>
