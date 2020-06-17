<template>
  <div class="w-full border-b border-gray-700 pb-8">
    <h3 class="text-lg font-bold mb-4">
      Order Summary
      <font-awesome-icon
        :icon="['fas', 'edit']"
        @click="edit"
        class="cursor-pointer"
      ></font-awesome-icon>
    </h3>
    <div class="py-4" v-for="product in products" :key="product.productId">
      <checkout-product :product="product"></checkout-product>
      <div v-if="product.requests" class="pt-2 text-sm text-gray-400">
        "{{ product.requests }}"
      </div>
    </div>
  </div>
</template>
<script>
import CheckoutProduct from "@/components/Checkout/CheckoutProduct";
import { get, sync } from "vuex-pathify";

export default {
  components: { CheckoutProduct },
  computed: {
    activeComponent: sync("activeComponent"),
    products: get("cart/products")
  },
  methods: {
    edit() {
      this.$store.set("cart/open", false);
      this.activeComponent = "OrderMenu";
    }
  },
  name: "CheckoutCart"
};
</script>
