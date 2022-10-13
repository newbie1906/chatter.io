import { useUserStore } from '../store/userStore';
import axios from 'axios';
const api = 'https://chatter-io.fly.dev/'
export const getUser = () => {
  const userStore = useUserStore()

  const user = localStorage.getItem('user');

  if (user) {
    userStore.setUser(JSON.parse(user))
  }

  return null;
};

export const login = (user) => {
  // axios.post('login', user)
}

export const register = (payload) => {
  return axios.post(`${api}api/register`, payload)
}

export const logout = (user) => {
  // axios.post('login', user)
}
