<template>
  <ValidationProvider
    :name="name"
    :rules="rules"
    v-slot="{ errors, classes }"
    slim
    :debounce="debounce"
  >
    <span :class="classes">
      <slot></slot>
      <span
        class="font-medium inline-block py-1 px-2 tracking-wide bg-black text-yellow-400 text-sm mt-1 ml-1"
        v-if="errors.length"
        >{{ errors[0] }}</span
      >
    </span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationProvider
  },
  name: "ValidatedInput",
  props: {
    rules: String,
    name: String,
    debounce: {
      type: Number,
      default: 300
    }
  }
};
</script>

<style scoped></style>
