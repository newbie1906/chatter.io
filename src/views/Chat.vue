<template>
  <div class="chat-container">
    <div class="chat-list">
      <div class="chat-list-title">Create room</div>
      <div>
        <div class="chat-new">
          <img 
            src="../assets/plus.png" 
            class="new-icon" 
            @click="showAddNewChat">
            <new-chat-component v-if="newChatOpen" @clickedExit="showAddNewChat"></new-chat-component>
            <new-user-to-chat-component v-if="newUserOpen" @clickedExit="showAddNewUserToChat"></new-user-to-chat-component>
          </div>
        <div
          v-for="(chat) in chatRooms"
          :key="chat.id"
          class="chat-list-element"
          :class="{'active': selectedChatRoom?.id === chat.id}"
          @click="handleSelectChatRoom(chat)"
        >
          {{ chat.name }}
        </div>
      </div>
    </div>
    <div class="chat-box-container">
      <div class="chat-box" v-if="selectedChatRoom">
        <div @click="showAddNewUserToChat">+</div>
        <div class="chat-box-title">Welcome to {{ selectedChatRoom.name }}</div>
        <div
          v-for="message in messages"
          :key="message.message_id"
          class="chat-box-wrapper"
          :class="{'author': message.user_id === user.user_id}"
        >
          <div class="chat-box-author">{{ user.username }}</div>
          <div class="chat-box-message">{{ message.value }}</div>
        </div>
      </div>
      <div v-else>
        Najpierw wybierz pokój
      </div>
      <div class="chat-input">
        <input
          type="text"
          v-model="chatMessage"
          @keyup.enter="handleSubmit"
        />
        <div>
          <button @click="handleSubmit">
            Wyślij
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, onMounted, ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from '../store/userStore';
import {useChatStore} from '../store/chatStore';
import {getChatrooms, getMessages} from '../service/chat';
import { v4 as uuidv4 } from 'uuid';
import NewChatComponent from '../components/NewChatComponent.vue';
import NewUserToChatComponent from '../components/NewUserToChatComponent.vue';

export default defineComponent({
  components: { NewChatComponent, NewUserToChatComponent },
  setup() {
    const api = 'ws://chatter-io.fly.dev/api';
    const chatMessage = ref('')
    const userStore = useUserStore()
    const chatStore = useChatStore()
    const user = computed(() => userStore.getUser)
    const router = useRouter();

    const chatRooms = computed(() => chatStore.getChatRooms)
    const selectedChatRoom = computed(() => chatStore.getSelectedChatRoom)
    const messages = computed(() => chatStore.getMessages)

    const newChatOpen = ref(false);
    const newUserOpen = ref(false);
    const socket = new WebSocket(`${api}/messages/ws?token=${userStore.getToken}`);
    onMounted(() => {
      getChatrooms();
      if(chatRooms.selectedChatRoom){
        getMessages()
      }

      socket.onmessage = (payload) => {
        const message = JSON.parse(payload.data);
        if(message.user_id !== userStore.getUser.user_id){
          chatStore.messages.push(message);
        }

      }
    });

    const handleSelectChatRoom = async (chat) => {
      console.log(chat)
      chatStore.setSelectedChatRoom(chat)
      getMessages(chat.chatroom_id)
    }
    const showAddNewChat = () => {
      newChatOpen.value = !newChatOpen.value;
      //todo 
    }
    const showAddNewUserToChat = () => {
      newUserOpen.value = !newUserOpen.value;
      //todo 
    }
    const handleSubmit = () => {
      const message = {
        value: chatMessage.value,
        id: uuidv4(),
        user_id: userStore.getUser.user_id,
      }
      messages.value.push(message)
      chatMessage.value = '';
      socket.send(JSON.stringify(message))
    }

    return {
      chatMessage,
      chatRooms,
      selectedChatRoom,
      user,
      messages,
      newChatOpen,
      newUserOpen,
      handleSubmit,
      handleSelectChatRoom,
      showAddNewChat,
      showAddNewUserToChat
    }
  },
});
</script>

<style lang="scss">
.chat-container {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;

  & .chat-list {
    display: flex;
    flex-direction: column;
    justify-self: stretch;
    background: #55AAFF;
    color: #fff;
    padding: 20px;

    &-title {
      font-size: 24px;
    }
    &-element {
      font-size: 14px;
      padding: 5px;
      margin-top: 5px;
      border: 1px solid black;
      cursor: pointer;
      transition: all ease .4s;

      &:hover {
        background: rgba(66, 68, 90, 1)
      }

      &.active {
        background: rgba(66, 68, 90, 1);
      }
    }
  }

  & .chat-box-container {
    flex: 1;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    gap: 20px;
    padding: 20px;

    & .chat-box {
      display: flex;
      height: 500px;
      flex-direction: column;
      gap: 5px;
      overflow:auto;
      &-title {
        text-align: center;
        font-size: 24px;
      }
      &-author{
        font-size:12px;
      }
      &-wrapper{
        display:flex;
        flex-direction:column;

        &.author {
          align-self: flex-end;
          & .chat-box-message{
            background: #55AAFF;
          }
        }
      }
      &-message {
        padding: 5px 10px;
        background: #E4E6EB;
        align-self: flex-start;
        border-radius: 8px;


      }
    }

    & .chat-input {
      display: flex;
      justify-content: stretch;
      align-items: center;
      gap: 20px;

      & input {
        align-self: stretch;
        font-size: 14px;
        flex: 1;
        background: rgba(66, 68, 90, 1);
        color: #fff;
        border: none;
        padding: 5px;
      }

      & button {
        padding: 5px;
        color: #fff;
        font-size: 24px;
        border: none;
        flex: 1;
        background: rgba(66, 68, 90, 1);
      }
    }
  }
}
.chat-new{
  display:flex;
  justify-content:center;

  & .new-icon{
    background:white;
    border-radius:100px;
    width:1.5rem;
  }
  & .new-icon:hover{
    background:yellow;
    cursor: pointer;
  }
}
</style>
