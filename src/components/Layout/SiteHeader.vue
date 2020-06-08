<template>
  <div class="bg-primary h-16 w-full fixed top-0 left-0 flex">
    <div class="w-1/2 h-full flex items-center justify-start">
      <a href="https://www.unconventionaldiner.com/" rel="home"
        ><img
          src="https://www.unconventionaldiner.com/wp-content/uploads/2017/11/ud_logo_topbar.png"
          class="w-8 ml-4"
      /></a>
    </div>
    <div class="w-1/2 flex items-center justify-end pr-4 pl-16">
      <ul role="menubar" class="flex w-full justify-between site-nav uppercase">
        <li role="menuitem">
          <a
            href="https://www.unconventionaldiner.com/#accordion"
            class="hover:underline"
            >Menus</a
          >
        </li>
        <li role="menuitem">
          <a
            href="https://www.unconventionaldiner.com/#buzz"
            class="hover:underline"
            >Buzz</a
          >
        </li>
        <li role="menuitem">
          <a
            href="https://underlineonaldiner.com/#private-events"
            class="hover:underline"
            >Groups/Events</a
          >
        </li>
        <li role="menuitem">
          <a href="#contact" class="hover:underline">Contact</a>
        </li>
        <li role="menuitem">
          <a
            href="https://trycaviar.app.link/xaAWinyFnY"
            class="border border-white p-2 hover:underline"
            >Delivery</a
          >
        </li>
        <li id="menu-item-659" role="menuitem">
          <a class="border border-white p-2" href="#">Pickup</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "SiteHeader"
};
</script>
<style lang="scss">
.site-nav {
  font-family: Futura, serif;
}
</style>
