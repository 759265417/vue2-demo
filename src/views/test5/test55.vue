<template>
  <div style="padding: 20px">
    <button @click="toggleVisible">transition</button>
    <!--方法一-->
    <transition enter-active-class="animate__fadeIn" leave-active-class="animate__fadeOut">
      <h1 v-show="visible" class="animate__animated">Animate.css</h1>
    </transition>
    <!--方法二-->
    <transition
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutLeft"
    >
      <h1 v-show="visible">Animate.css</h1>
    </transition>
    <!--方法三-->
    <transition-group enter-active-class="animate__fadeInRight" leave-active-class="animate__fadeOutRight">
      <h1 v-show="visible" class="animate__animated" :key="1">Animate.css</h1>
      <h2 v-show="visible" class="animate__animated" :key="2">Just-add-water CSS animations</h2>
    </transition-group>
    <el-button @click="isCollapse = !isCollapse">控制横向</el-button>
    <div style="display: flex">
      <div
        class="qwer"
        :style="isCollapse ? `width:200px;transition:width 0.5s ease-in;` : `width:20px;transition:width 0.5s ease-in;`"
        style="background: red; overflow: hidden"
      >
        <div v-if="isCollapse" @click="isCollapse = false" style="word-wrap: break-word">展开</div>
        <div v-if="!isCollapse" @click="isCollapse = true" style="word-wrap: break-word">折叠</div>
      </div>
      <div style="background: green; flex: 1">右侧</div>
    </div>
    <div class="container">
      <button @click="isActive = !isActive">纵向展开/折叠</button>
      <collapse>
        <div class="container" v-show="isActive">
          <h2>欢迎大家品尝Pizza!</h2>
          <h5>这里有你非常喜欢的Pizza!</h5>
        </div>
      </collapse>
    </div>
    <transition-group tag="div" class="container">
      <div
        class="item"
        v-for="(item, index) in items"
        :key="item.key"
        :style="{ background: item.color, width: '80px', height: '80px' }"
        draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragover.prevent="handleDragOver($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragend="handleDragEnd($event, item)"
      ></div> </transition-group
    >　　
    <el-select v-model="value" multiple filterable allow-create default-first-option @visible-change="change">
      <el-option-group v-for="group in options" :key="group.label" :label="group.label">
        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-option-group>
    </el-select>
    <el-button @click="showVal">anniu</el-button>
    <div>
      <el-select v-model="valueTest" placeholder="请选择">
        <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px"
            ><i class="el-icon-circle-close" @click="deleteItem(item, $event)"></i
          ></span>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import collapse from "./collapse.js";
export default {
  name: "course-progress",
  components: {
    collapse,
  },
  data() {
    return {
      visible: false,
      isCollapse: false,
      collapse: {
        width: "",
      },
      isActive: false,
      items: [
        { key: 1, color: "green" },
        { key: 2, color: "red" },
        { key: 3, color: "yellow" },
      ],

      dragging: null,
      options: [
        {
          label: "热门城市",
          options: [{ label: "热门城市" }],
        },
        {
          label: "城市名",
          options: [
            {
              value: "Chengdu",
              label: "成都",
            },
            {
              value: "Shenzhen",
              label: "深圳",
            },
            {
              value: "Guangzhou",
              label: "广州",
            },
            {
              value: "Dalian",
              label: "大连",
            },
          ],
        },
      ],
      value: [],
      optionsDeep: [],
      cities: [
        {
          value: "Beijing",
          label: "北京",
          id: 1,
          src_list: [1, 2],
          dst_list: [2, 3],
        },
        {
          value: "Shanghai",
          label: "上海",
          id: 2,
          src_list: [1, 2],
          dst_list: [2, 3],
        },
        {
          value: "Nanjing",
          label: "南京",
          id: 3,
          src_list: [1, 2],
          dst_list: [2, 3],
        },
        {
          value: "Chengdu",
          label: "成都",
          id: 4,
          src_list: [1, 2],
          dst_list: [2, 3],
        },
        {
          value: "Shenzhen",
          label: "深圳",
          id: 5,
          src_list: [1, 2],
          dst_list: [2, 3],
        },
        {
          value: "Guangzhou",
          label: "广州",
          id: 6,
          src_list: [1, 2],
          dst_list: [2, 3],
        },
      ],
      valueTest: "",
    };
  },
  mounted() {
    this.optionsDeep = [
      {
        label: "热门城市",
        options: [
          {
            value: "Chengdu",
            label: "成都",
          },
        ],
      },
      {
        label: "城市名",
        options: [
          {
            value: "Chengdu",
            label: "成都",
          },
          {
            value: "Shenzhen",
            label: "深圳",
          },
          {
            value: "Guangzhou",
            label: "广州",
          },
          {
            value: "Dalian",
            label: "大连",
          },
        ],
      },
    ];
    // this.optionsDeep = Object.freeze(this.options);
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
    },
    handleDragStart(e, item) {
      this.dragging = item;
    },
    handleDragEnd(e, item) {
      this.dragging = null;
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = "move"; //为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return;
      }
      const newItems = [...this.items];

      const src = newItems.indexOf(this.dragging);
      const dst = newItems.indexOf(item);
      console.log(src, "srcsrcsrcsrc");
      console.log(newItems);
      console.log(dst, "dstttt");
      // console.error(...newItems.splice(src, 1));
      newItems.splice(dst, 0, ...newItems.splice(src, 1));

      this.items = newItems;
    },
    deleteItem(item, e) {
      e.stopPropagation();
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(item);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    change(boo) {
      if (boo) {
        this.options.forEach(item => {
          // console.log(item);
          if (item.label === "热门城市") {
            item.options = [];
            console.log(item.options);
          }
        });
      } else {
        this.options = [
          {
            label: "热门城市",
            options: [
              {
                value: "Chengdu",
                label: "成都",
              },
            ],
          },
          {
            label: "城市名",
            options: [
              {
                value: "Chengdu",
                label: "成都",
              },
              {
                value: "Shenzhen",
                label: "深圳",
              },
              {
                value: "Guangzhou",
                label: "广州",
              },
              {
                value: "Dalian",
                label: "大连",
              },
            ],
          },
        ];
      }
    },
    showVal() {
      console.log(this.value);
    },
  },
};
</script>

<style scoped>
.qwer-enter {
  opacity: 0;
  transform: translateX(100%);
}
.qwer-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.qwer-enter-active,
.qwer-leave-active {
  transition: all 0.3s ease;
}
</style>
