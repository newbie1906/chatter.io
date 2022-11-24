import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => {
    return {
      chatRooms: [
      ],
      selectedChatRoom: null,
      messages: [
        {
          chatroom_id:1,
          message_id: 1,
          user_id: 1,
          message_text: 'abc'
        },
        {
          chatroom_id:1,
          user_id: 2,
          message_text: 'abcd',
        },
        {
          chatroom_id: 1,
          user_id: 1,
          message_text: 'abc'
        },
        {
          chatroom_id: 1,
          user_id: 1,
          message_text: 'abcd'
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
