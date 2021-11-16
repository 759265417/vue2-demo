<template>
  <div class="app-container">
    test23
    <el-input v-model="input" placeholder="请输入内容" @change="getInputVal" />
    <el-tree :data="data1" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>

<script>
export default {
  name: "test23",
  data() {
    return {
      input: null,
      data: [
        "test/",
        "test/test1/",
        "test/test1/test1-1/",
        "test/test1/test1-1/test1-1-1/",
        "lsj/",
        "lsj/lsj1",
        "lsj/lsj1/lsj1-1",
        "lsj/lsj2",
        "lsj/lsj2/lsj2-2",
      ],
      data1: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {},
  mounted() {
    this.data1 = this.pathToTree(this.data);
  },
  methods: {
    getInputVal(val) {
      // val = val | null;

      if (this.input !== null) {
        this.input = parseInt(this.input);
      }
      if (isNaN(this.input)) {
        this.input = null;
      }
      console.log(this.input);
    },
    handleNodeClick(item) {
      console.log(item.key);
    },
    pathToTree(input) {
      var output = [];
      for (var i = 0; i < input.length; i++) {
        var chain = input[i].split("/");
        var currentNode = output;
        for (var j = 0; j < chain.length; j++) {
          if (chain[j] === "") {
            break;
          }
          var wantedNode = chain[j];
          var lastNode = currentNode;
          for (var k = 0; k < currentNode.length; k++) {
            if (currentNode[k].title == wantedNode) {
              currentNode = currentNode[k].children;
              break;
            }
          }
          if (wantedNode.indexOf(".") == -1) {
            if (lastNode == currentNode) {
              var newNode = (currentNode[k] = {
                key: input[i],
                title: wantedNode,
                children: [],
              });
              currentNode = newNode.children;
            } else {
              delete currentNode.children;
            }
          }
        }
      }
      return output;
    },
  },
};
</script>
<style></style>
