<template>
  <div class="mx-auto flex flex-col items-center min-h-screen">
    <h2 class="question-text">{{ instructions }}</h2>
    <div class="w-full lg:w-1/2 px-4" id="schedule">
      <MCCalendar
        :min-date="startDate"
        :max-date="endDate"
        v-model="date"
      ></MCCalendar>
      <transition name="component-fade">
        <Dropdown
          :options="times"
          optionLabel="name"
          optionValue="code"
          id="time-selector"
          v-if="date"
          class="w-full font-bold mc-input mc-input-light mt-8 py-2 text-xl md:text-3xl text-center"
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
    instructions() {
      if (this.type === "delivery") {
        return "When would like your order to be delivered?";
      } else {
        return "When would you like to pickup your order?";
      }
    },
    placeholder() {
      return this.times.length ? "Select a time" : "No times available";
    },
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
      date: null,
      time: null,
      partialTimeDate: dayjs(new Date(2020, 5, 15, 0, 0, 0, 0)),
      noTimeDate: dayjs(new Date(2020, 5, 20, 0, 0, 0, 0)),
      startDate: new Date(),
      endDate: dayjs(new Date())
        .add(10, "day")
        .toDate()
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
          const timeArray = val.split(":");
          const dateTime = dayjs()
            .year(this.date.year())
            .month(this.date.month())
            .date(this.date.date())
            .hour(timeArray[0])
            .minute(timeArray[1])
            .second(0);
          this.$store.set("order/dateTime", dateTime);
          this.activeComponent = "OrderMenu";
        }, 1000);
      }
    }
  }
};
</script>

<style scoped></style>
