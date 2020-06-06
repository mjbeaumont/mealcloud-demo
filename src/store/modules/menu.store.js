import { make } from "vuex-pathify";

const defaultProduct = {
  productId: null,
  name: "",
  description: "",
  qty: 1,
  price: 0,
  requests: ""
};

const state = () => {
  return {
    customizing: false,
    product: defaultProduct
  };
};

const getters = {};

const mutations = make.mutations(state);

const actions = {
  setCustomizeProduct({ commit }, product) {
    commit("SET_PRODUCT", product);
    commit("SET_CUSTOMIZING", true);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
