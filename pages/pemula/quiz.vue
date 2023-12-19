<template>
  <div class="quiz-container">
    <div class="content-container">
      <img src="../../assets/mountain.png" alt="" />
      <div class="header-container">
        <div class="dot-container">
          <NuxtLink to="/pemula"
            ><img src="../../assets/left-arrow.png" alt="back"
          /></NuxtLink>
          <div
            class="dot"
            v-for="(color, index) in dots"
            :key="index"
            :style="{ backgroundColor: color }"
          ></div>
        </div>
        <div class="score-container">Score {{ score }}/1000</div>
        <div class="time-container">
          0{{ minute }}:{{ second < 10 ? "0" + second : second }}
        </div>
      </div>
      <h2>Mencari Bilangan Prima</h2>
      <div class="game-container">
        <div
          class="number"
          v-for="(number, index) in randomNumber"
          :key="index"
          @click="checkAnswer(number)"
        >
          {{ number }}
        </div>
      </div>
    </div>
    <div class="popup-backdrop" v-if="showPopup">
      <div class="popup-content">
        <Icon
          name="material-symbols:check-circle"
          color="green"
          class="iconCheck"
        />
        <h2>Selamat!</h2>
        <h3>Tantangan ini berhasil diselesaikan</h3>
        <div class="buttons">
          <NuxtLink to="/">Home</NuxtLink>
        </div>
      </div>
    </div>
    <div class="popup-backdrop" v-if="showPopupFail">
      <div class="popup-content">
        <Icon name="ic:baseline-cancel" color="red" class="iconCheck" />
        <h2>Waktu Habis!!</h2>
        <h3>Tantangan ini tidak berhasil...</h3>
        <div class="buttons">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink
            to="/pemula/quiz"
            style="background-color: red"
            @click="refresh"
            >Coba lagi</NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="popup-backdrop" v-if="showPopupBantuan">
      <div class="popup-content">
        <Icon name="ph:question-fill" color="orange" class="iconCheck" />
        <h2>Butuh bantuan??</h2>
        <h3 style="text-align: center">
          Anda telah melakukan kesalahan sebanyak 3 kali...
        </h3>
        <div class="buttons">
          <button
            @click="
              () => {
                showPopupBantuan = false;
                showPopupBantuan2 = true;
                totalWrong = 0;
              }
            "
          >
            Bantuan
          </button>
          <button
            @click="
              () => {
                showPopupBantuan = false;
                totalWrong = 0;
              }
            "
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
    <div class="popup-backdrop bantuan" v-if="showPopupBantuan2">
      <div class="popup-content">
        <Icon name="ph:question-fill" color="orange" class="iconCheck" />
        <h2>Bantuan</h2>
        <div class="bantuan-container">
          <div
            v-for="(number, index) in randomNumber"
            class="number-container"
            :key="index"
          >
            <h2>{{ number }}</h2>
            <p
              v-for="(factor, index) in factors(number)"
              :key="index"
              v-if="factors(number).length === 2"
            >
              {{ number }}:{{ factor }}={{ number / factor }}
            </p>
            <p
              v-for="(text, index2) in [
                `${number}:${factors(number)[0]}=${
                  number / factors(number)[0]
                }`,
                '...',
                `${number}:${factors(number)[factors(number).length - 1]}=${
                  number / factors(number)[factors(number).length - 1]
                }`,
              ]"
              :key="index2"
              v-else
            >
              {{ text }}
            </p>
            <p style="margin-top: 0.5rem">
              {{ factors(number).length }} faktor
            </p>
          </div>
        </div>
        <p style="text-align: center; margin-top: 0.5rem">
          Perlu diingatt bahwa <b>bilangan prima</b> adalah
          <b>bilangan asli</b> yang memiliki <b>dua</b> faktor yaitu
          <b>1</b> dan
          <b>bilangan itu sendiri</b>
        </p>
        <p>
          Sehingga, bilangan prima pada pilihan diatas adalah
          <span
            style="font-size: 1.5rem; margin-right: 0.2rem"
            v-for="(number, index) in randomNumber"
            :key="index"
            ><b v-if="factors(number).length === 2">{{ number }},</b></span
          >
        </p>
        <div class="buttons">
          <button @click="showPopupBantuan2 = false">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dua } from "../../assets/data/prime";
import { useCounterStore } from "../../store/index";

const store = useCounterStore();
const toast = useToast();

let dots = ref(["red", "yellow", "blue"]);
let randomNumber = ref([]);
let minute = ref(9);
let second = ref(59);
let score = ref(0);
let showPopup = ref(false);
let showPopupFail = ref(false);
let showPopupBantuan = ref(false);
let showPopupBantuan2 = ref(false);
let totalWrong = ref(0);
let correctAnswer = ref(0);

store.showSideButton = false;
store.showSide = false;

let generateNumber = () => {
  let i = 0;
  randomNumber.value = [];
  for (i = 0; i < 8; i++) {
    randomNumber.value.push(Math.round(Math.random() * 98) + 1);
  }
  let randomPosition = Math.round(Math.random() * 7);
  let randomPrime = Math.round(Math.random() * dua.length);
  randomNumber.value[randomPosition] =
    dua[randomPrime - 1 < 0 ? 0 : randomPrime - 1];
  correctAnswer.value = randomNumber.value[randomPosition];
};

generateNumber();

function factors(n) {
  var num_factors = [],
    i;
  for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1) {
    if (n % i === 0) {
      num_factors.push(i);
      if (n / i !== i) num_factors.push(n / i);
    }
  }

  num_factors.sort(function (x, y) {
    return x - y;
  });

  return num_factors;
}

let intervalTime = setInterval(() => {
  second.value -= 1;
  if (second.value < 0) {
    second.value = 59;
    minute.value -= 1;
  }
}, 1000);

setTimeout(() => {
  showPopupFail.value = true;
  clearInterval(intervalTime);
}, (minute.value * 60 + second.value) * 1000);

let refresh = () => {
  window.location.reload();
};

function __gcd(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function power(a, n, p) {
  let res = 1;
  a = a % p;

  while (n > 0) {
    if ((n & 1) == 1) res = (res * a) % p;
    n = n >> 1;
    a = (a * a) % p;
  }
  return res;
}

function isPrime(n, k) {
  if (n <= 1 || n == 4) return false;
  if (n <= 3) return true;

  while (k > 0) {
    let a = Math.floor(Math.random() * (n - 1 - 2) + 2);
    if (power(a, n - 1, n) != 1) return false;
    k--;
  }

  return true;
}

let checkPrima = (n) => {
  let p = parseInt(n);
  let a = Math.round(Math.random() * (p - 2) + 2);
  if (p === 3 || p === 2) {
    return true;
  }
  if (__gcd(p, a) !== 1) {
    return false;
  } else {
    return isPrime(p, a);
  }
};

let checkAnswer = (number) => {
  let random = checkPrima(number);

  if (random > 0.5) {
    score.value += 20;
    if (score.value >= 1000) {
      clearInterval(intervalTime);
      showPopup.value = true;
      store.updateQuizModule("pemula", 1, 1);
    } else {
      generateNumber();
      totalWrong.value = 0;
      toast.add({
        title: "Your answer is Correct!!",
        icon: "i-heroicons-check-circle",
        color: "primary",
        timeout: 3000,
      });
    }
  } else {
    score.value -= 10;
    totalWrong.value += 1;
    toast.add({
      title: "Your answer is Wrong!!",
      icon: "i-heroicons-x-circle",
      color: "red",
      timeout: 3000,
    });

    if (totalWrong.value >= 3) {
      showPopupBantuan.value = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.quiz-container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  height: 84%;
  justify-content: center;
  align-content: center;
  overflow: hidden;
  padding: 0.8rem;

  & > * {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: $pastelPrimary;
  }

  .popup-backdrop.bantuan {
    .popup-content {
      width: 1000px;
      .bantuan-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;

        .number-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 0.5rem;
          border: 2px dashed $white;
          min-width: 100px;

          &.active {
            border: 2px dashed green;
          }
        }
      }
    }
  }

  .popup-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(37, 36, 60, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 500;

    .popup-content {
      background-color: $primary;
      color: $white;
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      border-radius: 15px;
      animation: show 1s linear;
      position: relative;
      padding: 1rem;

      .iconCheck {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -80px;
        font-size: 100px;
      }

      h2,
      h3 {
        font-weight: normal;
      }

      h2 {
        font-size: 2rem;
      }

      h3 {
        margin-bottom: 1rem;
      }

      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        a,
        button {
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: $white;
          padding: 0.5rem 1rem;
          border-radius: 5px;

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

  .content-container {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
    padding-top: 1.5rem;
    padding-inline: 1.7rem;
    gap: 1rem;
    align-items: center;
    color: $white;

    .game-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      justify-content: center;
      align-content: center;
      width: 100%;
      position: relative;
      z-index: 10;

      .number {
        background-color: rgba(0, 0, 0, 0.5);
        text-align: center;
        font-size: 2rem;
        height: 80px;
        line-height: 80px;
        cursor: pointer;
        border-radius: 10px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
      }
    }

    h2 {
      font-weight: 300;
      font-size: 1.5rem;
      text-align: center;
    }

    img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }

    .header-container {
      position: relative;
      display: flex;
      justify-content: space-between;
      height: fit-content;
      align-items: center;
      color: $white;
      width: 100%;
      .dot-container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.8rem;
        position: relative;
        z-index: 2;

        img {
          width: 30px;
          transition: all 0.3s ease-out;
          cursor: pointer;

          &:hover {
            transform: translateX(-5px);
          }
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          opacity: 0.6;
        }
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
