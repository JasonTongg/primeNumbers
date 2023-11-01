<template>
  <div class="home-container">
    <div
      class="snow-item"
      v-for="i in 70"
      :key="i"
      :style="{ top: getRandom() + '%', left: getRandom() + '%' }"
    ></div>
    <img src="../assets/logo.svg" alt="logo" />
    <NuxtLink to="pemula">Pemula</NuxtLink>
    <NuxtLink to="amatir">Amatir</NuxtLink>
  </div>
</template>

<script setup>
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
    background-color: white;
    border-radius: 100px;
  }

  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
  }

  a {
    padding: 0.5rem 1rem;
    color: white;
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

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0px 4px 8px $purple;
    }

    &:active {
      transform: translateY(-3px);
      box-shadow: 0px 2px 4px $purple;
    }
  }
}
</style>
