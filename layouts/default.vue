<template>
  <div class="layout-container">
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
      <AppFooter></AppFooter>
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
let getRandom = () => {
  return Math.random() * 95;
};
let snowQty = ref(70);
</script>

<style lang="scss" scoped>
.layout-container {
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #161428;
  grid-template-columns: 1fr auto 1fr;

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
      background-color: rgb(140, 140, 140);
      border-radius: 100px;
    }
  }
}
</style>
