<template>
  <div
    class="mx-auto max-w-screen-md md:pt-48 flex flex-col items-center justify-center h-screen text-2xl md:text-xl"
  >
    <h2 class="font-bold md:text-6xl">
      Which location would you like to pick up from?
    </h2>
    <div class="flex flex-col mt-12 md:text-5xl">
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
import locations from "@/data/locations";
export default {
  computed: {
    location: sync("order/location")
  },
  data() {
    return {
      locations: locations
    };
  },
  methods: {
    setLocation(val) {
      this.location = val;
    }
  },
  name: "OrderLocation.vue"
};
</script>

<style scoped></style>
