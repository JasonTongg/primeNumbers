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
          <div class="count">3</div>
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
            Misalnya bilangan bulat 2, 9 dan 16, semuanya menyisakan sisa 2 bila
            dibagi 7
          </p>
          <p>Sehingga kita tulis 16 = 9 = 2 (mod 7)</p>
          <div class="clock">
            <div
              class="clock-arrow"
              :style="{
                transform: `translate(-50%, 0) rotateZ(${
                  (360 * totalModulo) / totalClockNumber
                }deg)`,
              }"
            ></div>
            <div
              class="clock-number"
              v-for="(number, index) in totalClockNumber"
              :key="index"
              :style="{
                transform: `translate(-50%, 0) rotateZ(${
                  (360 * number) / totalClockNumber
                }deg)`,
              }"
            >
              <p
                :style="{
                  transform: `rotateZ(${
                    ((360 * number) / totalClockNumber) * -1
                  }deg)`,
                }"
              >
                {{ number }}
              </p>
            </div>
          </div>
          <div class="description">
            <div class="moduloInput">
              <input type="number" v-model="totalClockNumber" />
              <p>MOD</p>
              <input type="number" v-model="totalModulo" />
              <p>
                = &nbsp;{{
                  isNaN(totalClockNumber % totalModulo)
                    ? 0
                    : totalClockNumber % totalModulo
                }}
              </p>
            </div>
            <p>atau</p>
            <p>
              {{ totalClockNumber }} &nbsp; = &nbsp;
              {{
                isNaN(totalClockNumber % totalModulo)
                  ? 0
                  : totalClockNumber % totalModulo
              }}
              &nbsp; (mod {{ totalModulo }})
            </p>
          </div>
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
let data = amatirModule.value.materi[2];
let totalClockNumber = ref(6);
let totalModulo = ref(0);

if (data.progress !== data.end) {
  store.updateAmatirModule(3, 2);
}

let prev = () => {
  router.push("/amatir/kongruensi/2");
};
let next = () => {
  if (right.value.classList.contains("active"))
    router.push("/amatir/kongruensi/4");
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
        color: $black;

        & > * {
          font-size: 1.2rem;
          margin: 0;
          text-align: center;
        }

        .moduloInput {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;

          input {
            width: 60px;
            text-align: center;
            color: $white;

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            &[type="number"] {
              -moz-appearance: textfield;
            }
          }
        }

        .description {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          p {
            margin: 0;
          }
        }

        .clock {
          background-color: black;
          color: white;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          position: relative;
          margin-inline: auto;

          .clock-arrow {
            position: absolute;
            top: 20%;
            left: 50%;
            transform-origin: center bottom;
            width: 5px;
            height: 30%;
            background-color: white;
            transition: all 1s linear;
            transform: translate(-50%, 0) rotateZ(0deg);
          }

          .clock-number {
            position: absolute;
            top: 5%;
            left: 50%;
            transform-origin: center bottom;
            width: 5px;
            height: 45%;

            p {
              margin: 0;
              font-size: 0.8rem;
            }
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
