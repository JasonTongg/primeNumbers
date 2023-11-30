<template>
  <div class="quiz-container">
    <div class="content-container">
      <div class="content-header">
        <div class="dot-container">
          <div
            class="dot"
            v-for="(color, index) in dotColor"
            :key="index"
            :style="{ backgroundColor: color }"
          ></div>
        </div>
        <p>Score: {{ score }}/100</p>
        <p>0{{ minute }}:{{ second < 10 ? "0" + second : second }}</p>
      </div>
      <div class="white">
        <h2>{{ tempResult.join("") }}</h2>
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
  </div>
</template>

<script setup>
let toast = useToast();
let snowballSize = ref(70);
let snowballPosition = ref(20);
let totalStep = ref(10);
let step = ref(0);
let manPosition = ref(snowballPosition.value - 20);
let dotColor = ["red", "yellow", "blue"];
let minute = ref(9);
let second = ref(59);
let score = ref(0);
let tempResult = ref([]);
let submitDisabled = ref(false);
let inputValue = ref();
let showPopup = ref(false);
let showPopupFail = ref(false);

let intervalTime = setInterval(() => {
  second.value -= 1;
  if (second.value < 0) {
    second.value = 59;
    minute.value -= 0;
  }
}, 1000);

let i = 0;
for (i = 0; i < 8; i++) {
  tempResult.value.push(Math.round(Math.random() * 8 + 1));
}

setTimeout(() => {
  showPopupFail.value = true;
  clearInterval(intervalTime);
}, (minute.value * 60 + second.value) * 1000);

let refresh = () => {
  window.location.reload();
};

let answerCorrect = () => {
  snowballSize.value += 5;
  if (totalStep.value <= 10) {
    step.value += 0.2 + (10 - totalStep.value) * 0.02;
  } else {
    step.value += 0.2 - (totalStep.value - 10) * 0.02;
  }
  snowballPosition.value += 65 / totalStep.value - step.value;
  manPosition.value = snowballPosition.value - 20;
};

let onChangeInput = (e) => {
  if (inputValue.value > 9) {
    toast.add({
      title: "Please input between 0 to 9",
      icon: "i-heroicons-x-circle",
      color: "red",
      timeout: "3000",
    });
    submitDisabled.value = true;
  } else {
    submitDisabled.value = false;
  }
};

let onSubmit = () => {
  let random = Math.random();

  if (random > 0.5) {
    tempResult.value.push(inputValue.value);
    answerCorrect();
    score.value += 10;
    if (score.value >= 100) {
      showPopup.value = true;
      clearInterval(intervalTime);
    }
    toast.add({
      title: "Your answer is Correct!!",
      icon: "i-heroicons-check-circle",
      color: "primary",
      timeout: "3000",
    });
  } else {
    toast.add({
      title: "Your answer is Wrong!!",
      icon: "i-heroicons-x-circle",
      color: "red",
      timeout: "3000",
    });
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
        gap: 0.7rem;

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          opacity: 0.8;
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
      color: white;
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

        a {
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
