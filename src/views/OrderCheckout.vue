<template>
  <div>
    <h2 class="text-xl font-bold">Review and Complete Your Order</h2>
    <p class="py-8 border-b border-gray-700">
      Your order will be picked up from {{ locationName }} {{ dateTime }}
    </p>
    <div class="py-8 border-b border-gray-700">
      <h3 class="text-lg font-bold mb-4">
        Contact Information
      </h3>
      <div class="mb-2">
        <validated-input>
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            class="text-sm sm:text-base relative w-full border rounded placeholder-gray-500 text-black focus:border-indigo-400 focus:outline-none p-2"
          />
        </validated-input>
      </div>
      <div class="mb-2">
        <validated-input class="mb-2">
          <input
            v-model="email"
            type="text"
            placeholder="Email Address"
            class="text-sm sm:text-base relative w-full border rounded placeholder-gray-500 text-black focus:border-indigo-400 focus:outline-none p-2"
          />
        </validated-input>
      </div>
      <validated-input>
        <input
          v-model="phone"
          type="text"
          placeholder="Phone Number (optional)"
          class="text-sm sm:text-base relative w-full border rounded placeholder-gray-500 text-black focus:border-indigo-400 focus:outline-none p-2"
        />
      </validated-input>
    </div>
    <div class="py-8 border-b border-gray-700">
      <h3 class="text-lg font-bold mb-4">
        Order Instructions
      </h3>
      <div class="mb-4">
        <MCCheckbox
          label="Curbside Pickup"
          v-model="curbside"
          class="mb-2"
        ></MCCheckbox>
        <MCCheckbox
          label="No Utensils. Let's Reduce Waste!"
          v-model="utensils"
          class="mb-2"
        ></MCCheckbox>
        <p class="mb-2 mt-4 font-bold">
          <a
            @click.prevent="showInstructions = !showInstructions"
            class="cursor-pointer"
            ><font-awesome-icon :icon="instructionsIcon"></font-awesome-icon>
            Add Special Instructions</a
          >
        </p>
        <textarea
          class="border border-gray-700 placeholder-gray-500 w-full h-32 p-2"
          :class="instructionsClass"
          placeholder="e.g. Please include extra ketchup. "
          v-model="instructions"
          tabindex="-1"
        ></textarea>
      </div>
    </div>
    <div class="py-8 border-b border-gray-700">
      <h3 class="text-lg font-bold mb-4">
        Payment Information
      </h3>
      <div
        class="bg-white h-10 rounded p-4 text-sm sm:text-base relative"
        id="card-element"
      >
        <iframe
          frameborder="0"
          allowtransparency="true"
          scrolling="no"
          class="absolute top-0 left-0 h-10"
          name="__privateStripeFrame16"
          allowpaymentrequest="true"
          src="https://js.stripe.com/v3/elements-inner-card-709c45dfbe4aba3400395e54e4e911b1.html#style[base][color]=%2332325d&amp;style[base][fontSmoothing]=antialiased&amp;style[invalid][color]=%23fa755a&amp;style[invalid][iconColor]=%23fa755a&amp;componentName=card&amp;wait=false&amp;rtl=false&amp;keyMode=test&amp;apiKey=pk_test_TYooMQauvdEDq54NiTphI7jx&amp;origin=https%3A%2F%2Fstripe.com&amp;referrer=https%3A%2F%2Fstripe.com%2Fdocs%2Fpayments%2Faccept-a-payment&amp;controllerId=__privateStripeController12"
          title="Secure payment input frame"
          style="border: none !important; margin: 0px !important; padding: 10px !important; width: 1px !important; min-width: 100% !important; overflow: hidden !important; display: block !important; user-select: none !important;"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { get, sync } from "vuex-pathify";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar";
import ValidatedInput from "@/components/UI/ValidatedInput/ValidatedInput";
import MCCheckbox from "@/components/UI/MCCheckbox/MCCheckbox";

export default {
  components: { MCCheckbox, ValidatedInput },
  computed: {
    email: sync("order/email"),
    name: sync("order/name"),
    phone: sync("order/phone"),
    instructions: sync("order/instructions"),
    instructionsClass() {
      return this.showInstructions ? "block" : "hidden";
    },
    instructionsIcon() {
      return this.showInstructions ? ["fas", "minus"] : ["fas", "plus"];
    },
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
  data() {
    return {
      curbside: false,
      showInstructions: false,
      utensils: true
    };
  },
  name: "OrderCheckout"
};
</script>

<style scoped></style>
