<template>
  <div class="chat-container">
    <div class="chat-list">
      <div class="chat-list-title">Create room</div>
      <div>
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
        <div class="chat-box-title">Welcome to {{ selectedChatRoom.name }}</div>
        <div
          v-for="message in messages"
          :key="message.id"
          class="chat-box-message"
          :class="{'author': message.user_id === user.id}"
        >
          {{ message.value }}
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
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  setup() {
    const chatMessage = ref('')
    const userStore = useUserStore()
    const chatStore = useChatStore()
    const user = computed(() => userStore.getUser)
    const router = useRouter();

    const chatRooms = computed(() => chatStore.getChatRooms)
    const selectedChatRoom = computed(() => chatStore.getSelectedChatRoom)
    const messages = computed(() => chatStore.getMessages)

    const getMessages = async () => {
//      const { data } = await axios.get('dupa/messages')

//      messages.value = data.messages
    }

    onMounted(() => {
      if (!user.value) {
        router.push('/login');
      }

//      getMessages()
//
//      socket.on('message', (message) => {
//        messages.value.push(message)
//      })
    });

    const handleSelectChatRoom = (chat) => {
      chatStore.setSelectedChatRoom(chat)
    }

    const handleSubmit = () => {
      const message = {
        value: chatMessage.value,
        id: uuidv4(),
        user_id: messages.value.length % 2 === 0 ? 1 : 2,
      }

      messages.value.push(message)

      chatMessage.value = ''
      // websocket.send('message', chatMessage.value)
    }

    return {
      chatMessage,
      chatRooms,
      selectedChatRoom,
      user,
      messages,
      handleSubmit,
      handleSelectChatRoom
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

      &-message {
        padding: 5px 10px;
        background: #E4E6EB;
        align-self: flex-start;
        border-radius: 8px;

        &.author {
          background: #55AAFF;
          align-self: flex-end;
        }
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
</style>
