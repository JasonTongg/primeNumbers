<template>
  <div class="materi-container">
    <div class="content-container">
      <div class="content-header">
        <div class="dot-container">
          <NuxtLink to="/pemula"
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
          <div class="left">
            <img src="../../../assets/right.svg" alt="" />
          </div>
          <div class="count">1</div>
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
          <div class="prime-example">
            <p>2 <Icon name="mingcute:arrow-right-line"></Icon></p>
            <p>
              2 : 1 = 2
              <span style="font-size: 1rem"
                ><Icon name="mingcute:arrow-right-line"></Icon> dibagi oleh
                1</span
              >
            </p>
            <p></p>
            <p>
              2 : 2 = 1
              <span style="font-size: 1rem"
                ><Icon name="mingcute:arrow-right-line"></Icon> dibagi oleh
                angka sendiri</span
              >
            </p>
          </div>
          <p style="text-align: center">Maka 2 adalah bilangan prima</p>
          <div class="prime-example">
            <p>3 <Icon name="mingcute:arrow-right-line"></Icon></p>
            <p>
              3 : 1 = 3
              <span style="font-size: 1rem"
                ><Icon name="mingcute:arrow-right-line"></Icon> dibagi oleh
                1</span
              >
            </p>
            <p></p>
            <p>
              3 : 3 = 1
              <span style="font-size: 1rem"
                ><Icon name="mingcute:arrow-right-line"></Icon> dibagi oleh
                angka sendiri</span
              >
            </p>
          </div>
          <p style="text-align: center">Maka 3 adalah bilangan prima</p>
          <div class="prime-example">
            <p>4 <Icon name="mingcute:arrow-right-line"></Icon></p>
            <p>
              4 : 1 = 3
              <span style="font-size: 1rem"
                ><Icon name="mingcute:arrow-right-line"></Icon> dibagi oleh
                1</span
              >
            </p>
            <p></p>
            <p>
              4 : 2 = 2
              <span style="font-size: 1rem"
                ><Icon name="mingcute:arrow-right-line"></Icon> dibagi oleh
                2</span
              >
            </p>
            <p></p>
            <p>
              4 : 4 = 1
              <span style="font-size: 1rem"
                ><Icon name="mingcute:arrow-right-line"></Icon> dibagi oleh
                angka sendiri</span
              >
            </p>
          </div>
          <p style="text-align: center">Maka 4 bukan bilangan prima</p>
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
let { pemulaModule, countTime } = storeToRefs(store);
let countValue = ref(countTime.value);
let data = pemulaModule.value.materi[1];

if (data.progress !== data.end) {
  store.updatePemulaMengetahuiBilanganPrima(1);
}

let next = () => {
  if (right.value.classList.contains("active"))
    router.push("/pemula/mengetahui-bilangan-prima/2");
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
          opacity: 0.8;
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

        .left {
          opacity: 0.2;
          cursor: auto;
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
        gap: 0.5rem;
        justify-content: center;
        color: $black;

        & > * {
          font-size: 1.5rem;
          margin: 0;
        }

        .prime-example {
          display: grid;
          grid-template-columns: 50px auto;
          font-weight: bold;
          justify-content: center;

          & > * {
            display: flex;
            align-items: center;
            gap: 0.5rem;
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
