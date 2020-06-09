<template>
  <footer
    class="footer flex justify-center items-center bg-black h-12 fixed w-full bottom-0 font-bold uppercase text-lg -ml-2"
  >
    <ul>
      <li class="pr-1 inline-block align-middle">
        <a href="https://www.instagram.com/unconventionaldiner">
          <font-awesome-icon
            :icon="['fab', 'instagram']"
            class="text-4xl"
          ></font-awesome-icon>
        </a>
        <a
          href="https://www.facebook.com/unconventionaldiner"
          class="pl-4 hover:text-primary"
        >
          <font-awesome-icon
            :icon="['fab', 'facebook-square']"
            class="text-4xl"
          ></font-awesome-icon>
        </a>
        <a
          href="https://www.twitter.com/uncondiner"
          class="pl-4 mr-1 hover:text-primary"
        >
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            class="text-4xl"
          ></font-awesome-icon>
        </a>
      </li>
      <li
        class="px-1 border-l border-white pl-4 inline-block align-middle hover:text-primary"
      >
        <a
          target="_blank"
          href="https://goo.gl/maps/8TcSfxBuYC82"
          rel="noopener noreferrer"
          >1207 9TH ST., NW, WASHINGTON, DC 20001</a
        >
      </li>
      <li class="px-1 border-l border-white inline-block align-middle">
        <a href="tel:202-847-0122">202.847.0122</a>
      </li>
      <li class="px-1 border-l border-white inline-block align-middle">
        <a href="https://www.unconventionaldiner.com#reservation-marker"
          >RESERVATIONS</a
        >
      </li>
      <li class="pl-1 border-l border-white inline-block align-middle">
        <a href="https://www.unconventionaldiner.com#contact">SUBSCRIBE</a
        ><a></a>
      </li>
    </ul>
  </footer>
</template>
<script>
export default {
  name: "SiteFooter"
};
</script>
<style lang="scss">
html,
body {
  background: #cb6671;
}

.footer {
  font-family: "helvetica neue", Helvetica, Roboto, Arial, sans-serif;
}
</style>
