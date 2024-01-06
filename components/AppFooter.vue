<template>
  <div class="footer-container">
    <NuxtLink
      class="img-container"
      aria-label="pemula"
      @click="changeActive2(0)"
      :class="active[0] === true && 'active'"
      to="/pemula"
    >
      <img src="../assets/pemula.png" alt="" />
    </NuxtLink>
    <NuxtLink
      class="img-container"
      aria-label="home"
      @click="changeActive2(1)"
      :class="active[1] === true && 'active'"
      to="/"
    >
      <img src="../assets/menu.svg" alt="" />
    </NuxtLink>
    <NuxtLink
      class="img-container"
      aria-label="amatir"
      @click="changeActive2(2)"
      :class="active[2] === true && 'active'"
      to="/amatir"
    >
      <img src="../assets/mahir.png" alt="" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { useCounterStore } from "../store/index";
import { storeToRefs } from "pinia";

const store = useCounterStore();
let { mode } = storeToRefs(store);
const emit = defineEmits(["onChangeActive"]);

const props = defineProps({
  active: {
    type: Object,
    required: true,
  },
});

const active = computed(() => props.active);
let changeActive2 = (idx) => {
  console.log("tess");
  emit("onChangeActive", idx);
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
      position: relative;
      z-index: 100;
    }

    img {
      width: 40px;
    }

    &:first-of-type,
    &:last-of-type {
      img {
        width: 60px;
      }
    }
  }
}
</style>
