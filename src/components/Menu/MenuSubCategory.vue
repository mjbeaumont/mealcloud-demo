<template>
  <div>
    <h3 class="text-3xl mb-2 font-light font-avenir">
      {{ subcategory.name }}
    </h3>
    <div class="flex flex-row flex-wrap justify-between -mx-2">
      <div
        class="px-2 mb-4 w-full md:w-1/2 lg:w-1/3"
        v-for="product in products"
        :key="product.id"
      >
        <MenuProduct :product="product"></MenuProduct>
      </div>
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

<style scoped></style>
