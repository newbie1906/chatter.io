import { useUserStore } from '../store/userStore';
import axios from 'axios';
import qs from 'qs';

const api = 'https://chatter-io.fly.dev'

export const getUser = () => {
  const userStore = useUserStore()

  const user = localStorage.getItem('user');

  if (user) {
    userStore.setUser(JSON.parse(user))
  }

  return null;
};

export const login = async (user) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(user),
    url:`${api}/api/login`
  }
 return await axios(options)
}

export const register = (payload) => {
  return axios.post(`${api}/api/register`, payload)
}

export const logout = (user) => {
  // axios.post('login', user)
}
