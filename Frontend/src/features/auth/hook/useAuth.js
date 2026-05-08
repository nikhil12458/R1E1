import { getMe, login, register } from "../service/auth.api";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../state/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({ email, password, contact, fullname }) {
    try {
      const data = await register({ email, password, contact, fullname });
      dispatch(setUser(data.user));
      return data.user;
    } catch (error) {
      dispatch(setError(error.message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, contact, password }) {
    try {
      const data = await login({ email, contact, password });
      dispatch(setUser(data.user));
      return data.user;
    } catch (error) {
      dispatch(setError(error.message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      const data = await getMe();
      dispatch(setUser(data.user));
      console.log(data.user)
      return data.user;
    } catch (error) {
      dispatch(setError(error.message));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleLogin, handleGetMe };
};
