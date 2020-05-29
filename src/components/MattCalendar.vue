<template>
  <div class="container mx-auto md:w-3/4 lg:w-1/2">
    <div class="flex justify-between">
      <a class="cursor-pointer" @click.prevent="nav(-1)"
        ><span class="pi pi-arrow-left leading-relaxed text-3xl"></span
      ></a>
      <div class="uppercase font-bold text-3xl">{{ monthHeading }}</div>
      <a class="cursor-pointer" @click.prevent="nav(1)"
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
            class="absolute inset-0 flex items-center justify-center cursor-pointer"
            @click.prevent="selectDate(week, day)"
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
      return this.activeMonth
        ? monthNames[this.activeMonth] + " " + this.activeYear
        : "";
    },
    weeksInMonth() {
      return weeksInMonth({
        daysInMonth: this.daysInMonth,
        firstDay: this.firstDay
      });
    }
  },
  created() {
    this.activeDate = new Date();
  },
  data() {
    return {
      headings: dayNamesShort,
      activeDate: null
    };
  },
  methods: {
    getCellContents(week, day) {
      const date = getDate({ week, day, firstDay: this.firstDay });
      return date > 0 && date <= this.daysInMonth ? date : "";
    },
    nav(direction) {
      const newMonth = this.activeDate.getMonth() + direction;
      this.activeDate = new Date(this.activeDate.setMonth(newMonth));
    }
  },
  name: "MattCalendar"
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
