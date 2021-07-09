import Vue from "vue";
import Router from "vue-router";
import routes from "./router";
import menus from "./menus";
import store from "@/store";
import { setToken, getToken, canTurnTo, setTitle } from "@/utils/util";
import config from "@/config";
const { homeName } = config;
Vue.use(Router);
const allMenus = routes.concat(menus);
const router = new Router({
  routes: allMenus,
  mode: "history",
});
const LOGIN_PAGE_NAME = "login";

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, store.state.user.permission)) next();
  // 有权限，可访问
  else {
    // this.$message('这是一条消息提示')
    next({ replace: true, name: "404" }); // 无权限，重定向到401页面
  }
};

router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME, // 跳转到登录页
    });
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next(); // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName, // 跳转到homeName页
    });
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next);
    } else {
      store
        .dispatch("user/getUserInfo")
        .then(user => {
          // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['editor'] ['editor', 'admin']
          if (user) {
            turnTo(to, user.access, next);
          } else {
            setToken("");
            next({
              name: "login",
            });
          }
        })
        .catch(() => {
          setToken("");
          next({
            name: "login",
          });
        });
    }
  }
});

router.afterEach(to => {
  setTitle(to, router.app);
  window.scrollTo(0, 0);
});
export default router;
