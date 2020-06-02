<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-3xl md:text-5xl"
  >
    <h2 class="font-bold">
      Would you like to order <span class="md:block">Pickup or Delivery?</span>
    </h2>
    <div class="mt-6 flex flex-col md:flex-row">
      <button
        class="mc-input mc-input-dark uppercase py-2 px-8 md:px-0 md:w-64 text-center"
      >
        Delivery
      </button>
      <button
        class="mc-input mc-input-dark uppercase py-2 px-8 mt-6 md:px-0 md:mt-0 md:ml-6 md:w-64 text-center"
      >
        Pickup
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderType"
};
</script>

<style scoped></style>
