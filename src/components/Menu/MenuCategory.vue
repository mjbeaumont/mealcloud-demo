<template>
  <div>
    <a @click.prevent="toggle" class="cursor-pointer">
      <h2
        class="text-3xl border-b-4 border-white-400 uppercase mb-4 pb-4 font-avenir"
      >
        {{ category.name }}
      </h2>
    </a>
    <div class="overflow-hidden h-0 subcategories" ref="subContainer">
      <MenuSubCategory
        v-for="subcategory in subcategories"
        :key="subcategory.id"
        :subcategory="subcategory"
        class="mb-4"
      />
    </div>
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
  data() {
    return {
      open: false
    };
  },
  methods: {
    collapseSection(element) {
      const sectionHeight = element.scrollHeight;
      const elementTransition = element.style.transition;
      element.style.transition = "";

      requestAnimationFrame(function() {
        element.style.height = sectionHeight + "px";
        element.style.transition = elementTransition;

        requestAnimationFrame(function() {
          element.style.height = 0 + "px";
        });
      });

      element.setAttribute("data-collapsed", "true");
    },
    expandSection(element) {
      const sectionHeight = element.scrollHeight;
      const listener = () => {
        element.removeEventListener("transitionend", listener);
        element.style.height = "auto";
      };
      element.style.height = sectionHeight + "px";

      element.addEventListener("transitionend", listener);
      element.setAttribute("data-collapsed", "false");
    },
    toggle() {
      if (this.open) {
        this.collapseSection(this.$refs.subContainer);
      } else {
        this.expandSection(this.$refs.subContainer);
      }
      this.open = !this.open;
    }
  },
  name: "MenuCategory",
  props: {
    category: Object
  }
};
</script>

<style>
.subcategories {
  transition: height 0.4s ease-out;
}
</style>
