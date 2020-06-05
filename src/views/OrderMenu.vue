<template>
  <div class="mx-auto px-16 flex flex-col items-center min-h-screen">
    <MenuHeader></MenuHeader>
  </div>
</template>

<script>
import BackToTop from "@/mixins/BackToTop";
import MenuHeader from "@/components/Menu/MenuHeader";
export default {
  components: { MenuHeader },
  mixins: [BackToTop],
  name: "OrderMenu"
};
</script>

<style scoped></style>
