import { make } from "vuex-pathify";

const state = () => {
  return {
    type: ""
  };
};

const getters = {};

const mutations = make.mutations(state);

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};