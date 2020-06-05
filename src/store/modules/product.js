import { make } from "vuex-pathify";

const state = () => {
  return {
    products: []
  };
};

const getters = {
  categoryProducts: state => categoryId => {
    return state.products.filter(product => product.category === categoryId);
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
