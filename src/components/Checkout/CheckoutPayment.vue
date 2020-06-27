<template>
  <div class="py-8 border-b border-gray-700" id="payment-section">
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
    <div v-show="paymentMethod === 'card'">
      <div id="card-payment" class="bg-white py-4 px-2 rounded"></div>
      <span
        class="font-medium inline-block py-1 px-2 tracking-wide bg-black text-yellow-400 text-sm mt-1 ml-1"
        v-if="cardError"
        >{{ cardError }}</span
      >
    </div>

    <div v-show="paymentMethod === 'apple'">
      <button class="w-full bg-black text-white mt-2 rounded" @click="applePay">
        <font-awesome-icon
          :icon="['fab', 'apple-pay']"
          size="3x"
        ></font-awesome-icon>
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { sync } from "vuex-pathify";
import { loadStripe } from "@stripe/stripe-js";

export default {
  computed: {
    loading: sync("loading")
  },
  async created() {
    this.stripe = await this.loadStripe();
    this.clientSecret = await this.getPaymentIntent();
    this.card = this.createCardElement();
  },
  data() {
    return {
      card: null,
      cardError: "",
      clientSecret: "",
      paymentMethod: "card",
      stripe: null
    };
  },
  methods: {
    applePay() {
      alert("Apple Pay!");
    },
    createCardElement() {
      const elements = this.stripe.elements();
      const style = {
        base: {
          fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          fontSize: "16px",
          "::placeholder": {
            color: "#a0aec0"
          }
        }
      };
      const card = elements.create("card", style);
      card.mount("#card-payment");
      card.on("change", e => {
        if (e.error) {
          this.cardError = e.error.message;
        } else {
          this.cardError = "";
        }
      });
      return card;
    },
    async doCharge() {
      const payload = {};
      const response = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card
        }
      });
      if (response.error) {
        this.cardError = response.error.message;
        payload.success = false;
        this.loading = false;
      } else {
        payload.success = true;
        payload.id = response.paymentIntent.id;
      }

      this.$emit("payment", payload);
    },
    async getPaymentIntent() {
      const response = await axios.post(
        process.env.VUE_APP_API_BASE + "/api/order/intent",
        {
          amount: this.$store.get("order/total")
        }
      );
      return response.data.client_secret;
    },
    async loadStripe() {
      if (!this.stripe) {
        return await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
      }
    }
  },
  name: "CheckoutPayment",
  props: {
    charge: Boolean
  },
  watch: {
    charge(val) {
      if (val) {
        this.doCharge();
      }
    },
    paymentMethod(val) {
      if (val === "card" && !this.card) {
        this.createCardElement();
      }
    }
  }
};
</script>
