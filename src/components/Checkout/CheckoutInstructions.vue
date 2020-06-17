<template>
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
        >
          <font-awesome-icon :icon="instructionsIcon"></font-awesome-icon>
          Add Special Instructions</a
        >
      </p>
      <textarea
        class="border border-gray-700 placeholder-gray-500 w-full h-32 p-2 text-black"
        :class="instructionsClass"
        placeholder="e.g. Please include extra ketchup. "
        v-model="instructions"
        tabindex="-1"
      ></textarea>
    </div>
  </div>
</template>
<script>
import MCCheckbox from "@/components/UI/MCCheckbox/MCCheckbox";
import { sync } from "vuex-pathify";

export default {
  computed: {
    curbside: sync("order/curbside"),
    utensils: sync("order/utensils"),
    instructions: sync("order/instructions"),
    instructionsClass() {
      return this.showInstructions ? "block" : "hidden";
    },
    instructionsIcon() {
      return this.showInstructions ? ["fas", "minus"] : ["fas", "plus"];
    }
  },
  data() {
    return {
      showInstructions: false
    };
  },
  name: "CheckoutInstructions",
  components: { MCCheckbox }
};
</script>
