<template>
  <Dialog
    :modal="true"
    :visible.sync="display"
    class="w-full bg-white rounded-sm text-black p-4 pb-8 lg:w-3/4 max-w-screen-md"
    position="top"
    ><div class="font-bold text-3xl mb-4">Product Name</div>
    <div class="text-l text-gray-700">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad atque
      exercitationem quisquam ut? Architecto asperiores assumenda aut non
      repellendus sint tenetur. Dolor dolorem dolorum magnam non officiis
      recusandae soluta!
    </div>
    <div class="text-l text-gray-700">
      <p class="py-8 font-bold">Special Requests</p>
      <textarea
        class="border border-gray-700 w-full h-32 p-2"
        placeholder="Do you have any special requests?"
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
          v-model="qty"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          class="w-full"
        ></input-number>
      </div>
      <div class="w-full flex justify-center">
        <button
          class="bg-green-400 border border-gray-700 px-6 text-sm rounded w-3/4 py-4 text-l md:text-xl"
        >
          <span class="font-bold">Add to Order</span> - $40.00
        </button>
      </div>
    </div>
  </Dialog></template
>

<script>
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
export default {
  components: { Dialog, InputNumber },
  data() {
    return {
      qty: 1
    };
  },
  name: "MenuCustomize",
  props: {
    display: Boolean,
    product: Object
  }
};
</script>

<style>
.p-inputnumber-buttons-horizontal .p-inputnumber-button-up .p-button-icon {
  margin-right: 10px;
}

.p-inputnumber-buttons-horizontal .p-inputnumber-button-down .p-button-icon {
  margin-left: 10px;
}
</style>
