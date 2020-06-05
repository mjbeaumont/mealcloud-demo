<template>
  <div class="mx-auto px-16 flex flex-col items-center min-h-screen">
    <MenuHeader class="mb-8"></MenuHeader>
    <MenuNav :categories="parentCategories"></MenuNav>
  </div>
</template>

<script>
import BackToTop from "@/mixins/BackToTop";
import MenuHeader from "@/components/Menu/MenuHeader";
import MenuNav from "@/components/Menu/MenuNav";
import categories from "@/data/categories";
export default {
  components: { MenuHeader, MenuNav },
  computed: {
    parentCategories() {
      return this.categories.filter(category => category.parent === 0);
    }
  },
  data() {
    return {
      categories: categories
    };
  },
  mixins: [BackToTop],
  name: "OrderMenu"
};
</script>

<style scoped></style>
