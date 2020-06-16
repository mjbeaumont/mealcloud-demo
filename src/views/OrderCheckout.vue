<template>
  <div>
    <ValidationObserver ref="contactForm">
      <div>
        <!-- left side desktop -->
        <h2 class="text-xl font-bold">Review and Complete Your Order</h2>
        <p class="py-8 border-b border-gray-700">
          Your order will be picked up from {{ locationName }} {{ dateTime }}
        </p>
        <div class="py-8 border-b border-gray-700">
          <h3 class="text-lg font-bold mb-4">
            Contact Information
          </h3>
          <div class="mb-2">
            <validated-input rules="required">
              <input
                v-model="name"
                type="text"
                placeholder="Name"
                class="text-sm sm:text-base relative w-full border rounded placeholder-gray-500 text-black focus:border-indigo-400 focus:outline-none p-2"
              />
            </validated-input>
          </div>
          <div class="mb-2">
            <validated-input class="mb-2" rules="required|email">
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
                ><font-awesome-icon
                  :icon="instructionsIcon"
                ></font-awesome-icon>
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
          <div class="mt-4 mb-6 flex flex-wrap -mx-2">
            <div class="px-2 w-1/2">
              <button
                class="mc-input mc-input-dark w-full py-2 hover:text-black"
                @click="paymentMethod = 'card'"
                :class="
                  paymentMethod === 'card'
                    ? 'bg-opacity-75 border border-black'
                    : 'text-gray-700'
                "
              >
                Pay with Card
              </button>
            </div>
            <div class="px-2 w-1/2">
              <button
                class="mc-input mc-input-dark w-full py-2 hover:text-black"
                @click="paymentMethod = 'apple'"
                :class="
                  paymentMethod === 'apple'
                    ? 'bg-opacity-75 border border-black'
                    : 'text-gray-700'
                "
              >
                Apple Pay
              </button>
            </div>
          </div>
          <div
            class="bg-white h-10 rounded p-4 text-sm sm:text-base relative"
            id="card-element"
            v-if="paymentMethod === 'card'"
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
          <div v-if="paymentMethod === 'apple'">
            <button class="w-full bg-black text-white mt-2">
              <font-awesome-icon
                :icon="['fab', 'apple-pay']"
                size="3x"
              ></font-awesome-icon>
            </button>
          </div>
        </div>
      </div>
      <div class="pt-4">
        <!-- Right side desktop -->
        <div class="w-full border-b border-gray-700 pb-8">
          <h3 class="text-lg font-bold mb-4">
            Order Summary
            <font-awesome-icon
              :icon="['fas', 'edit']"
              @click="edit"
            ></font-awesome-icon>
          </h3>
          <div
            class="py-4"
            v-for="product in products"
            :key="product.productId"
          >
            <checkout-product :product="product"></checkout-product>
          </div>
        </div>
        <div class="pt-8 w-full">
          <p v-if="tax > 0" class="w-full flex justify-between">
            <span class="font-bold inline-block pr-8"
              >Tax ({{ taxRate }}%):</span
            >
            {{ tax | currency }}
          </p>
          <p v-if="gratuity > 0" class="w-full flex justify-between">
            <span class="font-bold">Gratuity ({{ gratuityRate }}%):</span>
            {{ gratuity | currency }}
          </p>
          <p class="w-full flex justify-between">
            <span class="font-bold">Total:</span>
            {{ total | currency }}
          </p>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { get, sync } from "vuex-pathify";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar";
import ValidatedInput from "@/components/UI/ValidatedInput/ValidatedInput";
import MCCheckbox from "@/components/UI/MCCheckbox/MCCheckbox";
import CheckoutProduct from "@/components/Checkout/CheckoutProduct";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    CheckoutProduct,
    MCCheckbox,
    ValidatedInput,
    ValidationObserver
  },
  computed: {
    activeComponent: sync("activeComponent"),
    dateTime() {
      dayjs.extend(Calendar);
      const dateTime = this.$store.get("order/dateTime");
      return dateTime.calendar(null, {
        sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
        nextDay: "[Tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
        nextWeek: "dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
        sameElse: "dddd MM/DD/YYYY [at] h:mm A" // Everything else ( 7/10/2011 )
      });
    },
    email: sync("order/email"),
    gratuity: get("order/gratuity"),
    gratuityRate: get("order/gratuityRate"),
    instructions: sync("order/instructions"),
    instructionsClass() {
      return this.showInstructions ? "block" : "hidden";
    },
    instructionsIcon() {
      return this.showInstructions ? ["fas", "minus"] : ["fas", "plus"];
    },
    locationName: get("order/location@name"),
    name: sync("order/name"),
    phone: sync("order/phone"),
    products: get("cart/products"),
    tax: get("order/tax"),
    taxRate: get("order/location@taxRate"),
    total: get("order/total")
  },
  data() {
    return {
      curbside: false,
      showInstructions: false,
      utensils: true,
      paymentMethod: "card"
    };
  },
  methods: {
    edit() {
      this.$store.set("cart/open", false);
      this.activeComponent = "OrderMenu";
    }
  },
  name: "OrderCheckout",
  watch: {
    phone(newValue) {
      let x = newValue.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.phone = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    }
  }
};
</script>

<style scoped></style>
