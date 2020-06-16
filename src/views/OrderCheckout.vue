<template>
  <div class="w-full">
    <ValidationObserver
      ref="contactForm"
      slim
      class="w-full lg:flex lg:flex-no-wrap lg:max-w-screen-lg lg:justify-between mx-auto"
    >
      <div class="lg:w-7/12">
        <!-- left side desktop -->
        <h2 class="text-xl font-bold">Review and Complete Your Order</h2>
        <div class="py-8 border-b border-gray-700">
          <div>
            Your order will be picked up {{ dateTime }} from {{ orderLocation }}
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.7805471334314!2d-77.02598888471947!3d38.9061334540343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7ed493773cf%3A0x45657e8fb1bb9a93!2sUnconventional%20Diner!5e0!3m2!1sen!2sus!4v1592344552971!5m2!1sen!2sus"
            frameborder="0"
            style="border:0;"
            allowfullscreen="false"
            aria-hidden="false"
            tabindex="0"
            class="w-full h-full mt-4"
          ></iframe>
        </div>

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
                class="mc-input mc-input-dark text-xl md:text-2xl w-full py-2 hover:text-black"
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
                class="mc-input mc-input-dark text-xl md:text-2xl w-full py-2 hover:text-black"
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
            <button class="w-full bg-black text-white mt-2" @click="applePay">
              <font-awesome-icon
                :icon="['fab', 'apple-pay']"
                size="3x"
              ></font-awesome-icon>
            </button>
          </div>
        </div>
      </div>
      <div class="pt-4 lg:pt-0 lg:w-4/12">
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
            <div v-if="product.requests" class="pt-2 text-sm text-gray-400">
              "{{ product.requests }}"
            </div>
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
        <button
          class="bg-primary hover:bg-secondary transition-colors duration-200 px-8 py-2 text-white text-xl rounded mt-8 font-bold block mx-auto"
          tabindex="-1"
          @click.prevent="process"
        >
          Complete Order
        </button>
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
        sameDay: "[today at] h:mm A", // The same day ( Today at 2:30 AM )
        nextDay: "[tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
        nextWeek: "[on] dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
        sameElse: "[on] dddd MM/DD/YYYY [at] h:mm A" // Everything else ( 7/10/2011 )
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
    location: get("order/location"),
    name: sync("order/name"),
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
    },
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
    applePay() {
      alert("Apple Pay!");
    },
    edit() {
      this.$store.set("cart/open", false);
      this.activeComponent = "OrderMenu";
    },
    process() {
      alert("Checkout!");
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
