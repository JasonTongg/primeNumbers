import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  let mode = ref(false);
  let pemulaModule = ref({
    materi: [
      {
        title: "Bilangan Prima",
        progress: 1,
        end: 4,
        show: true,
      },
      {
        title: "Mengetahui Bilangan Prima",
        progress: 1,
        end: 3,
        show: true,
      },
    ],
    quiz: [
      {
        title: "Perkenalan",
        progress: 0,
        end: 12,
        show: false,
      },
      {
        title: "Quiz",
        progress: 0,
        end: 12,
        show: false,
      },
    ],
  });

  let amatirModule = ref({
    materi: [
      {
        title: "Bilangan Prima",
        progress: 12,
        end: 12,
        show: true,
      },
      {
        title: "Mengetahui Bilangan Prima",
        progress: 5,
        end: 12,
        show: true,
      },
      {
        title: "Cara Cepat Bilangan Prima",
        progress: 0,
        end: 12,
        show: false,
      },
    ],
    quiz: [
      {
        title: "Perkenalan",
        progress: 0,
        end: 12,
        show: false,
      },
      {
        title: "Quiz",
        progress: 0,
        end: 12,
        show: false,
      },
    ],
  });

  return { mode, pemulaModule, amatirModule };
});
