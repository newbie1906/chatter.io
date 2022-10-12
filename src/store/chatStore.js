import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => {
    return {
      chatRooms: [
        {
          id: 1,
          name: 'Pokój 1'
        },
        {
          id: 2,
          name: 'Pokój 2'
        },
        {
          id: 3,
          name: 'Pokój 3'
        }
      ],
      selectedChatRoom: null,
      messages: [
        {
          id: 1,
          user_id: 1,
          value: 'duuupa'
        },
        {
          id: 2,
          user_id: 2,
          value: 'duuupa22222'
        }
      ]
    }
  },
  getters: {
    getChatRooms: state => state.chatRooms,
    getSelectedChatRoom: state => state.selectedChatRoom,
    getMessages: state => state.messages
  },
  actions: {
    setChatRooms(rooms) {
      this.chatRooms = rooms
    },
    addMessage(message) {
      this.messages = [...this.messages, message]
    },
    setMessages(messages) {
      this.messages = messages
    },
    setSelectedChatRoom(chat) {
      this.selectedChatRoom = chat
    }
  },
})
