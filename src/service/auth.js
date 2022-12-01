import { useUserStore } from "../store/userStore";
import axios from "axios";
import qs from "qs";

const api = "https://chatter-io.fly.dev";

export const getUser = async () => {
  const userStore = useUserStore();

  const token = localStorage.getItem("token");
  userStore.setToken(token);
  const config = { headers: { Authorization: ` Bearer ${token}` } };
  try {
    const { data } = await axios.get(`${api}/api/users/self`, config);
    console.log({ data });
    userStore.setUser(data);
    return data;
  } catch (e) {
    console.log(e);
    //logout()
  }

  return null;
};

export const login = async (user) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: qs.stringify(user),
    url: `${api}/api/login`,
  };
  return await axios(options);
};

export const register = (payload) => {
  console.log("register");
  return axios.post(`${api}/api/register`, payload);
};

export const logout = (user) => {
  // axios.post('login', user)
};
