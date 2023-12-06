import { defineStore } from "pinia";
import { ref } from "vue";
import {
  empat,
  lima,
  enam,
  tujuh,
  delapan,
  sembilan,
  sepuluh,
  sebelas,
  duabelas,
  tigabelas,
  empatbelas,
  limabelas,
} from "../assets/data/prime";

export const useCounterStore = defineStore(
  "counter",
  () => {
    let mode = ref(false);
    let countTime = ref(3);
    let pemulaModule = ref({
      materi: [
        {
          title: "Bilangan Prima",
          progress: 0,
          end: 4,
          show: true,
        },
        {
          title: "Mengetahui Bilangan Prima",
          progress: 0,
          end: 3,
          show: false,
        },
      ],
      quiz: [
        {
          title: "Perkenalan",
          progress: 0,
          end: 2,
          show: false,
        },
        {
          title: "Quiz",
          progress: 0,
          end: 1,
          show: false,
        },
      ],
    });

    let amatirModule = ref({
      materi: [
        {
          title: "Faktor Persekutuan Terbesar",
          progress: 0,
          end: 3,
          show: true,
        },
        {
          title: "Relatif Prima",
          progress: 0,
          end: 2,
          show: false,
        },
        {
          title: "Kongruensi",
          progress: 0,
          end: 5,
          show: false,
        },
        {
          title: "Fermat Primality Test",
          progress: 0,
          end: 6,
          show: false,
        },
        {
          title: "Lehmer Primality Test",
          progress: 0,
          end: 3,
          show: false,
        },
      ],
      quiz: [
        {
          title: "Perkenalan",
          progress: 0,
          end: 3,
          show: false,
        },
        {
          title: "Quiz",
          progress: 0,
          end: 1,
          show: false,
        },
      ],
    });

    let amatirQuizQuestion = [
      empat,
      lima,
      enam,
      tujuh,
      delapan,
      sembilan,
      sepuluh,
      sebelas,
      duabelas,
      tigabelas,
      empatbelas,
      limabelas,
    ];

    let updatePemulaBilanganPrima = (newProgress) => {
      pemulaModule.value.materi[0].progress = newProgress;
    };
    let updatePemulaMengetahuiBilanganPrima = (newProgress) => {
      pemulaModule.value.materi[1].progress = newProgress;
    };
    let updateAmatirModule = (newProgress, index) => {
      amatirModule.value.materi[index].progress = newProgress;
    };
    let updateQuizModule = (level, newProgress, index) => {
      console.log(level, newProgress, index);
      if (level === "pemula") {
        pemulaModule.value.quiz[index].progress = newProgress;
      } else {
        amatirModule.value.quiz[index].progress = newProgress;
      }
    };

    let showMateriSection = (level, idx, value) => {
      if (level === "pemula") {
        pemulaModule.value.materi[idx].show = value;
      } else {
        amatirModule.value.materi[idx].show = value;
      }
    };

    let showQuizSection = (level, idx, value) => {
      if (level === "pemula") {
        pemulaModule.value.quiz[idx].show = value;
      } else {
        amatirModule.value.quiz[idx].show = value;
      }
    };

    return {
      mode,
      pemulaModule,
      amatirModule,
      updatePemulaBilanganPrima,
      updatePemulaMengetahuiBilanganPrima,
      showSection: showMateriSection,
      showQuizSection,
      countTime,
      updateAmatirModule,
      updateQuizModule,
      amatirQuizQuestion,
    };
  },
  { persist: true }
);
