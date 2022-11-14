import { useUserStore } from '../store/userStore';
import { useChatStore } from '../store/chatStore';
import axios from 'axios';
import { useRouter } from 'vue-router';
const api = 'https://chatter-io.fly.dev'

export const getChatrooms = async () => {
  const router = useRouter();
  const chatStore = useChatStore();
  const userStore = useUserStore();
  try{
    const {data} = await axios.get(`${api}/api/chatrooms/`,{headers:{'Authorization':` Bearer ${userStore.getUser.token}`}})  
    chatStore.setChatRooms(data);
    return data
  }
  catch(err){
    console.log(err)
    if(err.response.status === 401)
      router.push('/login')
  }
}
export const addNewChatroom = async (chat) =>{
  const userStore = useUserStore();
  const config = {headers:{'Authorization':` Bearer ${userStore.getUser.token}`}}
  const {data} = await axios.post(`${api}/api/chatrooms/`,chat,config)
  return data;
}
export const getMessages = async (selectedChatRoomId) => {
  const userStore = useUserStore();
  const chatStore = useChatStore();
  const config = {headers:{'Authorization':` Bearer ${userStore.getUser.token}`}}
  const {data} = await  axios.get(`${api}/api/chatrooms/${selectedChatRoomId}/messages`,config)
  chatStore.setMessages(data);
  
}