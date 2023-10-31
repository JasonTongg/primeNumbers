import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
    let count = ref<number>(0);
    let isLogin = ref<boolean>(false);
    let user = ref<{ name?: string, email?: string }>({
        name: "",
        email: ""
    });

    return { count, isLogin, user }
})