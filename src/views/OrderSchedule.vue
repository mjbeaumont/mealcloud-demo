<template>
  <div class="mx-auto flex flex-col items-center min-h-screen">
    <h2 class="question-text">{{ instructions }}</h2>
    <div class="w-full lg:w-1/2 px-4" id="schedule">
      <MCCalendar :min-date="new Date()" v-model="date"></MCCalendar>
      <transition name="component-fade">
        <Dropdown
          :options="times"
          optionLabel="name"
          id="time-selector"
          v-if="date"
          class="w-full font-bold mc-input mc-input-light mt-8 py-2 md:text-3xl"
          :placeholder="placeholder"
          scrollHeight="350px"
          v-model="time"
        ></Dropdown>
      </transition>
    </div>
  </div>
</template>

<script>
import { sync, get } from "vuex-pathify";
import { createFullTimeOptions, createPartialTimeOptions } from "@/data/times";
import MCCalendar from "@/components/UI/MCCalendar/MCCalendar";
import BackToTop from "@/mixins/BackToTop";
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
  mixins: [BackToTop],
  mounted() {
    const observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (
          mutation.addedNodes.length > 0 &&
          mutation.addedNodes[0].id === "time-selector"
        ) {
          document
            .getElementById("time-selector")
            .scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    observer.observe(document.getElementById("schedule"), {
      childList: true
    });
  },
  name: "OrderSchedule",
  watch: {
    time(val) {
      if (val) {
        setTimeout(() => {
          this.activeComponent = "OrderMenu";
        }, 1000);
      }
    }
  }
};
</script>

<style scoped></style>
