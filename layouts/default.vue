<template>
  <div class="layout-container">
    <img src="../assets/Snow.png" alt="" />
    <div class="content-container">
      <slot />
      <AppFooter></AppFooter>
    </div>
    <img src="../assets/Snow.png" alt="" />
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.layout-container {
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #161428;
  grid-template-columns: 1fr auto 1fr;

  .content-container {
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 97vh;
    box-shadow: 0px 0px 16px $primary;
    border-radius: 10px;
    justify-content: space-between;
    background-color: $primary;
  }

  img {
    width: 33vw;
    height: 100vh;
  }
}
</style>
