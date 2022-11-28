<template>
  <main>
    <div class="register-container">
      <div class="login-wrapper">
        <div class="left">
          <h1 class='title'>CHATTER.IO</h1>
          <v-text-field v-model="username" label="Username"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password"></v-text-field>
          <v-text-field v-model="repeatedPassword" label="Repeated password" type="password"></v-text-field>
          <v-text-field v-model="email" placeholder="E-mail" ></v-text-field>
          <div><input type='checkbox' /> agree terms of sprzedawania narządów </div>
          <v-btn 
          class="submit-button" 
          @click="handleSubmit">Register</v-btn>
        </div>
        <div class="right">
          <img src="./icons/icon.png" class="icon" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { register } from '../service/auth.js';
import { useRouter } from 'vue-router';
import { VTextField, VBtn } from 'vuetify/components'
export default defineComponent({
  components:{VTextField,VBtn},
  setup(){
    const router = useRouter();
    const username = ref('')
    const password = ref('')
    const repeatedPassword = ref('')
    const email = ref('')
    const agree = ref()
    
    const handleSubmit = () => {
      if(username.value == ''){
        alertPopup();
        return;
      }
      if(password.value == ''){
        alertPopup();
        return;
      }
      if(repeatedPassword.value == ''){
        alertPopup();
        return;
      }
      if(email.value == ''){
        alertPopup();
        return;
      }
      if(password.value != repeatedPassword.value){
        alertPopup();
        return;
      }
      const user = {
        username: username.value,
        password: password.value,
        email: email.value,
      }
      try{
      register(user)
      }
      catch (error){
        console.log(error.message)
        return;
      }
      router.push('/login')
    }
    const alertPopup = () => {
      console.log('error')
    }
    return {
      handleSubmit,
      username,
      password,
      repeatedPassword,
      email
    }
  },
})
</script>

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
    width: 40vw;
    height: 55vh;
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
  .submit-button{
    color:black;
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
