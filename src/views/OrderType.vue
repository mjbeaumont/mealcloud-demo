<template>
  <div class="mx-auto flex flex-col items-center min-h-screen max-w-screen-md">
    <h2 class="question-text">
      Would you like to order <span class="md:block">Pickup or Delivery?</span>
    </h2>
    <div class="flex flex-col md:flex-row md:text-5xl">
      <button
        class="mc-input mc-input-dark font-bold uppercase py-2 px-8 md:px-0 md:w-64 text-center"
        @click="setType('delivery')"
      >
        Delivery
      </button>
      <button
        class="mc-input mc-input-dark font-bold uppercase py-2 px-8 mt-6 md:px-0 md:mt-0 md:ml-6 md:w-64 text-center"
        @click="setType('pickup')"
      >
        Pickup
      </button>
    </div>
  </div>
</template>

<script>
import { sync } from "vuex-pathify";
export default {
  computed: {
    type: sync("order/type"),
    activeComponent: sync("activeComponent")
  },
  methods: {
    setType(val) {
      this.type = val;
      this.activeComponent =
        val === "delivery" ? "OrderSchedule" : "OrderLocation";
    }
  },
  name: "OrderType"
};
</script>

<style scoped></style>
