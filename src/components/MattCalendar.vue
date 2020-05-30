<template>
  <div class="container mx-auto md:w-3/4 lg:w-1/2">
    <div class="flex justify-between">
      <a class="cursor-pointer" @click.prevent="prev" :class="prevClass"
        ><span class="pi pi-arrow-left leading-relaxed text-3xl"></span
      ></a>
      <div class="uppercase font-bold text-3xl">{{ monthHeading }}</div>
      <a class="cursor-pointer" @click.prevent="next" :class="nextClass"
        ><span class="pi pi-arrow-right leading-relaxed text-3xl"></span
      ></a>
    </div>
    <div class="calendar mx-auto">
      <div class="flex">
        <div
          v-for="heading in headings"
          :key="heading"
          class="font-bold date-column flex justify-center items-center md:text-3xl"
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
          class="border border-white date-column bg-white bg-opacity-50 flex justify-center items-center md:text-3xl"
        >
          <a
            class="absolute inset-0 flex items-center justify-center"
            @click.prevent="selectDate(week, day)"
            :disabled="outsideRange(week, day)"
            :class="dayClass(week, day)"
          >
            {{ getCellContents(week, day) }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dayNamesShort, getDate, weeksInMonth } from "@/utils/date-helpers";
import * as dayjs from "dayjs";
export default {
  computed: {
    activeDateMeta() {
      return this.activeDate
        ? {
            month: this.activeDate.month(),
            year: this.activeDate.year()
          }
        : null;
    },
    selectedYearMeta() {
      return this.selectedDate
        ? {
            date: this.selectedDate.date(),
            month: this.selectedDate.month(),
            year: this.selectedDate.year()
          }
        : null;
    },
    firstDay() {
      return this.activeDate.startOf("month").day();
    },
    daysInMonth() {
      return this.activeDate.daysInMonth();
    },
    monthHeading() {
      return this.activeDate.format("MMMM YYYY");
    },
    nextClass() {
      return !this.maximumDate ||
        this.activeDate.startOf("month") < this.maximumDate.startOf("month")
        ? "visible"
        : "invisible";
    },
    prevClass() {
      return !this.minimumDate ||
        this.activeDate.startOf("month") > this.minimumDate.startOf("month")
        ? "visible"
        : "invisible";
    },
    weeksInMonth() {
      return weeksInMonth({
        daysInMonth: this.daysInMonth,
        firstDay: this.firstDay
      });
    }
  },
  created() {
    this.activeDate = dayjs().startOf("day");
    if (this.minDate) {
      this.minimumDate = dayjs(this.minDate).startOf("day");
    }
    if (this.maxDate) {
      this.maximumDate = dayjs(this.maxDate).startOf("day");
    }
  },
  data() {
    return {
      headings: dayNamesShort,
      activeDate: null,
      minimumDate: null,
      maximumDate: null,
      selectedDate: null
    };
  },
  methods: {
    dayClass(week, day) {
      let className = this.outsideRange(week, day)
        ? "text-gray-800"
        : "cursor-pointer";
      if (this.isSelected(week, day)) {
        className += " text-yellow-300";
      }
      return className;
    },
    getCellContents(week, day) {
      const date = this.getDate({ week, day });
      return date > 0 && date <= this.daysInMonth ? date : "";
    },
    getDate({ week, day }) {
      return getDate({ week, day, firstDay: this.firstDay });
    },
    isSelected(week, day) {
      if (
        !this.selectedDate ||
        this.selectedDate.year() !== this.activeDateMeta.year ||
        this.selectedDate.month() !== this.activeDateMeta.month
      ) {
        return false;
      }

      const date = this.getDate({ week, day });
      return this.selectedDate.date() === date;
    },
    next() {
      this.activeDate = this.activeDate.add(1, "month");
    },
    outsideRange(week, day) {
      if (this.minDate || this.maxDate) {
        const date = this.getDate({ week, day });
        const dateObj = dayjs(
          new Date(this.activeDateMeta.year, this.activeDateMeta.month, date)
        );
        return (
          (this.minDate && dateObj.isBefore(this.minDate)) ||
          (this.maxDate && dateObj.isAfter(this.maxDate))
        );
      }
      return false;
    },
    prev() {
      this.activeDate = this.activeDate.subtract(1, "month");
    },
    selectDate(week, day) {
      const date = this.getDate({ week, day });
      this.selectedDate = dayjs(
        new Date(this.activeDateMeta.year, this.activeDateMeta.month, date)
      );
      this.updateValue();
    },
    updateValue() {
      this.$emit("input", this.selectedDate);
    }
  },
  name: "MattCalendar",
  props: {
    value: {
      type: String
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
