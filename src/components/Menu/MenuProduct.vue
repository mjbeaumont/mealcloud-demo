<template>
  <a @click.prevent="add" class="cursor-pointer">
    <div class="border border-white rounded overflow-hidden shadow-lg">
      <div class="font-bold text-xl px-6 py-4">{{ product.name }}</div>
      <div class="px-6 py-2">{{ product.description }}</div>
      <div class="font-bold px-6 py-2 text-right">{{ product.price }}</div>
    </div>
  </a>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.set("menu/customizeProduct", {
        productId: this.product.id,
        cartId: null,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        qty: 1,
        requests: ""
      });
    }
  },
  name: "MenuProduct",
  props: {
    product: Object
  }
};
</script>

<style scoped></style>
