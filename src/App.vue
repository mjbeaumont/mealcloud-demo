<template>
  <div id="app" class="pt-24 pb-16 px-2">
    <SiteHeader />
    <transition name="component-fade" mode="out-in">
      <component :is="activeComponent" :key="activeComponent.name"></component>
    </transition>
    <SiteFooter />
  </div>
</template>

<script>
import OrderType from "@/views/OrderType";
import { sync } from "vuex-pathify";
import categories from "@/data/categories";
import products from "@/data/products";
import SiteHeader from "@/components/Layout/SiteHeader";
import SiteFooter from "@/components/Layout/SiteFooter";

export default {
  components: {
    OrderType,
    SiteHeader,
    SiteFooter,
    OrderLocation: () => import("@/views/OrderLocation"),
    OrderSchedule: () => import("@/views/OrderSchedule"),
    OrderMenu: () => import("@/views/OrderMenu")
  },
  computed: {
    activeComponent: sync("activeComponent")
  },
  created() {
    this.$store.set("category/categories", categories);
    this.$store.set("product/products", products);
  },
  mounted() {
    this.activeComponent = "OrderLocation";
  },
  name: "App"
};
</script>

<style lang="scss">
html,
body {
  background: #cb6671;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #cb6671;
  color: #fff;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.4s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
