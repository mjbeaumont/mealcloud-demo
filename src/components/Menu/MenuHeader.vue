<template>
  <div
    class="w-full flex flex-col md:flex-row border-b border-white pb-4 relative"
  >
    <div class="mt-24 xl:mt-0 md:w-1/2 xl:w-1/3 flex text-left mb-2">
      <p class="text-xl">
        <font-awesome-icon
          :icon="['fas', 'map-marker-alt']"
          size="lg"
          class="hidden md:inline-block text-green-400"
        ></font-awesome-icon>
        <span class="mr-2 md:mx-4">Pickup from {{ locationName }}</span>
        <a @click.prevent="editLocation" class="cursor-pointer"
          ><font-awesome-icon :icon="['fas', 'edit']"></font-awesome-icon
        ></a>
      </p>
    </div>
    <div class="md:mt-24 xl:mt-0 md:w-1/2 xl:w-1/3 xl:text-center">
      <p class="text-xl">
        <font-awesome-icon
          :icon="['fas', 'clock']"
          size="lg"
          class="hidden md:inline-block text-green-400"
        ></font-awesome-icon>
        <span class="mr-2 md:mx-4">{{ dateTime }}</span>
        <a @click.prevent="editSchedule" class="cursor-pointer"
          ><font-awesome-icon :icon="['fas', 'edit']"></font-awesome-icon
        ></a>
      </p>
    </div>
    <div class="absolute top-0 right-0 mr-2 xl:w-1/3 xl:flex xl:justify-end">
      <p class="text-3xl">
        <a @click.prevent="openCart" class="cursor-pointer">
          <font-awesome-icon
            :icon="['fas', 'shopping-bag']"
            size="lg"
            class="text-green-400"
          ></font-awesome-icon>
        </a>
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
  methods: {
    editSchedule() {
      this.$store.set("order/dateTime", null);
      this.$store.set("activeComponent", "OrderSchedule");
    },
    editLocation() {
      this.$store.set("order/location", {});
      this.$store.set("activeComponent", "OrderLocation");
    },
    openCart() {
      this.$store.set("cart/open", true);
    }
  },
  name: "MenuHeader"
};
</script>

<style scoped></style>
