<template>
  <div class="flex justify-between">
    <a class="cursor-pointer" @click.prevent="prev" :class="prevClass"
      ><span
        class="pi pi-arrow-left leading-relaxed text-2xl md:text-3xl"
      ></span
    ></a>
    <div class="uppercase font-bold text-2xl md:text-3xl">{{ heading }}</div>
    <a class="cursor-pointer" @click.prevent="next" :class="nextClass"
      ><span
        class="pi pi-arrow-right leading-relaxed text-2xl md:text-3xl"
      ></span
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
