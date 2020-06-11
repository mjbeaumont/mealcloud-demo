import { make } from "vuex-pathify";
import Vue from "vue";

const state = () => {
  return {
    open: false,
    tip: 0.1,
    products: []
  };
};

const getters = {
  countProducts(state) {
    return state.products.reduce((carry, product) => carry + product.qty, 0);
  },
  product: state => id => {
    return state.products.find(product => id === product.productId);
  },
  subtotal(state) {
    let subtotal = state.products.reduce(
      (carry, product) => carry + product.price * product.qty,
      0
    );
    subtotal += subtotal * state.tip;
    return subtotal;
  }
};

const mutations = {
  ...make.mutations(state),
  SET_PRODUCT(state, { product, index }) {
    if (-1 !== index) {
      Vue.set(state.products, index, product);
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
  },
  removeProduct({ state, commit }, id) {
    const idx = state.products.findIndex(product => product.productId === id);
    commit("REMOVE_PRODUCT", idx);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
