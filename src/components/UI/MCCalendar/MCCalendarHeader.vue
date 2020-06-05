<template>
  <div class="flex justify-between">
    <a
      class="cursor-pointer text-2xl md:text-3xl"
      @click.prevent="prev"
      :class="prevClass"
      ><font-awesome-icon :icon="['fas', 'arrow-left']"></font-awesome-icon
    ></a>
    <div class="uppercase font-bold text-2xl md:text-3xl">{{ heading }}</div>
    <a
      class="cursor-pointer text-2xl md:text-3xl"
      @click.prevent="next"
      :class="nextClass"
      ><font-awesome-icon :icon="['fas', 'arrow-right']"></font-awesome-icon
    ></a>
  </div>
</template>
<script>
export default {
  computed: {
    heading() {
      return this.activeDate.format("MMMM YYYY");
    },
    nextClass() {
      return !this.maximumDate ||
        this.activeDate.startOf("month") < this.maximumDate.startOf("month")
        ? "visible"
        : "invisible";
    },
    prevClass() {
      return !this.minimumDate ||
        this.activeDate.startOf("month") > this.minimumDate.startOf("month")
        ? "visible"
        : "invisible";
    }
  },
  methods: {
    next() {
      this.$emit("nav", this.activeDate.add(1, "month"));
    },
    prev() {
      this.$emit("nav", this.activeDate.subtract(1, "month"));
    }
  },
  name: "MCCalendarHeader",
  props: {
    activeDate: {
      type: Object,
      required: true
    },
    maximumDate: {
      type: Object
    },
    minimumDate: {
      type: Object
    }
  }
};
</script>
