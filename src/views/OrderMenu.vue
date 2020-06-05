<template>
  <div class="mx-auto px-0 lg:px-16 min-h-screen">
    <MenuHeader class="mb-8"></MenuHeader>
    <div class="flex mb-12 justify-center">
      <button
        v-for="category in parentCategories"
        :key="category.id"
        :category="category"
        class="mc-input mc-input-light md:text-2xl w-40 mx-2 py-2"
        @click="nav(category.id)"
      >
        {{ category.name }}
      </button>
    </div>

    <div>
      <MenuCategory
        v-for="category in parentCategories"
        :key="category.id"
        :category="category"
        :anchor="anchor(category.id)"
        class="mb-16"
      ></MenuCategory>
    </div>
  </div>
</template>

<script>
import { get } from "vuex-pathify";
import BackToTop from "@/mixins/BackToTop";
import MenuHeader from "@/components/Menu/MenuHeader";
import MenuCategory from "@/components/Menu/MenuCategory";

export default {
  components: { MenuHeader, MenuCategory },
  computed: {
    parentCategories: get("category/parentCategories")
  },
  methods: {
    anchor(id) {
      return "category-anchor-" + id;
    },
    nav(id) {
      const anchor = this.anchor(id);
      document.getElementById(anchor).scrollIntoView({
        behavior: "smooth"
      });
    }
  },
  mixins: [BackToTop],
  name: "OrderMenu"
};
</script>

<style scoped></style>
