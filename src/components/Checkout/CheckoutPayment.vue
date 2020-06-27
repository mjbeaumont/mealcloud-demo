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
      <div id="request-button"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { get, sync } from "vuex-pathify";
import { loadStripe } from "@stripe/stripe-js";

export default {
  computed: {
    loading: sync("loading"),
    total: get("order/total")
  },
  async created() {
    this.stripe = await this.loadStripe();
    this.clientSecret = await this.getPaymentIntent();
    this.paymentRequest = this.createPaymentRequest();
    this.card = this.createCardElement();
    this.request = this.createRequestElement();
    await this.mountButtons();
  },
  data() {
    return {
      card: null,
      cardError: "",
      clientSecret: "",
      paymentMethod: "card",
      paymentRequest: null,
      request: null,
      stripe: null,
      cardStyle: {
        base: {
          fontFamily: "Avenir, Helvetica, Arial, sans-serif",
          fontSize: "16px",
          "::placeholder": {
            color: "#a0aec0"
          }
        }
      }
    };
  },
  methods: {
    applePay() {
      alert("Apple Pay!");
    },
    createCardElement() {
      const elements = this.stripe.elements();
      const card = elements.create("card", this.cardStyle);
      card.on("change", e => {
        if (e.error) {
          this.cardError = e.error.message;
        } else {
          this.cardError = "";
        }
      });
      return card;
    },
    createRequestElement() {
      const elements = this.stripe.elements();
      return elements.create("paymentRequestButton", {
        paymentRequest: this.paymentRequest
      });
    },
    createPaymentRequest() {
      return this.stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Order total",
          amount: this.total,
          requestPayerName: true,
          requestPayerEmail: true,
          requestPayerPhone: true
        }
      });
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
    },
    async mountButtons() {
      this.card.mount("#card-payment");
      const result = await this.paymentRequest.canMakePayment();
      if (result) {
        this.request.mount("request-button");
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
