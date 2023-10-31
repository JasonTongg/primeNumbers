<template>
  <div class="footer-container">
    <div
      class="img-container"
      @click="changeActive(0)"
      :class="active[0] === true && 'active'"
    >
      <img src="../assets/menu.svg" alt="" />
    </div>
    <div
      class="img-container"
      @click="changeActive(1)"
      :class="active[1] === true && 'active'"
    >
      <img src="../assets/menu.svg" alt="" />
    </div>
    <div
      class="img-container"
      @click="changeActive(2)"
      :class="active[2] === true && 'active'"
    >
      <img src="../assets/menu.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
let active = ref([false, true, false]);

let changeActive = (index) => {
  active.value = [false, false, false];
  active.value[index] = true;
};
</script>

<style lang="scss" scoped>
.footer-container {
  width: 100%;
  background-color: $pastelPrimary;
  height: 70px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .img-container {
    padding: 20px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s linear;

    &.active {
      background-image: linear-gradient(to bottom, #bd69e2, #d45795);
      transform: translateY(-30px);
      box-shadow: 0px 0px 16px #d45795;
    }

    img {
      width: 30px;
    }
  }
}
</style>
