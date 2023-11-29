<template>
  <div class="quiz-container">
    <div class="content-container">
      <img src="../../assets/mountain.png" alt="" />
      <div class="header-container">
        <div class="dot-container">
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
  </div>
</template>

<script setup>
const toast = useToast();

let dots = ref(["red", "yellow", "blue"]);
let randomNumber = ref([]);
let minute = ref(9);
let second = ref(2);
let score = ref(0);
let i = 0;
for (i = 0; i < 8; i++) {
  randomNumber.value.push(Math.round(Math.random() * 98) + 1);
}
let intervalTime = setInterval(() => {
  second.value -= 1;
  if (second.value < 0) {
    second.value = 59;
    minute.value -= 1;
  }
}, 1000);

setTimeout(() => {
  clearInterval(intervalTime);
}, (minute.value * 60 + second.value) * 1000);

let checkAnswer = () => {
  let random = Math.random();

  if (random > 0.5) {
    score.value += 20;
    if (score.value >= 1000) {
      clearInterval(intervalTime);
      toast.add({
        title: "Your answer is Correct!!",
        icon: "i-heroicons-check-circle",
        color: "primary",
        timeout: "3000",
      });
    } else {
      toast.add({
        title: "Your answer is Correct!!",
        icon: "i-heroicons-check-circle",
        color: "primary",
        timeout: "3000",
      });
    }
  } else {
    score.value -= 10;
    toast.add({
      title: "Your answer is Wrong!!",
      icon: "i-heroicons-x-circle",
      color: "red",
      timeout: "3000",
    });
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
        justify-content: center;
        gap: 0.5rem;

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
</style>
