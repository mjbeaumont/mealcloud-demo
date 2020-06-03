<template>
  <div class="mx-auto max-w-screen-md flex flex-col items-center min-h-screen">
    <h2 class="question-text">Menu goes here.</h2>
  </div>
</template>

<script>
import BackToTop from "@/mixins/BackToTop";
export default {
  mixins: [BackToTop],
  name: "OrderMenu"
};
</script>

<style scoped></style>
