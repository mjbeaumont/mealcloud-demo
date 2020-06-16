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
        class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
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
