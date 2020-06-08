<template
  ><Dialog
    :modal="true"
    :visible.sync="open"
    class="cart w-full bg-white rounded-sm text-black p-4 pb-8 max-w-sm h-screen m-0"
    position="topright"
  >
    <div v-if="!products.length" class="pt-24">
      <span class="font-bold text-gray-400 text-3xl mx-auto block text-center"
        >Your bag is empty</span
      >
    </div>
    <div class="pt-16" v-if="products.length">
      <div class="font-bold text-2xl text-black pb-6">Your Order</div>
      <div
        class="border-b border-gray-400 py-4"
        v-for="product in products"
        :key="product.productId"
      >
        <CartProduct :product="product" />
        <div v-if="product.requests" class="pt-2 text-sm text-gray-700">
          "{{ product.requests }}"
        </div>
      </div>
      <button
        class="bg-primary px-8 py-2 text-white text-xl rounded mt-8 font-bold"
      >
        Checkout - {{ subtotal | currency }}
      </button>
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
import CartProduct from "./CartProduct";

export default {
  components: { CartProduct, Dialog },
  computed: {
    open: sync("cart/open"),
    products: get("cart/products"),
    subtotal: get("cart/subtotal")
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
