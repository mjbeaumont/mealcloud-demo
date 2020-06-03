import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "@/assets/css/tailwind.css";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

Vue.config.productionTip = false;

Vue.prototype.$backToTop = () => {
  window.scroll({ top: 0, left: 0 });
  window.parent.postMessage("backToTop", "http://kimchikrunch.seoulspice.com");
};

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
