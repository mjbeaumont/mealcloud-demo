import { make } from "vuex-pathify";

const state = () => {
  return {
    categories: []
  };
};

const getters = {
  parentCategories: state => {
    return state.categories.filter(category => category.parent === 0);
  },
  subCategories: state => parentId => {
    return state.categories.filter(category => category.id === parentId);
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
