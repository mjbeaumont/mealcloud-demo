<template>
  <div class>
    <h2 class="text-4xl font-bold border-b-4 border-green-400 uppercase mb-4">
      {{ category.name }}
    </h2>
    <h3
      v-for="subcategory in subcategories"
      :key="subcategory.id"
      class="text-3xl"
    >
      {{ subcategory.name }}
    </h3>
  </div>
</template>

<script>
export default {
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

<style scoped></style>
