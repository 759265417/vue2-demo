import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import app from "./modules/app";
import select from "./modules/select";
import getters from "./getters";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    select,
  },
  getters,
});

export default store;
