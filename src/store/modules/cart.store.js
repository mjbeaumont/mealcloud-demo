import { make } from "vuex-pathify";

const state = () => {
  return {
    open: false,
    products: []
  };
};

const getters = {
  countProducts(state) {
    return state.products.length;
  },
  product: state => id => {
    return state.products.find(product => id === product.productId);
  }
};

const mutations = {
  ...make.mutations(state),
  SET_PRODUCT(state, { product, index }) {
    if (-1 !== index) {
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
      product => product.productId === productToAdd.productId
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
