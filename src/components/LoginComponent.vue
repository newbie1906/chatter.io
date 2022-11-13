<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { login } from '../service/auth';
import { useUserStore } from '../store/userStore';
import { useRouter } from "vue-router";

export default defineComponent ({
  setup(){
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const loginHandler = () => {
      const user = {
        username:username.value,
        password:password.value
      }
      const loggingIn = login(user);
      loggingIn.then((data)=>{
        const userStore = useUserStore()
        localStorage.setItem('user',JSON.stringify({name:username.value,token:data.data.access_token}))
        userStore.setUser({name:username.value,token:data.data.access_token})
        router.push('/')
      })
      .catch((error) => {
        alert("BAD CREDENTIALS")
      })
    }
    return{
    username,
    password,
    loginHandler
    }
  },
});
</script>
<template>
  <main>
    <div class="login-wrapper">
      <div class="left">
        <h1 class='title'>CHATTER.IO</h1>
        <span>Username:</span>
        <input v-model="username" id="login" class="validInput" />
        <span>Password:</span>
        <input v-model="password" id="password" type="password" class="validInput" />
        <span class="smallText"><a>Forgot password?</a></span>
        <button class="validInput" @click="loginHandler">Log In!</button>
        <span>Don't have an account? <a href="/register">Click here</a></span>
      </div>
      <div class="right">
        <img src="./icons/icon.png" class="icon" />
      </div>
    </div>
  </main>
</template>
<style scoped>
main{
  width:100vw;
  height:100vh;
  display:flex;
  justify-content: center;
  align-items:center;
  background:#55AAFF;
}
.title{
  color:black;
  font-family:'Verdana';
}
.left{
  display:flex;
  flex-direction:column;
  width:100%;
}
.login-wrapper {
  -webkit-box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
-moz-box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
box-shadow: 9px 21px 41px -6px rgba(66, 68, 90, 1);
  width: 50vw;
  height: 40vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
  padding-left:66px;
  color: white;
  background: rgba(127,127,127,0.5);
  border-radius:10px;
}
.validInput {
  width: 75%;
  padding: 5px;
  margin: 5px;
  text-align:center;
}
a {
  cursor: pointer;
}
.smallText{
  font-size:12px;
}
.right{
  margin-top:20px;
  margin-right:60px;
}
.icon{
  user-select: none;
  width:100%;
  height:100%;
}
</style>
