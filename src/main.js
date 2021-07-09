import Vue from "vue";
import "@/mock";
import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import Element from "element-ui";
import "@/styles/index.scss"; // global css
import "@/assets/custom-theme/index.css";
import i18n from "./i18n/i18n";
import App from "./App";
import store from "./store";
import router from "./router";
import config from "@/config";
import animated from "animate.css";
import "./icons"; // icon
import "../theme/index.css";
// import moreTreeTable from "more-tree-table";
if (process.env.NODE_ENV !== "production") require("@/mock");

Vue.use(Element, {
  // moreTreeTable,
  size: Cookies.get("size") || "medium", // set element-ui default size
});
Vue.config.productionTip = false;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
Vue.use(animated);
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App),
});
