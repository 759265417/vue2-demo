import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
const select = {
  state: {
    selectVal: "",
  },
  actions: {},
  mutations: {
    changeSelceValMutation(state, payload) {
      state.selectVal = payload;
    },
  },
};

export default select;
