<template
  ><Dialog
    :modal="true"
    :visible.sync="open"
    class="cart w-full bg-white rounded-sm text-black p-4 pb-8 max-w-sm h-screen m-0"
    position="topright"
  >
    <div v-if="false" class="pt-24">
      <span class="font-bold text-gray-400 text-3xl mx-auto block text-center"
        >Your bag is empty</span
      >
    </div>
    <div class="pt-16" v-if="true">
      <div class="font-bold text-2xl text-black pb-8">Your Order</div>
      <div class="border-b border-gray-400 pb-4">
        <div class="grid w-full product-list">
          <div class="qty-column flex-shrink-0 self-start">1 x</div>
          <div class="name-column flex-grow">Product Name</div>
          <div class="remove-link">
            <button class="text-green-400 font-bold">Remove</button>
          </div>
          <div class="price-column self-start flex-shrink-0">
            {{ 40 | currency }}
          </div>
        </div>
      </div>
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

<style scoped>
.product-list {
  grid-template-rows: auto auto auto;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 20px;
}

.qty-column {
  grid-row: 2 / auto;
  grid-column: 1 / auto;
}

.name-column {
  flex-basis: 100%;
  grid-row: 2 / auto;
  grid-column: 2 / auto;
}

.remove-link {
  grid-area: 3 / 2 / auto / auto;
}

.price-column {
  grid-row: 2 / auto;
  grid-column: 3 / auto;
}

.border-row {
  grid-column-start: 1;
  grid-column-end: -1;
  margin-right: -16px;
  margin-left: 0px;
  margin-bottom: -16px;
  margin-top: 15px;
  grid-row: -1 / auto;
}
</style>
