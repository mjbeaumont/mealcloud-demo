<template> <ProgressSpinner v-if="loading"></ProgressSpinner></template>

<script>
import { get } from "vuex-pathify";
import ProgressSpinner from "primevue/progressspinner";
export default {
  components: {
    ProgressSpinner
  },
  computed: {
    loading: get("loading")
  },
  name: "MCLoading"
};
</script>

<style scoped></style>
