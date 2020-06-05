<template>
  <div class>
    <h2 class="text-4xl font-bold border-b-4 border-green-400 uppercase mb-4">
      {{ category.name }}
    </h2>
    <MenuSubCategory
      v-for="subcategory in subcategories"
      :key="subcategory.id"
      :subcategory="subcategory"
      class="mb-4"
    />
  </div>
</template>

<script>
import MenuSubCategory from "./MenuSubCategory";

export default {
  components: { MenuSubCategory },
  computed: {
    subcategories() {
      return this.$store.get("category/subCategories", this.category.id);
    }
  },
  name: "MenuCategory",
  props: {
    category: Object
  }
};
</script>
