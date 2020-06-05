<template
  ><div class="flex">
    <button class="mc-input mc-input-light md:text-2xl w-40 mx-2 py-2">
      All
    </button>
    <button
      v-for="category in categories"
      :key="category.id"
      class="mc-input mc-input-light md:text-2xl w-40 mx-2 py-2"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: "MenuNav",
  props: {
    categories: Array
  }
};
</script>

<style scoped></style>
