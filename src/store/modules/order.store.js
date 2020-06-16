import { make } from "vuex-pathify";

const state = () => {
  return {
    type: "",
    location: {},
    dateTime: null,
    name: "",
    email: "",
    phone: "",
    instructions: "",
    gratuityRate: 10
  };
};

const getters = {
  tax(state, getters, rootState, rootGetters) {
    if (state.location.taxRate > 0) {
      return rootGetters["cart/subtotal"] * (state.location.taxRate / 100);
    }
    return 0;
  },
  gratuity(state, getters, rootState, rootGetters) {
    if (state.gratuityRate > 0) {
      return rootGetters["cart/subtotal"] * (state.gratuityRate / 100);
    }
    return 0;
  },
  total(state, getters, rootState, rootGetters) {
    return rootGetters["cart/subtotal"] + getters.gratuity + getters.tax;
  }
};

const mutations = make.mutations(state);

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
