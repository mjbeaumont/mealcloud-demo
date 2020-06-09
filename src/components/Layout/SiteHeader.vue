<template>
  <div class="bg-primary h-12 lg:h-16 w-full fixed top-0 left-0 flex flex-wrap">
    <div class="w-full lg:w-1/4 h-full flex items-center justify-start">
      <button
        @click.prevent="toggleMobile"
        class="toggle-mobile ml-4 lg:hidden"
      ></button>
      <a href="https://www.unconventionaldiner.com/" rel="home"
        ><img
          src="https://www.unconventionaldiner.com/wp-content/uploads/2017/11/ud_logo_topbar.png"
          class="h-6 lg:h-10 ml-4"
      /></a>
    </div>
    <div
      class="w-full lg:w-3/4 items-center justify-end lg:pr-4 lg:pl-16 bg-primary mobile-dropdown"
      :class="mobileNavClass"
    >
      <ul
        role="menubar"
        class="mx-auto flex flex-col items-center lg:mx-0 lg:block site-nav uppercase"
      >
        <li role="menuitem" class="lg:inline-block lg:ml-6 py-2">
          <a
            href="https://www.unconventionaldiner.com/#accordion"
            class="hover:underline"
            >Menus</a
          >
        </li>
        <li role="menuitem" class="lg:inline-block lg:ml-6 py-2">
          <a
            href="https://www.unconventionaldiner.com/#buzz"
            class="hover:underline"
            >Buzz</a
          >
        </li>
        <li role="menuitem" class="lg:inline-block lg:ml-6 py-2">
          <a
            href="https://underlineonaldiner.com/#private-events"
            class="hover:underline"
            >Groups/Events</a
          >
        </li>
        <li role="menuitem" class="lg:inline-block lg:ml-6 py-2">
          <a href="#contact" class="hover:underline">Contact</a>
        </li>
        <li role="menuitem" class="lg:inline-block lg:ml-6 py-2">
          <a
            href="https://trycaviar.app.link/xaAWinyFnY"
            class="lg:border lg:border-white lg:p-2 hover:underline"
            >Delivery</a
          >
        </li>
        <li role="menuitem" class="lg:inline-block lg:ml-6 py-2">
          <a class="lg:border lg:border-white lg:p-2" href="#">Pickup</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    mobileNavClass() {
      return this.open ? "open" : "";
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    toggleMobile() {
      this.open = !this.open;
    }
  },
  name: "SiteHeader"
};
</script>
<style lang="scss">
.site-nav {
  font-family: Futura, serif;
}

.toggle-mobile {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 16px;
  cursor: pointer;
}

.toggle-mobile:after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 2px;
  background: #fff;
  -webkit-box-shadow: 0 7px 0 #fff, 0 14px 0 #fff;
  box-shadow: 0 7px 0 #fff, 0 14px 0 #fff;
  content: "";
}

.mobile-dropdown {
  @apply hidden;
  &.open {
    @apply flex;
  }

  @media screen and (min-width: 1024px) {
    @apply flex;
  }
}
</style>
