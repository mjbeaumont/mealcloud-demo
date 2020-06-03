<template>
  <div class="mx-auto max-w-screen-md flex flex-col items-center min-h-screen">
    <h2 class="question-text">
      Which location would you like to pick up from?
    </h2>
    <div class="flex flex-col md:text-5xl">
      <button
        v-for="location in locations"
        :key="location.id"
        class="mc-input mc-input-dark text-center leading-tight py-2 px-8 mb-4 md:px-16"
        @click="setLocation(location)"
      >
        {{ location.address }}<br />{{ location.city }}, {{ location.state }}
        {{ location.zip }}
      </button>
    </div>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
import BackToTop from "@/mixins/BackToTop";
import locations from "@/data/locations";
export default {
  computed: {
    location: sync("order/location"),
    activeComponent: sync("activeComponent")
  },
  data() {
    return {
      locations: locations
    };
  },
  methods: {
    setLocation(val) {
      this.location = val;
      this.activeComponent = "OrderSchedule";
    }
  },
  mixins: [BackToTop],
  name: "OrderLocation"
};
</script>

<style scoped></style>
