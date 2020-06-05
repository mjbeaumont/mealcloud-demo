<template>
  <div>
    <h3 class="text-3xl mb-2 font-bold">
      {{ subcategory.name }}
    </h3>
    <div class="flex flex-row flex-wrap justify-between">
      <MenuProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="product-card mb-8 md:mr-4 "
      ></MenuProduct>
    </div>
  </div>
</template>
<script>
import MenuProduct from "@/components/Menu/MenuProduct";
export default {
  components: { MenuProduct },
  computed: {
    products() {
      return this.$store.get("product/categoryProducts", this.subcategory.id);
    }
  },
  name: "MenuSubCategory",
  props: {
    subcategory: Object
  }
};
</script>

<style scoped>
.product-card {
  width: 98%;
}

@media screen and (min-width: 640px) {
  .product-card {
    width: 46%;
  }
}

@media screen and (min-width: 1024px) {
  .product-card {
    width: 31%;
  }
}
</style>
