<template>
  <div>
    <h3
      v-for="subcategory in subcategories"
      :key="subcategory.id"
      class="text-3xl mb-4"
    >
      {{ subcategory.name }}
    </h3>
  </div>
</template>
<script>
export default {
  name: "MenuSubCategory",
  props: {
    subcategories: Array
  }
};
</script>
