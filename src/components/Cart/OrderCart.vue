<template
  ><Dialog
    :modal="true"
    :visible.sync="open"
    class="w-full bg-white rounded-sm text-black p-4 pb-8 max-w-sm h-screen"
    position="topright"
  >
    <div v-if="!products.length" class="pt-24">
      <span class="font-bold text-gray-400 text-3xl mx-auto block text-center"
        >Your bag is empty</span
      >
    </div>
    <font-awesome-icon
      :icon="['fas', 'times']"
      class="text-2xl absolute top-0 right-0 mt-4 mr-4"
      @click="close"
    ></font-awesome-icon> </Dialog
></template>

<script>
import { get, sync } from "vuex-pathify";
import Dialog from "primevue/dialog";
export default {
  components: { Dialog },
  computed: {
    open: sync("cart/open"),
    products: get("cart/products")
  },
  methods: {
    close() {
      this.open = false;
    }
  },
  name: "OrderCart"
};
</script>

<style scoped></style>
