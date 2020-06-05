<template>
  <div class="w-full flex border-b border-white pb-4">
    <div class="w-1/3 flex text-left">
      <p class="text-xl">
        <font-awesome-icon
          :icon="['fas', 'map-marker-alt']"
          size="lg"
        ></font-awesome-icon>
        <span class="ml-4">Pickup from {{ locationName }}</span>
      </p>
    </div>
    <div class="w-1/3 text-center">
      <p class="text-xl">
        <font-awesome-icon
          :icon="['fas', 'clock']"
          size="lg"
        ></font-awesome-icon>
        <span class="ml-4">{{ dateTime }}</span>
      </p>
    </div>
    <div class="w-1/4 flex justify-end">
      <p class="text-xl">
        <font-awesome-icon
          :icon="['fas', 'shopping-bag']"
          size="lg"
        ></font-awesome-icon>
      </p>
    </div>
  </div>
</template>

<script>
import { get } from "vuex-pathify";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar";

export default {
  computed: {
    locationName: get("order/location@name"),
    dateTime() {
      dayjs.extend(Calendar);
      const dateTime = this.$store.get("order/dateTime");
      return dateTime.calendar(null, {
        sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
        nextDay: "[Tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
        nextWeek: "dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
        sameElse: "dddd MM/DD/YYYY [at] h:mm A" // Everything else ( 7/10/2011 )
      });
    }
  },
  name: "MenuHeader"
};
</script>

<style scoped></style>
