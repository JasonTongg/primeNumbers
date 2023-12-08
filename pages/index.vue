<template>
  <div class="home-container">
    <div
      class="snow-item"
      v-for="i in 70"
      :key="i"
      :style="{ top: getRandom() + '%', left: getRandom() + '%' }"
    ></div>
    <img src="../assets/logo-dark.png" alt="logo" v-if="mode === true" />
    <img src="../assets/logo.png" alt="logo" v-else />
    <NuxtLink to="pemula">Pemula</NuxtLink>
    <NuxtLink to="amatir">Mahir</NuxtLink>
  </div>
</template>

<script setup>
import { useCounterStore } from "../store/index";
import { storeToRefs } from "pinia";

const store = useCounterStore();
let { mode } = storeToRefs(store);
let getRandom = () => {
  return Math.random() * 95;
};
</script>

<style lang="scss">
.home-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem;

  .snow-item {
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: $white2;
    border-radius: 100px;
  }

  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
    width: 300px;
  }

  a {
    padding: 0.5rem 1rem;
    color: $white;
    background-color: $pastelPrimary;
    border: none;
    outline: none;
    border-radius: 5px;
    position: relative;
    z-index: 10;
    width: 200px;
    padding: 0.7rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    transition: all 0.2s linear;
    transform: translateY(50px);

    &:hover {
      transform: translateY(44px);
      box-shadow: 0px 4px 8px $purple;
    }

    &:active {
      transform: translateY(47px);
      box-shadow: 0px 2px 4px $purple;
    }
  }
}
</style>
