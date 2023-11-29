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
      </div>
      <div class="popup-backdrop" v-if="showPopup">
        <div class="popup-content">
          <h2>Selamat</h2>
          <h3>Bagian ini telah selesai..</h3>
          <div class="buttons">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/amatir/quiz">Berikutnya</NuxtLink>
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
let showPopup = ref(false);
let data = amatirModule.value.materi[0];

console.log(store);
store.updateQuizModule("amatir", 3, 0);
store.showQuizSection("amatir", 1, true);

let prev = () => {
  router.push("/pemula/perkenalan/2");
};
let next = () => {
  showPopup.value = true;
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
  position: relative;

  .content-container {
    width: 100%;
    height: 100%;
    background-color: $pastelPrimary;
    border-radius: 10px;

    .popup-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(37, 36, 60, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;

      .popup-content {
        background-color: $primary;
        color: white;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        border-radius: 15px;
        overflow: hidden;
        animation: show 1s linear;

        h2,
        h3 {
          font-weight: normal;
        }

        h2 {
          margin-top: 1rem;
        }

        h3 {
          margin-bottom: 1rem;
        }

        .buttons {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;

          a {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: white;
            padding: 1rem;

            &:first-of-type {
              background-color: #846cb6;
            }
            &:last-of-type {
              background-color: #49a157;
            }
          }
        }
      }
    }

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

@keyframes show {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
