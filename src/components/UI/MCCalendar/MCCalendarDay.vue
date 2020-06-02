<template>
  <a
    class="absolute inset-0 flex items-center justify-center text-xl md:text-2xl"
    @click.prevent="selectDate"
    :disabled="outsideRange"
    :class="additionalClasses"
  >
    {{ contents }}
  </a>
</template>
<script>
export default {
  computed: {
    additionalClasses() {
      let className = this.outsideRange ? "text-gray-800" : "cursor-pointer";
      if (this.isSelected) {
        className += " bg-green-400 font-bold ";
      } else {
        className += " bg-white bg-opacity-50";
      }
      return className;
    },
    contents() {
      return this.activeDate.month() === this.date.month()
        ? this.date.date()
        : "";
    },
    isSelected() {
      return this.selectedDate && this.selectedDate.isSame(this.date);
    },
    outsideRange() {
      return (
        (this.minimumDate && this.date.isBefore(this.minimumDate)) ||
        (this.maximumDate && this.date.isAfter(this.maximumDate()))
      );
    }
  },
  name: "MCCalendarDay",
  methods: {
    selectDate() {
      this.$emit("choose", this.date);
    }
  },
  props: {
    date: {
      type: Object,
      required: true
    },
    activeDate: {
      type: Object,
      required: true
    },
    maximumDate: {
      type: Object
    },
    minimumDate: {
      type: Object
    },
    selectedDate: {
      type: Object
    }
  }
};
</script>
