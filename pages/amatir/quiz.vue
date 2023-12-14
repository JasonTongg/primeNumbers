<template>
  <div class="quiz-container">
    <div class="content-container">
      <div class="content-header">
        <div class="dot-container">
          <NuxtLink to="/amatir"
            ><img src="../../assets/left-arrow.png" alt="back"
          /></NuxtLink>
          <!-- <div
            class="dot"
            v-for="(color, index) in dotColor"
            :key="index"
            :style="{ backgroundColor: color }"
          ></div> -->
        </div>
        <p>Score: {{ score }}/50</p>
        <p>0{{ minute }}:{{ second < 10 ? "0" + second : second }}</p>
      </div>
      <div class="white">
        <h2>{{ tempResult }}</h2>
      </div>
      <img src="../../assets/mountain.png" alt="" class="mountain" />
      <img
        src="../../assets/man.png"
        alt=""
        class="man"
        :style="{ left: manPosition + '%' }"
      />
      <img
        src="../../assets/snowball.png"
        alt=""
        class="snowball"
        :style="{ width: snowballSize + 'px', left: snowballPosition + '%' }"
      />
    </div>
    <div class="answer-container">
      <input
        type="number"
        placeholder="Input your answer here.."
        step="1"
        v-model="inputValue"
        @input="onChangeInput"
      />
      <button :disabled="submitDisabled" @click="onSubmit">Submit</button>
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
            to="/amatir/quiz"
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
    <div class="popup-backdrop bantuan" v-if="showPopupBantuan2 === true">
      <div class="popup-content">
        <Icon name="ph:question-fill" color="orange" class="iconCheck" />
        <h2>Bantuan</h2>
        <div class="bantuan-container">
          <h2>
            Jawabannya adalah
            <span style="font-size: 3rem"
              ><b>{{ jawabanBenar }}</b></span
            >
          </h2>
          <p>
            Jika diselesaikan menggunakan <b>lehmer primality test</b> dengan
            <b>a=2</b>, maka
          </p>
          <table>
            <tr>
              <td>e</td>
              <td v-for="(number, index) in 10" :key="index">
                {{ number + 1 }}
              </td>
              <td>...</td>
              <td v-for="(number, index) in 10" :key="index">
                {{ number + jawabanBenar - 12 }}
              </td>
            </tr>
            <tr>
              <td>a<span>e</span> mod {{ jawabanBenar }}</td>
              <td v-for="(number, index) in 10" :key="index">
                {{ calculateLehmer(number + 1, 2, jawabanBenar) }}
              </td>
              <td>...</td>
              <td v-for="(number, index) in 10" :key="index">
                {{
                  calculateLehmer(number + jawabanBenar - 12, 2, jawabanBenar)
                }}
              </td>
            </tr>
          </table>
          <p>
            Dikarenakan tidak mendapakan hasil 1 dari e = 2 sampai
            {{ jawabanBenar - 2 }} maka bilangan bulat p dinyatakan sebagai
            bilangan prima.
          </p>
        </div>
        <div class="buttons">
          <button @click="showPopupBantuan2 = false">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../../store/index";
const store = useCounterStore();
let questionLength = ref(0);
let toast = useToast();
let snowballSize = ref(70);
let snowballPosition = ref(20);
let manPosition = ref(snowballPosition.value - 20);
let minute = ref(9);
let second = ref(59);
let score = ref(0);
let tempResult = ref(0);
let submitDisabled = ref(false);
let inputValue = ref();
let showPopup = ref(false);
let showPopupFail = ref(false);
let showPopupBantuan2 = ref(false);
let showPopupBantuan = ref(false);
let totalWrong = ref(0);
let jawabanBenar = ref(0);

let intervalTime = setInterval(() => {
  second.value -= 1;
  if (second.value < 0) {
    second.value = 59;
    if (minute.value >= 1) {
      minute.value -= 1;
    } else {
      showPopup.value = true;
      clearInterval(intervalTime);
    }
  }
}, 1000);

setTimeout(() => {
  showPopupFail.value = true;
  clearInterval(intervalTime);
}, (minute.value * 60 + second.value) * 1000);

let refresh = () => {
  window.location.reload();
};

let answerCorrect = () => {
  snowballSize.value += 5;
  snowballPosition.value += 58 / 5;
  manPosition.value = snowballPosition.value - 20;
};

let onChangeInput = (e) => {
  if (inputValue.value > 9) {
    toast.add({
      title: "Please input between 0 to 9",
      icon: "i-heroicons-x-circle",
      color: "red",
      timeout: 3000,
    });
    submitDisabled.value = true;
  } else {
    submitDisabled.value = false;
  }
};

function calculateLehmer(e, a, p) {
  let result = Math.pow(a, e) % p;
  if (isNaN(result)) {
    let c = 1;
    for (let i = 0; i < e; i++) {
      c *= a;
      c %= p;
    }
    return c;
  }
  return result;
}

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
  console.log(n);
  if (n <= 1 || n == 4) return false;
  if (n <= 3) return true;
  while (k > 0) {
    let a = Math.floor(Math.random() * (n - 1 - 2) + 2);
    console.log(power(a, n - 1, n));
    if (power(a, n - 1, n) != 1) return false;
    k--;
  }

  return true;
}

let checkPrima = (n) => {
  let p = parseInt(n);
  let a = 3;
  if (__gcd(p, a) !== 1) {
    return false;
  } else {
    return isPrime(p, a);
  }
};

let initialValue = () => {
  let questionIndex = Math.floor(
    Math.random() * store.amatirQuizQuestion[questionLength.value].length
  );
  let question = store.amatirQuizQuestion[questionLength.value][questionIndex];
  console.log(question);
  jawabanBenar.value = question;
  tempResult.value = Math.floor(question / 10);
};

initialValue();

let onSubmit = () => {
  let random = checkPrima(tempResult.value * 10 + inputValue.value);

  if (random === true) {
    questionLength.value += 1;
    initialValue();
    answerCorrect();
    score.value += 10;
    if (score.value >= 50) {
      store.updateQuizModule("amatir", 1, 1);
      showPopup.value = true;
      clearInterval(intervalTime);
    }
    toast.add({
      title: "Your answer is Correct!!",
      icon: "i-heroicons-check-circle",
      color: "primary",
      timeout: 3000,
    });
    totalWrong.value = 0;
  } else {
    if (minute.value >= 1) {
      minute.value -= 1;
    } else {
      second.value = 0;
      showPopupFail.value = true;
      clearInterval(intervalTime);
    }

    toast.add({
      title: "Your answer is Wrong!!",
      icon: "i-heroicons-x-circle",
      color: "red",
      timeout: 3000,
    });
    totalWrong.value += 1;
    if (totalWrong.value >= 3) {
      showPopupBantuan.value = true;
      totalWrong.value = 0;
    }
  }
  inputValue.value = "";
};
</script>

<style lang="scss" scoped>
.quiz-container {
  display: grid;
  grid-template-rows: 1fr 50px;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  height: 83%;

  & > * {
    width: 100%;
    height: 100%;
    background-color: $pastelPrimary;
    border-radius: 10px;
  }
  .content-container {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 1.5rem 1rem;
      color: $white;

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
          width: 8px;
          height: 8px;
          border-radius: 50%;
          opacity: 0.5;
        }
      }
    }
    .white {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: black;
    }
    .mountain {
      position: absolute;
      bottom: 40px;
      left: 0;
      width: 100%;
    }
    .man {
      position: absolute;
      bottom: 50px;
      width: 100px;
      transition: left 1s linear;
    }

    .snowball {
      position: absolute;
      bottom: 50px;
      transition: width 0.5s linear, left 1s linear;
      -webkit-animation: rotating 7s linear infinite;
      -moz-animation: rotating 7s linear infinite;
      -ms-animation: rotating 7s linear infinite;
      -o-animation: rotating 7s linear infinite;
      animation: rotating 7s linear infinite;
    }
  }
  .answer-container {
    display: grid;
    width: 100%;
    grid-template-columns: 4fr 1fr;
    padding: 0.5rem 1rem;
    height: fit-content;

    & > * {
      width: 100%;
    }

    input {
      background-color: transparent;
      color: $white;
      outline: none;
      border: none;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type="number"] {
        -moz-appearance: textfield;
      }
    }
    button {
      color: $white;
      background-color: $purple;
      border: none;
      outline: none;
      padding: 0.5rem 0.5rem;
      border-radius: 5px;
    }
  }

  .popup-backdrop.bantuan {
    .popup-content {
      width: 1000px;
      .bantuan-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }

      table {
        font-size: 0.9rem;
        border: 1px solid $white;

        td {
          border: 1px solid $white;
          text-align: center;
          min-width: 20px;
          padding-inline: 0.3rem;

          span {
            position: relative;
            top: -5px;
            font-size: 0.7rem;
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
          color: white;
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
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
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
