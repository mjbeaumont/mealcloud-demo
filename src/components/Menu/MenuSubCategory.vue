<template>
  <div>
    <h3 class="text-3xl mb-2">
      {{ subcategory.name }}
    </h3>
    <div class="flex flex-row flex-wrap justify-between">
      <MenuProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="product-card mr-4 mb-8"
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
  width: 32%;
}
</style>
