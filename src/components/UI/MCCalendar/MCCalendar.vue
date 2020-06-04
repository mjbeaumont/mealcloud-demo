<template>
  <div class="mx-auto w-full">
    <MCCalendarHeader
      :active-date="activeDate"
      :maximum-date="maximumDate"
      :minimum-date="minimumDate"
      @nav="nav"
    />
    <div class="calendar mx-auto">
      <div class="flex">
        <div
          v-for="heading in headings"
          :key="heading"
          class="font-bold date-column flex justify-center items-center text-xl"
        >
          <div class="absolute inset-0 flex items-end justify-center">
            {{ heading }}
          </div>
        </div>
      </div>
      <div class="flex" v-for="week in weeksInMonth" :key="week">
        <div
          v-for="day in 7"
          :key="day"
          class="border border-white date-column flex justify-center items-center"
        >
          <MCCalendarDay
            :date="createDate(week, day)"
            :minimum-date="minimumDate"
            :maximum-date="maximumDate"
            :selected-date="selectedDate"
            :active-date="activeDate"
            @choose="selectDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dayjs from "dayjs";
import MCCalendarHeader from "./MCCalendarHeader";
import MCCalendarDay from "./MCCalendarDay";

export default {
  components: { MCCalendarDay, MCCalendarHeader },
  computed: {
    firstDay() {
      return this.activeDate.startOf("month").day();
    },
    daysInMonth() {
      return this.activeDate.daysInMonth();
    },
    weeksInMonth() {
      return Math.ceil((this.daysInMonth + this.firstDay) / 7);
    }
  },
  created() {
    if (this.minDate) {
      this.minimumDate = dayjs(this.minDate).startOf("day");
    }
    if (this.maxDate) {
      this.maximumDate = dayjs(this.maxDate).startOf("day");
    }
    this.setInitialDate();
  },
  data() {
    return {
      headings: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      activeDate: null,
      minimumDate: null,
      maximumDate: null,
      selectedDate: null
    };
  },
  methods: {
    createDate(week, day) {
      const date = this.getDate({ week, day });
      return dayjs(
        new Date(this.activeDate.year(), this.activeDate.month(), date)
      );
    },
    getDate({ week, day }) {
      return day - this.firstDay + (week - 1) * 7;
    },
    nav(val) {
      this.activeDate = val;
    },
    selectDate(val) {
      this.selectedDate = val;
      this.updateValue();
    },
    setInitialDate() {
      let currentDate = dayjs().startOf("month");
      if (
        this.minimumDate &&
        this.minimumDate.startOf("month").isAfter(currentDate)
      ) {
        currentDate = currentDate.month(this.minimumDate.month());
      }

      if (
        this.maximumDate &&
        this.maximumDate.startOf("month").isBefore(currentDate)
      ) {
        currentDate = currentDate.month(this.maximumDate.month());
      }

      this.activeDate = currentDate;
    },
    updateValue() {
      this.$emit("input", this.selectedDate);
    }
  },
  name: "McCalendar",
  props: {
    value: {
      type: Object
    },
    minDate: {
      type: Date
    },
    maxDate: {
      type: Date
    }
  }
};
</script>

<style lang="scss" scoped>
.date-column {
  @apply flex-grow flex-shrink-0 relative m-1;
  flex-basis: auto;
  &:after {
    content: "";
    @apply float-left block;
    padding-top: 100%;
  }
}
</style>
