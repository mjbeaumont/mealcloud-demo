<template>
  <div id="app">
    <MattCalendar></MattCalendar>
  </div>
</template>

<script>
import MattCalendar from "@/components/MattCalendar";
import "primeicons/primeicons.css";
export default {
  components: { MattCalendar },
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
