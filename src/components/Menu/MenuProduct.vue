<template>
  <a @click.prevent="add" class="cursor-pointer">
    <div
      class="bg-no-repeat bg-cover bg-center border border-white rounded overflow-hidden shadow-lg relative menu-item"
    >
      <div class="h-full w-full transition-opacity duration-200 menu-overlay">
        <div class="z-10 text-white text-opacity-100">
          <div class="font-bold text-xl px-6 py-4">{{ product.name }}</div>
          <div class="px-6 py-2">
            {{ product.description }}
          </div>
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
      </div>
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

<style scoped>
.menu-item {
  background-image: url("~@/assets/meal.jpg");
  position: relative;
}

.menu-overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>
