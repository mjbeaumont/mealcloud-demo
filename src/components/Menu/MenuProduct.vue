<template>
  <a @click.prevent="add" class="cursor-pointer">
    <div class="border border-white rounded overflow-hidden shadow-lg relative">
      <div class="font-bold text-xl px-6 py-4">{{ product.name }}</div>
      <div class="px-6 py-2">{{ product.description }}</div>
      <div class="font-bold px-6 py-2 text-right">
        {{ product.price | currency }}
      </div>
      <font-awesome-icon
        :icon="['fas', 'check-circle']"
        class="absolute top-0 right-0 mt-4 mr-4 text-xl"
        v-if="inCart"
        title="This product is currently in your bag."
      ></font-awesome-icon>
    </div>
  </a>
</template>

<script>
export default {
  computed: {
    inCart() {
      return this.$store.get("cart/product", this.product.id);
    }
  },
  methods: {
    add() {
      this.$store.set("menu/customizeProduct", {
        productId: this.product.id,
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
