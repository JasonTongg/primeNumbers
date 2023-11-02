import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  let mode = ref(false);

  return { mode };
});
