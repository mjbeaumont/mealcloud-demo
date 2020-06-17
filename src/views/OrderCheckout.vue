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

        <CheckoutContact :email="email" :name="name" :phone="phone" />
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
import MCCheckbox from "@/components/UI/MCCheckbox/MCCheckbox";
import CheckoutProduct from "@/components/Checkout/CheckoutProduct";
import CheckoutLocation from "@/components/Checkout/CheckoutLocation";
import CheckoutContact from "@/components/Checkout/CheckoutContact";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    CheckoutContact,
    CheckoutLocation,
    CheckoutProduct,
    MCCheckbox,
    ValidationObserver
  },
  computed: {
    activeComponent: sync("activeComponent"),
    gratuity: get("order/gratuity"),
    gratuityRate: get("order/gratuityRate"),
    instructions: sync("order/instructions"),
    instructionsClass() {
      return this.showInstructions ? "block" : "hidden";
    },
    instructionsIcon() {
      return this.showInstructions ? ["fas", "minus"] : ["fas", "plus"];
    },

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
  name: "OrderCheckout"
};
</script>
