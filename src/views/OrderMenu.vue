<template>
  <div class="mx-auto px-0 -mt-8 lg:px-16 min-h-screen">
    <MenuHeader class="mb-8"></MenuHeader>
    <div class="flex flex-wrap -mx-2 mb-8">
      <div
        class="px-2 w-1/2 md:w-1/3 xl:w-1/6 mb-4"
        v-for="category in parentCategories"
        :key="category.id"
      >
        <button
          :category="category"
          class="mc-input mc-input-light md:text-2xl py-2 w-full"
          @click="nav(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
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
    <MenuCustomize></MenuCustomize>
    <OrderCart></OrderCart>
  </div>
</template>

<script>
import { get } from "vuex-pathify";
import BackToTop from "@/mixins/BackToTop";
import MenuHeader from "@/components/Menu/MenuHeader";
import MenuCategory from "@/components/Menu/MenuCategory";
import MenuCustomize from "@/components/Menu/MenuCustomize";
import OrderCart from "@/components/Cart/OrderCart";

export default {
  components: { MenuHeader, MenuCategory, MenuCustomize, OrderCart },
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
