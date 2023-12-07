<template>
  <div class="materi-container">
    <div class="content-container">
      <div class="content-header">
        <div class="dot-container">
          <NuxtLink to="/amatir"
            ><img src="../../../assets/left-arrow.png" alt="back"
          /></NuxtLink>
          <div
            v-for="(item, index) in ['red', 'yellow', 'blue']"
            :key="index"
            :style="{ backgroundColor: item }"
            class="dot"
          ></div>
        </div>
        <div class="pagination-container">
          <div class="left" @click="prev">
            <img src="../../../assets/right.svg" alt="" />
          </div>
          <div class="count">2</div>
          <div ref="right" class="right" @click="next">
            <img src="../../../assets/left.svg" alt="" />
          </div>
          <div ref="counter" class="count2" v-if="countValue > 0">
            {{ countValue }}s
          </div>
        </div>
      </div>
      <div class="content-body">
        <img class="board" src="../../../assets/board.png" alt="" />
        <img class="teacher" src="../../../assets/teacher.png" alt="" />
        <div class="content">
          <p>
            Fermat primality test menyatakan bahwa jika p adalah bilangan prima
            dan a adalah bilangan bulat positif yang lebih dari 1 dan kurang
            dari p, maka a pangkat p -1 kongruensi dengan 1 modulo p
          </p>
          <p class="square-root">a<span>p-1</span> &equiv; 1 (mod p)</p>
          <p>1 &lt; a &lt; p-1</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../../store/index";
import { storeToRefs } from "pinia";

const store = useCounterStore();
const router = useRouter();
const right = ref(null);
let { amatirModule, countTime } = storeToRefs(store);
let countValue = ref(countTime.value);
let data = amatirModule.value.materi[3];

if (data.progress !== data.end) {
  store.updateAmatirModule(2, 3);
}

let prev = () => {
  router.push("/amatir/fermat-primality-test/1");
};
let next = () => {
  if (right.value.classList.contains("active"))
    router.push("/amatir/fermat-primality-test/3");
};

let intervalCounter = setInterval(() => {
  countValue.value--;
}, 1000);

setTimeout(() => {
  right.value.classList.add("active");
  clearInterval(intervalCounter);
}, countTime.value * 1000);
</script>

<style lang="scss" scoped>
.materi-container {
  padding: 0.8rem 0.8rem 3rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .content-container {
    width: 100%;
    height: 100%;
    background-color: $pastelPrimary;
    border-radius: 10px;

    .content-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;

      .dot-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.8rem;

        img {
          width: 30px;
          margin-right: 2rem;
          transition: all 0.3s ease-out;

          &:hover {
            transform: translate(-5px);
          }
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          opacity: 0.5;
        }
      }

      .pagination-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.3rem;

        & > * {
          display: flex;
          justify-content: center;
          align-items: center;
          color: $white;
          padding: 0.3rem;
        }

        .left,
        .right {
          background-color: $primary;
          border-radius: 5px;
          cursor: pointer;

          img {
            height: 15px;
          }
        }

        .right {
          transition: all 0.5s linear;
          opacity: 0.2;
          cursor: auto;
        }
        .right.active {
          opacity: 1;
          cursor: pointer;
        }

        .count2 {
          opacity: 0.7;
          font-size: 0.9rem;
        }
      }
    }

    .content-body {
      position: relative;
      width: 100%;
      height: 100%;

      .content {
        position: absolute;
        left: 30px;
        top: 20px;
        z-index: 2;
        width: calc(100% - 60px);
        height: 400px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;

        & > * {
          font-size: 1.2rem;
          margin: 0;
          text-align: center;
        }

        .square-root {
          span {
            position: relative;
            top: -8px;
            font-size: 0.9rem;
          }
        }
      }

      .board {
        position: absolute;
        top: 0;
        left: 50%;
        width: 95%;
        transform: translateX(-50%);
      }

      .teacher {
        position: absolute;
        right: 0;
        bottom: 10%;
        width: 20%;
      }
    }
  }
}
</style>
