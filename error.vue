<template>
  <div class="error-container">
    <div
      class="snow-item"
      v-for="i in 200"
      :key="i"
      :style="{ top: getRandom() + '%', left: getRandom() + '%' }"
    ></div>
    <div class="error-content">
      <h1>404</h1>
      <p>Waduh, tujuan kamu ngakk ada!!</p>
      <p>Mungkin kamu salah jalan atau alamat, yuk balik...</p>
      <NuxtLink to="/">Kembali</NuxtLink>
    </div>
    <img src="./assets/error-bg.png" alt="" />
  </div>
</template>

<script setup>
let getRandom = () => {
  return Math.random() * 98;
};
</script>

<style lang="scss">
.error-container {
  background-color: #161428;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  overflow: hidden;

  .snow-item {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: white;
    border-radius: 100px;

    @media only screen and (max-width: 1000px) {
      width: 2px;
      height: 2px;
    }

    @media only screen and (max-width: 500px) {
      width: 1px;
      height: 1px;
    }
  }

  img {
    position: absolute;
    bottom: 0;
    left: -1vw;
    width: 102vw;
  }

  .error-content {
    color: $white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 200px;
    gap: 0.3rem;

    @media only screen and (max-width: 600px) {
      margin-bottom: 100px;
    }

    h1 {
      font-size: 10rem;

      @media only screen and (max-width: 600px) {
        font-size: 7rem;
      }
    }

    p {
      color: #a08fa8;
      font-size: 1.2rem;
      z-index: 100;
      position: relative;
      text-align: center;

      @media only screen and (max-width: 600px) {
        font-size: 0.9rem;
      }
    }

    a {
      padding: 0.3rem 0.5rem;
      background-color: $purple;
      border-radius: 5px;
      border: none;
      outline: none;
      font-size: 1.2rem;
      margin-top: 1rem;
      position: relative;
      z-index: 5;
      color: white;
      cursor: pointer;
      text-align: center;
      text-decoration: none;

      @media only screen and (max-width: 600px) {
        font-size: 0.9rem;
        padding: 0.2rem 0.4rem;
      }
    }
  }
}
</style>
