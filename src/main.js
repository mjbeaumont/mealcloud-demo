import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "@/assets/css/tailwind.css";
import "primevue/resources/primevue.min.css";
import smoothscroll from "smoothscroll-polyfill";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingBag,
  faArrowRight,
  faArrowLeft,
  faClock,
  faMapMarkerAlt,
  faChevronDown,
  faEdit,
  faTimes,
  faTrash,
  faCheckCircle,
  faPlus,
  faMinus,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faFacebookSquare,
  faApplePay
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// add fa-icons
library.add(
  faShoppingBag,
  faArrowRight,
  faClock,
  faArrowLeft,
  faMapMarkerAlt,
  faChevronDown,
  faEdit,
  faTimes,
  faTrash,
  faCheckCircle,
  faPlus,
  faMinus,
  faInstagram,
  faTwitter,
  faFacebookSquare,
  faApplePay,
  faBars
);

// convert fa-icons to SVG
dom.watch();

// register fa-icon component globally
Vue.component("font-awesome-icon", FontAwesomeIcon);

// polyfill smooth scrolling behavior for all browsers
smoothscroll.polyfill();

// add global method to scroll back to top of page
Vue.prototype.$backToTop = () => {
  window.scroll({ top: 0, left: 0 });
};

// create currency display filter
Vue.filter("currency", function(value) {
  if (!value || isNaN(value)) return "";
  return "$" + Number.parseFloat(value).toFixed(2);
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
