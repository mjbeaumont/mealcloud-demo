import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";

Vue.use(Vuex);

const state = () => {
  return {
    loading: false,
    activeComponent: ""
  };
};

const mutations = make.mutations(state);

export default new Vuex.Store({
  state,
  mutations,
  modules: {},
  strict: process.env.NODE_ENV !== "production",
  plugins: [pathify.plugin]
});
