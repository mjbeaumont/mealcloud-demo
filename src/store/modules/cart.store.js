import { make } from "vuex-pathify";

const state = () => {
  return {
    open: true,
    products: []
  };
};

const getters = {};

const mutations = {
  ...make.mutations(state),
  SET_PRODUCT(state, { product, index }) {
    if (index) {
      state.products[index] = product;
    } else {
      state.products.push(product);
    }
  },
  REMOVE_PRODUCT(state, index) {
    state.products.splice(index, 1);
  }
};

const actions = {
  setProduct({ state, commit }, productToAdd) {
    const existingIndex = state.products.findIndex(
      product => product.cartId === productToAdd.cartId
    );
    commit("SET_PRODUCT", { product: productToAdd, index: existingIndex });
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
