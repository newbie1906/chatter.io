import { useUserStore } from '../store/userStore';
import { useChatStore } from '../store/chatStore';
import axios from 'axios';

const api = 'https://chatter-io.fly.dev'


export const getChatrooms = () => {
  const chatStore = useChatStore();
  const userStore = useUserStore();
  axios.get(`${api}/api/chatrooms/`,{headers:
    {
      'Authorization':` Bearer ${userStore.getUser.token}`
    }
  }).then((data) =>{
    chatStore.setChatRooms(data.data);
  })
  .catch((error) => {
    console.log(error)
  })
}
export const addNewChatroom = (chat) =>{
  const userStore = useUserStore();
  const config = {headers:
    {'Authorization':` Bearer ${userStore.getUser.token}`}
  }
  axios.post(`${api}/api/chatrooms`,chat,config)
}