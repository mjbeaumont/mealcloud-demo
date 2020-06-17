<template>
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
</template>
<script>
import ValidatedInput from "@/components/UI/ValidatedInput/ValidatedInput";
import { sync } from "vuex-pathify";

export default {
  components: { ValidatedInput },
  computed: {
    email: sync("order/email"),
    name: sync("order/name"),
    phone: sync("order/phone")
  },
  name: "CheckoutContact",
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
