<template>
  <div
    class="layout-container"
    @click="
      () => {
        if (isPlaying === false) {
          play();
        }
        isPlaying = true;
      }
    "
  >
    <div class="color-mode">
      <input type="checkbox" id="mode" v-model="mode" />
      <label for="mode" @click="changeColor">
        <div class="circle">
          <img src="../assets/moon.png" alt="moon" />
          <img src="../assets/sun.png" alt="sun" />
          <div class="ball" :style="{ top: mode === true ? '50%' : '0' }"></div>
        </div>
      </label>
    </div>
    <div class="snow">
      <div
        class="snow-item"
        v-for="i in snowQty"
        :key="i"
        :style="{ top: getRandom() + '%', left: getRandom() + '%' }"
      ></div>
    </div>
    <div class="content-container">
      <slot />
      <AppFooter :active="active" @onChangeActive="changeActive"></AppFooter>
    </div>
    <div class="snow">
      <div
        class="snow-item"
        v-for="i in snowQty"
        :key="i"
        :style="{ top: getRandom() + '%', left: getRandom() + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../store/index";
import { storeToRefs } from "pinia";
import { useSound } from "@vueuse/sound";
import audio from "../assets/audio.mp3";

const store = useCounterStore();
let { mode } = storeToRefs(store);
const { play, isPlaying } = useSound(audio, { volume: 0.2 });
let getRandom = () => {
  return Math.random() * 95;
};
let snowQty = ref(70);

let changeColor = () => {
  if (mode.value === false) {
    document.documentElement.style.setProperty("--primary", "#d8cfd0");
    document.documentElement.style.setProperty("--pastelPrimary", "#697184");
    document.documentElement.style.setProperty("--purple", "#b1a6a4");
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty("--white2", "#000000");
    document.documentElement.style.setProperty("--darkBg", "#f2f1ef");
    document.documentElement.style.setProperty("--gray", "#737373");
  } else {
    document.documentElement.style.setProperty("--primary", "#25243c");
    document.documentElement.style.setProperty("--pastelPrimary", "#333151");
    document.documentElement.style.setProperty("--purple", "#846cb6");
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty("--white2", "#ffffff");
    document.documentElement.style.setProperty("--darkBg", "#161428");
    document.documentElement.style.setProperty("--gray", "rgb(140, 140, 140)");
  }
};

onMounted(() => {
  if (mode.value === true) {
    document.documentElement.style.setProperty("--primary", "#d8cfd0");
    document.documentElement.style.setProperty("--pastelPrimary", "#697184");
    document.documentElement.style.setProperty("--purple", "#b1a6a4");
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty("--white2", "#000000");
    document.documentElement.style.setProperty("--darkBg", "#f2f1ef");
    document.documentElement.style.setProperty("--gray", "#737373");
  }
});

let active = ref([false, true, false]);
let router = useRouter();
if (router.currentRoute._value.fullPath.includes("pemula")) {
  active.value = [true, false, false];
} else if (router.currentRoute._value.fullPath.includes("amatir")) {
  active.value = [false, false, true];
} else {
  active.value = [false, true, false];
}

let changeActive = (index) => {
  active.value = [false, false, false];
  active.value[index] = true;
};
</script>

<style lang="scss" scoped>
button {
  width: 100px;
  height: 100px;
  background: red;
}
.layout-container {
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $darkBg;
  grid-template-columns: 1fr auto 1fr;
  position: relative;
  overflow: hidden;
  .color-mode {
    position: absolute;
    top: 50px;
    right: 10px;
    z-index: 300;

    input {
      visibility: hidden;
    }

    .circle {
      position: relative;
      height: 100px;
      width: 50px;
      background-color: $white;
      border-radius: 100px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: $primary;

      img {
        width: 100%;
        padding: 0.7rem;
      }

      .ball {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 50px;
        border-radius: 100px;
        transition: all 0.3s ease-out;
        background-image: linear-gradient(to bottom, #bd69e2, #d45795);
        box-shadow: 0px 0px 16px #d45795;
      }
    }
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 97vh;
    box-shadow: 0px 0px 16px $primary;
    border-radius: 10px;
    justify-content: space-between;
    background-color: $primary;

    @media only screen and (max-width: 500px) {
      width: 100%;
      height: 100vh;
    }
  }

  .snow {
    position: relative;
    width: 100%;
    height: 100vh;

    @media only screen and (max-width: 500px) {
      display: none;
    }

    .snow-item {
      position: absolute;
      width: 3px;
      height: 3px;
      background-color: $gray;
      border-radius: 100px;
    }
  }
}
</style>
