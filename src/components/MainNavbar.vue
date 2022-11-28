<template>
  <nav>
    <span @click="logout">LOGOUT</span>
  </nav>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import { useRouter } from "vue-router"
import { useUserStore } from "../store/userStore"

export default defineComponent({
  setup(){
    const userStore = useUserStore();
    const router = useRouter();
    const logout = () => {
      //authLogout();

      userStore.setToken=null;
      userStore.setUser=null;
      localStorage.removeItem('token');
      router.push('/login')
    }
    

    return{
      logout
    }
  },
})
</script>

<style>
nav{
  position:sticky;
  top:0;
}
.logout{
  width:auto;
}
</style>