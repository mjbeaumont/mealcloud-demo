<template>
  <div class>
    <h2 class="text-4xl font-bold border-b-4 border-green-400 uppercase">
      {{ category.name }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "MenuCategory",
  props: {
    category: Object
  }
};
</script>

<style scoped></style>
