import { useUserStore } from '../store/userStore';

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
  // axios.post('register', payload)
}

export const logout = (user) => {
  // axios.post('login', user)
}
