<template>
  <div class="grid w-full product-list">
    <div class="qty-column flex-shrink-0 self-start">{{ product.qty }} x</div>
    <div class="name-column flex-grow">{{ product.name }}</div>
    <div class="remove-link">
      <button class="text-green-400 font-bold" @click.prevent="remove">
        Remove
      </button>
    </div>
    <div class="price-column self-start flex-shrink-0">
      {{ subtotal | currency }}
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    subtotal() {
      return this.product.qty * this.product.price;
    }
  },
  methods: {
    remove() {
      this.$store.set("cart/removeProduct!", this.product.productId);
    }
  },
  name: "CartProduct",
  props: {
    product: Object
  }
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
</style>
