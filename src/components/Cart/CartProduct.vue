<template>
  <div class="grid w-full product-list">
    <div class="qty-column flex-shrink-0 self-start">{{ product.qty }} x</div>
    <div class="name-column flex-grow">
      <a @click.prevent="edit" class="cursor-pointer">{{ product.name }}</a>
    </div>
    <div class="remove-link">
      <button @click.prevent="remove" tabindex="-1">
        <font-awesome-icon :icon="['fas', 'trash']"></font-awesome-icon>
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
    edit() {
      this.$store.set("cart/open", false);
      this.$store.set("menu/customizeProduct", {
        productId: this.product.productId,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        qty: this.product.qty,
        requests: this.product.requests
      });
    },
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
