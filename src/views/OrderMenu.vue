<template>
  <div class="mx-auto px-0 md:-mt-8 lg:px-16 min-h-screen">
    <MenuHeader class="mb-8"></MenuHeader>
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
