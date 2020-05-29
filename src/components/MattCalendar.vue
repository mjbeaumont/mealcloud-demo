<template>
  <div class="container mx-auto md:w-3/4 lg:w-1/2">
    <div class="flex justify-between">
      <span class="pi pi-arrow-left leading-relaxed text-3xl"></span>
      <div class="uppercase font-bold text-3xl">May 2020</div>
      <span class="pi pi-arrow-right leading-relaxed text-3xl"></span>
    </div>
    <div class="calendar mx-auto">
      <div class="flex">
        <div
          v-for="heading in headings"
          :key="heading"
          class="font-bold date-column flex justify-center items-center md:text-3xl"
        >
          {{ heading }}
        </div>
      </div>
      <div class="flex" v-for="week in numberWeeks" :key="week">
        <div
          v-for="day in 7"
          :key="day"
          class="border border-white date-column bg-white bg-opacity-50 flex justify-center items-center md:text-3xl"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            {{ getCellContents(week, day) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    firstDay() {
      return new Date(
        this.activeMonth.getFullYear(),
        this.activeMonth.getMonth()
      ).getDay();
    },
    daysInMonth() {
      return (
        32 -
        new Date(
          this.activeMonth.getFullYear(),
          this.activeMonth.getMonth(),
          32
        ).getDate()
      );
    },
    numberWeeks() {
      return Math.ceil((this.daysInMonth + this.firstDay) / 7);
    }
  },
  created() {
    this.activeMonth = new Date();
  },
  data() {
    return {
      headings: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      activeMonth: null
    };
  },
  methods: {
    getCellContents(week, day) {
      const date = day - this.firstDay + (week - 1) * 7;
      return date > 0 && date <= this.daysInMonth ? date : "";
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
