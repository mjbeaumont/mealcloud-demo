<template>
  <Dialog
    :modal="true"
    :visible.sync="customizing"
    class="w-full bg-white rounded-sm text-black p-4 pb-8 lg:w-3/4 max-w-screen-md"
    position="top"
    ><div class="font-bold text-3xl mb-4">{{ editProduct.name }}</div>
    <div class="text-l text-gray-700">
      {{ editProduct.description }}
    </div>
    <div class="text-l text-gray-700">
      <p class="py-8 font-bold">
        <a @click.prevent="toggleRequest" class="cursor-pointer"
          ><font-awesome-icon :icon="requestIcon"></font-awesome-icon> Add
          Special Request</a
        >
      </p>
      <textarea
        class="border border-gray-700 w-full h-32 p-2"
        :class="requestClass"
        placeholder="Do you have any special requests?"
        v-model="editProduct.requests"
        tabindex="-1"
      ></textarea>
    </div>
    <div class="pt-12 flex flex-col md:flex-row md:items-center">
      <div class="w-3/4 mx-auto mb-8 md:mb-0 md:w-1/2">
        <input-number
          showButtons
          buttonLayout="horizontal"
          :step="1"
          :min="1"
          :max="20"
          v-model="editProduct.qty"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          class="w-full"
          tabindex="-1"
          id="menu-quantity-input"
        ></input-number>
        <input type="hidden" tabindex="1" />
      </div>
      <div class="w-full flex justify-center md:justify-end">
        <button
          class="bg-primary hover:bg-secondary transition-colors duration-200 text-white border border-gray-700 px-6 text-sm rounded w-3/4 py-4 text-l md:text-xl"
          @click="updateCart"
          tabindex="-1"
        >
          <span class="font-bold">{{ buttonText }}</span> -
          {{ subtotal | currency }}
        </button>
      </div>
    </div>
    <font-awesome-icon
      :icon="['fas', 'times']"
      class="text-2xl absolute top-0 right-0 mt-4 mr-4"
      @click="close"
    ></font-awesome-icon> </Dialog
></template>

<script>
import { get, sync } from "vuex-pathify";
import { clone } from "@/utils/helpers";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
export default {
  components: { Dialog, InputNumber },
  computed: {
    buttonText() {
      return this.existingProduct ? "Update Order" : "Add To Order";
    },
    existingProduct() {
      return this.$store.get("cart/product", this.product.productId);
    },
    product: get("menu/product"),
    requestClass() {
      return this.showRequests ? "block" : "hidden";
    },
    requestIcon() {
      return this.showRequests ? ["fas", "minus"] : ["fas", "plus"];
    },
    subtotal() {
      return this.editProduct.price * this.editProduct.qty;
    },
    customizing: sync("menu/customizing")
  },
  data() {
    return {
      editProduct: {},
      showRequests: false
    };
  },
  methods: {
    close() {
      this.editProduct = {};
      this.customizing = false;
      this.showRequests = false;
    },
    setupEdit() {
      this.editProduct = clone(this.product);
      if (this.existingProduct) {
        this.editProduct.qty = this.existingProduct.qty;
        this.editProduct.requests = this.existingProduct.requests;
      }
    },
    toggleRequest() {
      this.showRequests = !this.showRequests;
    },
    updateCart() {
      this.$store.set("cart/setProduct!", this.editProduct);
      this.close();
    }
  },
  mounted() {
    this.setupEdit();
  },
  name: "MenuCustomize",
  watch: {
    customizing(val) {
      if (val) {
        this.setupEdit();
      }
    }
  }
};
</script>

<style></style>
