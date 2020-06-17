<template>
  <div class="py-8 border-b border-gray-700">
    <div>
      Your order will be picked up {{ dateTime }} from {{ orderLocation }}
    </div>
    <div class="map-container relative h-0 w-3/4 mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.7805471334314!2d-77.02598888471947!3d38.9061334540343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7ed493773cf%3A0x45657e8fb1bb9a93!2sUnconventional%20Diner!5e0!3m2!1sen!2sus!4v1592344552971!5m2!1sen!2sus"
        frameborder="0"
        style="border:0;"
        allowfullscreen="false"
        aria-hidden="false"
        tabindex="0"
        class="mt-4 w-full h-full absolute top-0 left-0 right-0 bottom-0"
      ></iframe>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar";
import { get } from "vuex-pathify";
export default {
  computed: {
    dateTime() {
      dayjs.extend(Calendar);
      const dateTime = this.$store.get("order/dateTime");
      return dateTime.calendar(null, {
        sameDay: "[today at] h:mm A", // The same day ( Today at 2:30 AM )
        nextDay: "[tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
        nextWeek: "[on] dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
        sameElse: "[on] dddd MM/DD/YYYY [at] h:mm A" // Everything else ( 7/10/2011 )
      });
    },
    location: get("order/location"),
    orderLocation() {
      return (
        this.location.address +
        ", " +
        this.location.city +
        ", " +
        this.location.state +
        " " +
        this.location.zip
      );
    }
  },
  name: "CheckoutLocation"
};
</script>
<style lang="scss">
.map-container {
  padding-top: 33%;
}
</style>
