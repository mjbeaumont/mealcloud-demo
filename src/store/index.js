import Vue from "vue";
import Vuex from "vuex";
import pathify, { make } from "vuex-pathify";
import order from "./modules/order";
import category from "./modules/category";
import product from "./modules/product";
import menu from "./modules/menu";

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
  modules: {
    category,
    order,
    product,
    menu
  },
  strict: process.env.NODE_ENV !== "production",
  plugins: [pathify.plugin]
});
