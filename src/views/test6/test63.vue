<template>
  <el-tree
    :data="data"
    node-key="id"
    :expand-on-click-node="false"
    default-expand-all
    highlight-current
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    draggable
  >
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span class="custom-tree-node-names">
        {{ node.label }}
      </span>
    </span>
  </el-tree>
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
          folderId: "fo-1",
          children: [
            {
              fileId: "fi-1",
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  imgId: "im-1",
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
          folderId: "fo-2",
          children: [
            {
              fileId: "fi-2",
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
          folderId: "fo-3",
          children: [
            {
              fileId: "fo-3",
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              fileId: "fo-4",
              label: "二级 3-2",
              children: [
                {
                  imgId: "fo-3",
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
    };
  },
  methods: {
    allowDrop(moveNode, inNode, type) {
      if (inNode.data.fileId) {
        // this.removeload()
        return type === "inner";
      }
    },
    // 节点能否被拖拽
    allowDrag(draggingNode) {
      if (draggingNode.data.imgId) {
        return draggingNode;
      }
    },
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
