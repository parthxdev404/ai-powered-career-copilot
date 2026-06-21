import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../redux/store";

import { setUser, finishLoading } from "../redux/authSlice";

import { getUser } from "../services/authService";

const AuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  const loadUser = async () => {
    try {
      const response = await getUser();

      dispatch(setUser(response.user));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(finishLoading());
    }
  };

  loadUser();
}, [dispatch]);

  return null;
};

export default AuthInitializer;