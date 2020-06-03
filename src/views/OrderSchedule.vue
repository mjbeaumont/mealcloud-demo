<template>
  <div class="mx-auto max-w-screen-md flex flex-col items-center min-h-screen">
    <h2 class="question-text">{{ instructions }}</h2>
    <MCCalendar :min-date="new Date()" v-model="date"></MCCalendar>
    <transition name="component-fade">
      <Dropdown
        :options="times"
        optionLabel="name"
        v-if="date"
        class="w-full md:w-3/4 font-bold mc-input mc-input-light mt-8 py-2 text-3xl"
        :placeholder="placeholder"
        scrollHeight="350px"
        v-model="time"
      ></Dropdown>
    </transition>
  </div>
</template>

<script>
import { sync, get } from "vuex-pathify";
import { createFullTimeOptions, createPartialTimeOptions } from "@/data/times";
import MCCalendar from "@/components/UI/MCCalendar/MCCalendar";
import Dropdown from "primevue/dropdown";
import * as dayjs from "dayjs";
export default {
  components: {
    MCCalendar,
    Dropdown
  },
  computed: {
    activeComponent: sync("activeComponent"),
    date: sync("order/date"),
    instructions() {
      if (this.type === "delivery") {
        return "When would like your order to be delivered?";
      } else {
        return "When would you like to pickup your order?";
      }
    },
    placeholder() {
      return this.times.length ? "Please select a time" : "No times available";
    },
    time: sync("order/time"),
    times() {
      if (this.date.isSame(this.partialTimeDate)) {
        return createPartialTimeOptions();
      } else if (this.date.isSame(this.noTimeDate)) {
        return [];
      }
      return createFullTimeOptions();
    },
    type: get("order/type")
  },
  data() {
    return {
      partialTimeDate: dayjs(new Date(2020, 5, 15, 0, 0, 0, 0)),
      noTimeDate: dayjs(new Date(2020, 5, 20, 0, 0, 0, 0))
    };
  },
  name: "OrderSchedule",
  watch: {
    time(val) {
      if (val) {
        this.activeComponent = "OrderMenu";
      }
    }
  }
};
</script>

<style scoped></style>
