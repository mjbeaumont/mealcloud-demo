<template>
  <div id="app" class="container">
    <component :is="activeComponent"></component>
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
    OrderLocation: () => import("@/views/OrderLocation")
  },
  computed: {
    activeComponent: sync("activeComponent")
  },
  data() {
    return {
      date: null,
      time: null,
      times: [
        { name: "7:00PM", code: "7:00PM" },
        { name: "7:15PM", code: "7:15PM" },
        { name: "7:30PM", code: "7:30PM" },
        { name: "8:00PM", code: "8:00PM" }
      ]
    };
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
  padding-bottom: 30em;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}
</style>
