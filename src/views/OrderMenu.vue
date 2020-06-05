<template>
  <div class="mx-auto px-16 flex flex-col min-h-screen">
    <MenuHeader class="mb-8"></MenuHeader>
    <MenuNav :categories="parentCategories" class="mb-12 mx-auto"></MenuNav>
    <div class="flex flex-col items-start">
      <MenuCategory
        v-for="category in parentCategories"
        :key="category.id"
        :category="category"
        class="mb-16"
      ></MenuCategory>
    </div>
  </div>
</template>

<script>
import { get } from "vuex-pathify";
import BackToTop from "@/mixins/BackToTop";
import MenuHeader from "@/components/Menu/MenuHeader";
import MenuNav from "@/components/Menu/MenuNav";
import MenuCategory from "@/components/Menu/MenuCategory";

export default {
  components: { MenuHeader, MenuNav, MenuCategory },
  computed: {
    parentCategories: get("category/parentCategories")
  },
  mixins: [BackToTop],
  name: "OrderMenu"
};
</script>

<style scoped></style>
