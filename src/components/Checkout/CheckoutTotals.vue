<template>
  <div class="pt-8 w-full">
    <p v-if="tax > 0" class="w-full flex justify-between">
      <span class="font-bold inline-block pr-8"
        >Sales Tax ({{ taxRate }}%):</span
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
</template>
<script>
import { get } from "vuex-pathify";

export default {
  computed: {
    gratuity: get("order/gratuity"),
    gratuityRate: get("order/gratuityRate"),
    tax: get("order/tax"),
    taxRate: get("order/location@taxRate"),
    total: get("order/total")
  },
  name: "CheckoutTotals"
};
</script>
