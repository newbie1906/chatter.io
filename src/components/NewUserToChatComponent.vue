<template>
  <div class="gray-background">
    <span class="exit" @click="exit">EXIT</span>
    <div class="new-chat-container">
      <h1>Dodaj nowy czat!</h1>
      <p>Podaj nazwę:<input v-model="name"></p>
      <button @click="addNewUser">DODAJ Użytkownika</button>
    </div>
  </div>
</template>
<style>
  .gray-background{
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    opacity:0.9;
    background:gray;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:10;
  }
  .new-chat-container{
    width:50vw;
    height:50vh;
    background:green;
    
  }
  .exit{
    font-size:36px;
    position:absolute;
    right:0;
    top:0;
  }
</style>
<script>
import { defineComponent, ref } from "vue";
import { addUserToChatroom } from "../service/chat";
import { useChatStore } from "../store/chatStore";
  export default defineComponent({
    name:"AddNewUser",
    emits: ['clickedExit'],
    setup(){
      const name = ref('');
      const chatStore = useChatStore();

      const addNewUser = () => {
        const payload = {user:name.value,chatroom_id:chatStore.getSelectedChatRoom.chatroom_id}; 
        addUserToChatroom(payload)
      }

      return{
        addNewUser,
        name,
      }
    },
    methods:{
      exit(){
        this.$emit('clickedExit')
      }
    }
  })
</script>