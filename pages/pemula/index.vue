<template>
  <div class="pemula-container">
    <div class="header">
      <NuxtLink to="/"
        ><img src="../../assets/left-arrow.png" alt="back"
      /></NuxtLink>
      <h2>Pemula</h2>
    </div>
    <div class="materi-container">
      <div
        class="materi-item"
        v-for="(item, index) in pemulaModule.materi"
        :class="checkActive(item)"
        :key="index"
        @click="startLearning(item)"
      >
        <h3><div class="close" v-if="item.show === false"></div>{{ item.title }}</h3>
        <p v-if="item.progress >= item.end">
          <img src="../../assets/check.svg" alt="check" />Done
        </p>
        <p v-else>
            <div class="close" v-if="item.show === false"></div>
          <div class="progress-field">
            <div class="progress-done" :style="{width: `${item.progress/item.end*100}%`}"></div>
          </div>
          {{
            item.progress + " / " + item.end
          }}
        </p>
      </div>
    </div>
    <div class="quiz">
      <h2>Quiz</h2>
    </div>
    <div class="quiz-container">
      <div
        class="quiz-item"
        v-for="(item, index) in pemulaModule.quiz"
        :class="checkActive(item)"
        :key="index"
        @click="startLearning(item)"
      >
        <h3><div class="close" v-if="item.show === false"></div>{{ item.title }}</h3>
        <p v-if="item.progress >= item.end">
          <img src="../../assets/check.svg" alt="check" />Done
        </p>
        <p v-else>
            <div class="close" v-if="item.show === false"></div>
          <div class="progress-field">
            <div class="progress-done" :style="{width: `${item.progress/item.end*100}%`}"></div>
          </div>
          {{
            item.progress + " / " + item.end
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../../store/index";
import { storeToRefs } from "pinia";

const store = useCounterStore();
let { pemulaModule } = storeToRefs(store);
const router = useRouter();

let checkActive = (item) => {
    if (item.show === false) {
        return 'active'
    }
    return ''
};

let startLearning = (data) => {
  if (data.show) {
    if (data.title.toLowerCase() !== 'quiz') {
      if (data.progress < data.end && data.progress !== 0) {
        router.push(`pemula/${data.title.split(" ").join("-").toLowerCase()}/${data.progress}`)
      } else {
        router.push(`pemula/${data.title.split(" ").join("-").toLowerCase()}/1`)
      }
    } else {
      router.push('pemula/quiz')
    }
  }
};
</script>

<style lang="scss" scoped>
.pemula-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  color: $white;

  .quiz {
    h2{
      font-size: 1.3rem;
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: $pastelPrimary;
    padding: 0.7rem;
    border-radius: 10px;
    position: relative;

    h2 {
      font-weight: normal;
      font-size: 1.3rem;
    }

    a {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      text-decoration: none;
      color: $white;
      padding: 0rem 0.5rem;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease-out;

      img {
        width: 30px;
      }

      &:hover {
        transform: translate(-5px, -50%);
      }
    }
  }

  .materi-container,
  .quiz-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;
    width: 100%;

    .materi-item,
    .quiz-item {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 0.7rem;
      width: 100%;

      &.active h3 .close, &.active p .close{
        position: absolute;
        border-radius: 10px;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 10;
      }

      &.active h3, &.active p{
        cursor: auto;
      }

      h3,
      p {
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $pastelPrimary;
        color: $white;
        padding: 0.5rem 1rem;
        text-transform: capitalize;
        font-weight: normal;
        position: relative;

        .progress-field{
            width: 100%;
            height: 10px;
            border-radius: 50px;
            border: 1px solid $white;
            position: relative;

            .progress-done{
                background-color: green;
                border: 1px solid green;
                border-radius: 50px;
                height: 10px;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
            }
        }
      }

      h3 {
        cursor: pointer;
      }

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        flex-direction: column;

        img {
          width: 20px;
        }
      }
    }
  }
}
</style>
