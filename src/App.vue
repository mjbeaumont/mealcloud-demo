<template>
  <div id="app"></div>
</template>

<script>
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
export default {
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
  name: "App"
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: black;
  color: #fff;
  padding-bottom: 30em;
}
.p-dropdown {
  @apply w-1/2 mt-16 bg-white bg-opacity-50 text-6xl border-white border;
  .p-dropdown-trigger {
    @apply border-l border-white px-8;
  }
}
</style>
