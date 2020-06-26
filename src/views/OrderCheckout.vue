<template>
  <div class="w-full">
    <ValidationObserver
      ref="checkoutForm"
      slim
      class="w-full lg:flex lg:flex-no-wrap lg:max-w-screen-lg lg:justify-between mx-auto"
    >
      <div class="lg:w-7/12">
        <!-- left side desktop -->
        <h2 class="text-xl font-bold">Review and Complete Your Order</h2>
        <CheckoutLocation></CheckoutLocation>
        <CheckoutContact></CheckoutContact>
        <CheckoutInstructions></CheckoutInstructions>
        <CheckoutPayment :charge="charge" @payment="complete"></CheckoutPayment>
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
import { get, sync } from "vuex-pathify";
import { ValidationObserver } from "vee-validate";
import CheckoutLocation from "@/components/Checkout/CheckoutLocation";
import CheckoutContact from "@/components/Checkout/CheckoutContact";
import CheckoutInstructions from "@/components/Checkout/CheckoutInstructions";
import CheckoutPayment from "@/components/Checkout/CheckoutPayment";
import CheckoutCart from "@/components/Checkout/CheckoutCart";
import CheckoutTotals from "@/components/Checkout/CheckoutTotals";
import axios from "axios";

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
    activeComponent: sync("activeComponent"),
    products: get("cart/products")
  },
  data() {
    return {
      charge: false
    };
  },
  methods: {
    async complete(payload) {
      if (payload.success) {
        await this.send();
      }
      this.charge = false;
      document.getElementById("payment-section").scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    },
    async process() {
      const isValid = await this.$refs.checkoutForm.validate();
      if (isValid) {
        this.charge = true;
      }
    },
    async send() {
      const data = {
        date: this.$store.get("order/dateTime").unix(),
        location: this.$store.get("order/location@id"),
        name: this.$store.get("order/name"),
        email: this.$store.get("order/email"),
        phone: this.$store.get("order/phone"),
        curbside: this.$store.get("order/curbside"),
        utensils: this.$store.get("order/utensils"),
        instructions: this.$store.get("order/instructions"),
        subtotal: this.$store.get("cart/subtotal"),
        tax: this.$store.get("order/tax"),
        gratuity: this.$store.get("order/gratuity"),
        total: this.$store.get("order/total")
      };
      data.items = this.products.map(product => {
        return {
          description: product.name,
          qty: product.qty,
          price: product.price,
          requests: product.requests
        };
      });

      try {
        await axios.post(
          process.env.VUE_APP_API_BASE + "/api/order/process",
          data
        );
        alert("Order Submitted Successfully");
      } catch (err) {
        alert("Error: " + err);
      }
    }
  },
  name: "OrderCheckout"
};
</script>
