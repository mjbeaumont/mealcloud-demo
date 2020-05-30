<template>
  <div id="app">
    <MCCalendar></MCCalendar>
  </div>
</template>

<script>
import MCCalendar from "@/components/MCCalendar";
import "primeicons/primeicons.css";
export default {
  components: { MCCalendar },
  data() {
    return {
      value: null
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
}
</style>
