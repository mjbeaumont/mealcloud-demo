<template>
  <div id="app" class="container pt-12 pb-4 px-2">
    <transition name="component-fade" mode="out-in">
      <component :is="activeComponent" :key="activeComponent.name"></component>
    </transition>
  </div>
</template>

<script>
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import OrderType from "@/views/OrderType";
import { sync } from "vuex-pathify";

export default {
  components: {
    OrderType,
    OrderLocation: () => import("@/views/OrderLocation"),
    OrderSchedule: () => import("@/views/OrderSchedule"),
    OrderMenu: () => import("@/views/OrderMenu")
  },
  computed: {
    activeComponent: sync("activeComponent")
  },
  mounted() {
    this.activeComponent = "OrderType";
  },
  name: "App"
};
</script>

<style lang="scss">
html,
body {
  background: #000;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #000;
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
