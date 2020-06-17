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
        <CheckoutLocation></CheckoutLocation>
        <CheckoutContact></CheckoutContact>
        <CheckoutInstructions></CheckoutInstructions>
        <CheckoutPayment></CheckoutPayment>
      </div>
      <div class="pt-4 lg:pt-0 lg:w-4/12">
        <!-- Right side desktop -->
        <CheckoutCart></CheckoutCart>
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
import { ValidationObserver } from "vee-validate";
import CheckoutLocation from "@/components/Checkout/CheckoutLocation";
import CheckoutContact from "@/components/Checkout/CheckoutContact";
import CheckoutInstructions from "@/components/Checkout/CheckoutInstructions";
import CheckoutPayment from "@/components/Checkout/CheckoutPayment";
import CheckoutCart from "./CheckoutCart";

export default {
  components: {
    CheckoutCart,
    CheckoutPayment,
    CheckoutInstructions,
    CheckoutContact,
    CheckoutLocation,
    ValidationObserver
  },
  computed: {
    activeComponent: sync("activeComponent"),
    gratuity: get("order/gratuity"),
    gratuityRate: get("order/gratuityRate"),
    instructions: sync("order/instructions"),

    tax: get("order/tax"),
    taxRate: get("order/location@taxRate"),
    total: get("order/total")
  },

  methods: {
    process() {
      alert("Checkout!");
    }
  },
  name: "OrderCheckout"
};
</script>
