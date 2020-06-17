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
        <CheckoutTotals></CheckoutTotals>
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
import { sync } from "vuex-pathify";
import { ValidationObserver } from "vee-validate";
import CheckoutLocation from "@/components/Checkout/CheckoutLocation";
import CheckoutContact from "@/components/Checkout/CheckoutContact";
import CheckoutInstructions from "@/components/Checkout/CheckoutInstructions";
import CheckoutPayment from "@/components/Checkout/CheckoutPayment";
import CheckoutCart from "@/components/Checkout/CheckoutCart";
import CheckoutTotals from "@/components/Checkout/CheckoutTotals";

export default {
  components: {
    CheckoutTotals,
    CheckoutCart,
    CheckoutPayment,
    CheckoutInstructions,
    CheckoutContact,
    CheckoutLocation,
    ValidationObserver
  },
  computed: {
    activeComponent: sync("activeComponent")
  },
  methods: {
    process() {
      alert("Checkout!");
    }
  },
  name: "OrderCheckout"
};
</script>
