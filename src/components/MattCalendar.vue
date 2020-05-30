<template>
  <div class="container mx-auto md:w-3/4 lg:w-1/2">
    <div class="flex justify-between">
      <a class="cursor-pointer" @click.prevent="nav(-1)" :class="prevClass"
        ><span class="pi pi-arrow-left leading-relaxed text-3xl"></span
      ></a>
      <div class="uppercase font-bold text-3xl">{{ monthHeading }}</div>
      <a class="cursor-pointer" @click.prevent="nav(1)" :class="nextClass"
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
import {
  dayNamesShort,
  monthNames,
  getDate,
  daysInMonth,
  firstDay,
  weeksInMonth
} from "@/utils/date-helpers";
export default {
  computed: {
    activeMonth() {
      return this.activeDate.getMonth();
    },
    activeYear() {
      return this.activeDate.getFullYear();
    },
    firstDay() {
      return firstDay({ year: this.activeYear, month: this.activeMonth });
    },
    daysInMonth() {
      return daysInMonth({ year: this.activeYear, month: this.activeMonth });
    },
    monthHeading() {
      return this.activeMonth >= 0
        ? monthNames[this.activeMonth] + " " + this.activeYear
        : "";
    },
    nextClass() {
      if (this.maxDate) {
        return this.activeYear < this.maxDate.getFullYear() ||
          this.activeMonth <= this.maxDate.getMonth() - 1
          ? "visible"
          : "invisible";
      }
      return "visible";
    },
    prevClass() {
      if (this.minDate) {
        return this.activeYear > this.minDate.getFullYear() ||
          this.activeMonth >= this.minDate.getMonth() + 1
          ? "visible"
          : "invisible";
      }
      return "visible";
    },
    weeksInMonth() {
      return weeksInMonth({
        daysInMonth: this.daysInMonth,
        firstDay: this.firstDay
      });
    }
  },
  created() {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    this.activeDate = date;
    if (this.minDate) {
      this.minDate.setHours(0, 0, 0, 0);
    }
    if (this.maxDate) {
      this.maxDate.setHours(0, 0, 0, 0);
    }
  },
  data() {
    return {
      headings: dayNamesShort,
      activeDate: null,
      selectedDate: null
    };
  },
  methods: {
    dayClass(week, day) {
      let className = this.outsideRange(week, day)
        ? "text-grey-600"
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
        this.selectedDate.getFullYear() !== this.activeYear ||
        this.selectedDate.getMonth() !== this.activeMonth
      ) {
        return false;
      }

      const date = this.getDate({ week, day });
      return this.selectedDate.getDate() === date;
    },
    nav(direction) {
      const newMonth = this.activeDate.getMonth() + direction;
      if (
        (!this.minDate || newMonth >= this.minDate.getMonth()) &&
        (!this.maxDate || newMonth <= this.maxDate.getMonth())
      ) {
        if (newMonth === 12) {
          this.activeDate.setMonth(0);
          this.activeDate = new Date(
            this.activeDate.setFullYear(this.activeDate.getFullYear() + 1)
          );
        } else if (newMonth === 0) {
          this.activeDate.setMonth(12);
          this.activeDate = new Date(
            this.activeDate.setFullYear(this.activeDate.getFullYear() - 1)
          );
        } else {
          this.activeDate = new Date(this.activeDate.setMonth(newMonth));
        }
      }
    },
    outsideRange(week, day) {
      if (this.minDate || this.maxDate) {
        const date = this.getDate({ week, day });
        const dateObj = new Date(this.activeYear, this.activeMonth, date);
        if (
          this.minDate &&
          dateObj < this.minDate &&
          dateObj.getTime() !== this.minDate.getTime()
        ) {
          return true;
        }

        if (this.maxDate && dateObj > this.maxDate) {
          return true;
        }
      }
      return false;
    },
    selectDate(week, day) {
      const date = this.getDate({ week, day });
      this.selectedDate = new Date(this.activeYear, this.activeMonth, date);
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
