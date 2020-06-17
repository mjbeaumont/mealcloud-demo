<template>
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
</template>
<script>
export default {
  data() {
    return {
      paymentMethod: "card"
    };
  },
  methods: {
    applePay() {
      alert("Apple Pay!");
    }
  },
  name: "CheckoutPayment"
};
</script>
