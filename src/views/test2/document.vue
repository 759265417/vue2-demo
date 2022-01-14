<template>
  <div>
    <div class="main">
      <div class="left">
        <iframe :src="pdfSrc" class="pdf-outer" ref="iframe" id="pdfIframe">
          <p>123123123</p>
        </iframe>
      </div>
      <div class="right">
        <div class="commit-outer">
          <div class="commit-item" v-for="(item, index) in commitList" :key="index" @click="turnToPdfPage(item)">
            <div class="header">page:{{ item.page + 1 }}</div>
            <div class="select-text">text:{{ item.text }}</div>
            <div class="user">User: Orbit</div>
            <div class="commit">
              <el-input v-model="commitList[index].commit" placeholder="" size="mini"></el-input>
              <el-button type="primary" size="mini" @click="commitConfirm(item, index)" style="margin-left: 10px"
                >commit</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      frameDivList: [], // 画框 div 数组
      txtTop: "",
      commitList: [], // 选择文字 数组
      pdfSrc: "http://localhost:9001/web/viewer.html?#page=1",
    };
  },
  mounted() {
    this.commitList = JSON.parse(localStorage.getItem("commit-arr"));
    if (!this.commitList) {
      this.commitList = [];
    }

    this.frameDivList = JSON.parse(localStorage.getItem("frame-arr"));
    if (!this.frameDivList) {
      this.frameDivList = [];
    }

    window.addEventListener("message", this.handleMessage);

    setTimeout(() => {
      this.iframeWin = this.$refs.iframe.contentWindow;
      let params = [];
      this.commitList.forEach(item => {
        params.push({ page: item.page, coords: item.coords, text: item.text, text_uuid: item.text_uuid });
      });
      this.iframeWin.postMessage(
        {
          params,
          frameDivList: this.frameDivList,
        },
        "*"
      );
    }, 1000);
  },
  destroyed() {
    // 注意移除监听！注意移除监听！注意移除监听！
    window.removeEventListener("message", this.handleMessage);
  },

  methods: {
    turnToPdfPage(item) {
      //document.getElementsByClassName(item.text_uuid)
      // var x = document.getElementById("pdfIframe").contentWindow.document.getElementById("outerContainer");

      setTimeout(() => {
        console.log(item.page, "item.page");
        // this.pdfSrc = `http://localhost:9001/web/viewer.html?file=https://orbit-common-resources.s3.us-west-2.amazonaws.com/agtak8u3kkhmete7d93dme67pgyd6gmv.pdf#page=${
        //   item.page + 1
        // }`;
        this.pdfSrc = `http://localhost:9001/web/viewer.html?#page=${item.page + 1}`;
      }, 500);
    },
    handleMessage(event) {
      // alert(event, "eventevent");
      // 根据上面制定的结构来解析 iframe 内部发回来的数据
      // 点击 commit 时候 接受 pdf.js 消息

      // 只有 commit 的时候 像 数据库 发送请求, 其他时候 可以走 vue或 local storage 缓存
      const data = event.data;
      console.log(data, "vue 接受 到 pdf.js 消息");
      const { globalCord, globalSelectText, globalUUid, pageNumber, frameDiv } = data;
      if (pageNumber) {
        this.iframeWin = this.$refs.iframe.contentWindow;
        this.iframeWin.postMessage(
          {
            pageNumber: pageNumber,
          },
          "*"
        );
      }
      if (frameDiv) {
        console.error(frameDiv, "frameDivframeDivframeDiv");
        this.frameDivList.push(frameDiv);
        localStorage.setItem("frame-arr", JSON.stringify(this.frameDivList));
      }
      if (globalUUid) {
        this.commitList.push({
          page: globalCord.page,
          coords: globalCord.coords,
          text: globalSelectText,
          text_uuid: globalUUid,
        });
        localStorage.setItem("commit-arr", JSON.stringify(this.commitList));

        this.iframeWin.postMessage(
          {
            params: this.commitList,
          },
          "*"
        );
      }
      // if (txtTop) {
      //   this.txtTop = ~~parseInt(txtTop.replace("px", ""));
      // }
    },
    commitConfirm() {
      localStorage.setItem("commit-arr", JSON.stringify(this.commitList));
    },
  },
};
</script>
<style lang="scss">
.main {
  display: flex;
  .left {
    width: 850px;
    .pdf-outer {
      width: 100%;
      height: 800px;
    }
  }
  .right {
    padding: 10px;
    height: 700px;
    overflow: auto;
    flex: 1;
    .commit-outer {
      .commit-item {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        padding: 10px;
        cursor: pointer;
        .header {
          margin: 5px;
        }
        .select-text {
          margin: 5px;
        }
        .user {
          margin: 5px;
        }
        .commit {
          margin-top: 5px;
          display: flex;
        }
      }
    }
  }
}
</style>
