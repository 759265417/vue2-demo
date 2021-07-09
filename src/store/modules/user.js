/* eslint-disable */
import menus from "@/router/menus";
import routers from "@/router/router";
import { login, logout, getUserInfo } from "@/api/user";
import { setToken, getToken } from "@/utils/util";
import avatar from "@/assets/img/logo.png";
const cloneMenu = function (newMenus, { path, name, meta, component, children }) {
  const obj = { path, name, meta, component };
  newMenus.push(obj);
  if (children && children.forEach) {
    obj.children = [];
    children.forEach(function (child) {
      cloneMenu(obj.children, child);
    });
  }
};

const cloneMenus = function (menus) {
  const newMenus = [];
  menus.forEach(function (menu) {
    cloneMenu(newMenus, menu);
  });
  return newMenus;
};
const filterMenu = function (menu, targets) {
  if (menu.children) {
    for (let i = 0; i < menu.children.length; i++) {
      const remain = filterMenu(menu.children[i], targets);
      if (remain === false) {
        menu.children.splice(i, 1);
        i--;
      }
    }
    if (menu.children.length === 0) {
      return false;
    }
  } else if (!targets || targets.indexOf(menu.name) == -1) {
    return false;
  }
};
const filterMenus = function (menus, targets) {
  for (let i = 0; i < menus.length; i++) {
    const remain = filterMenu(menus[i], targets);
    if (remain === false) {
      menus.splice(i, 1);
      i--;
    }
  }
  return menus;
};
const state = {
  username: "",
  userId: "",
  avatarImgPath: "",
  token: getToken(),
  access: "",
  hasGetInfo: false,
  permission: routers,
};

const mutations = {
  setAvatar(state, avatarPath) {
    state.avatarImgPath = avatarPath;
  },
  setUserId(state, id) {
    state.userId = id;
  },
  setUserName(state, name) {
    state.username = name;
  },
  setAccess(state, access) {
    state.access = access;
  },
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  setHasGetInfo(state, status) {
    state.hasGetInfo = status;
  },
  setPermission(state, { name, permission }) {
    if (name == "admin") {
      state.permission = routers.concat(menus);
    } else {
      const newMenus = cloneMenus(menus);
      const filteredMenus = filterMenus(newMenus, permission);
      state.permission = routers.concat(filteredMenus);
    }
  },
};

const actions = {
  // 登录
  handleLogin({ commit }, data) {
    // username = username.trim()
    const { username, password } = data;
    return new Promise((resolve, reject) => {
      login({
        username,
        password,
      })
        .then(res => {
          const data = res.data;
          commit("setToken", data.token);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // 退出登录
  handleLogOut({ state, commit }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("setToken", "");
          commit("setAccess", []);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
      // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
      // commit('setToken', '')
      // commit('setAccess', [])
      // resolve()
    });
  },
  setPermission({ commit }, permission) {
    commit("setPermission", permission);
  },
  // 获取用户相关信息
  getUserInfo({ state, commit }) {
    return new Promise((resolve, reject) => {
      try {
        getUserInfo(state.token)
          .then(res => {
            const data = res.data;
            commit("setAvatar", avatar);
            commit("setUserName", data.name);
            commit("setUserId", data.user_id);
            commit("setAccess", data.access || []);
            commit("setHasGetInfo", true);
            commit("setPermission", data);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
