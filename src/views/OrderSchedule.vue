<template>
  <div
    class="mx-auto px-2 max-w-screen-md pt-12 flex flex-col items-center min-h-screen"
  >
    <h2 class="question-text">{{ instructions }}</h2>
    <MCCalendar :min-date="new Date()" v-model="date"></MCCalendar>
    <Dropdown
      :options="times"
      optionLabel="name"
      v-if="date"
      class="w-full md:w-3/4 font-bold mc-input mc-input-light mt-8 md:py-2 text-4xl"
      placeholder="Select a Time"
      scrollHeight="350px"
      v-model="time"
    ></Dropdown>
  </div>
</template>

<script>
import { sync, get } from "vuex-pathify";
import times from "@/data/times";
import MCCalendar from "@/components/UI/MCCalendar/MCCalendar";
import Dropdown from "primevue/dropdown";
export default {
  components: {
    MCCalendar,
    Dropdown
  },
  computed: {
    date: sync("order/date"),
    instructions() {
      if (this.type === "delivery") {
        return "When would like your order to be delivered?";
      } else {
        return "When would you like to pickup your order?";
      }
    },
    time: sync("order/time"),
    type: get("order/type")
  },
  data() {
    return {
      times: times
    };
  },
  name: "OrderSchedule"
};
</script>

<style scoped></style>
