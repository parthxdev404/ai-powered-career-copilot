import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../redux/store";

import { setUser } from "../redux/authSlice";

import { getUser } from "../services/authService";

const AuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await getUser();

        dispatch(setUser(response.user));
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");
      }
    };

    loadUser();
  }, [dispatch]);

  return null;
};

export default AuthInitializer;