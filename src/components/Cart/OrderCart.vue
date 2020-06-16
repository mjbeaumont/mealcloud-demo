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
        class="bg-primary hover:bg-secondary transition-colors duration-200 px-8 py-2 text-white text-xl rounded mt-8 font-bold block"
        tabindex="-1"
        @click.prevent="checkout"
      >
        Checkout - {{ subtotal | currency }}
      </button>
      <label class="inline-block text-xl mt-8">Gratuity:</label>
      <Dropdown
        v-model="tip"
        :options="tipOptions"
        optionLabel="name"
        optionValue="code"
        class="inline-block border border-black ml-4 py-2 pl-2 tip"
      ></Dropdown>
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
import Dropdown from "primevue/dropdown";

export default {
  components: { CartProduct, Dialog, Dropdown },
  computed: {
    open: sync("cart/open"),
    products: get("cart/products"),
    subtotal: get("cart/subtotal"),
    tip: sync("cart/tip"),
    activeComponent: sync("activeComponent")
  },
  data() {
    return {
      tipOptions: [
        { name: "5%", code: 0.05 },
        { name: "10%", code: 0.1 },
        { name: "15%", code: 0.15 },
        { name: "20%", code: 0.2 },
        { name: "25%", code: 0.25 }
      ]
    };
  },
  methods: {
    checkout() {
      this.activeComponent = "OrderCheckout";
    },
    close() {
      this.open = false;
    }
  },
  name: "OrderCart"
};
</script>

<style>
.p-dropdown .p-dropdown-trigger {
  padding-right: 6px;
}
.p-dropdown-items {
  padding-left: 6px;
  border: 1px solid #000;
}
.p-dialog-content {
  height: 100vh;
}
</style>
