import { useState } from "react";
import { useUserStore } from "./use-user-store";
import { useGuestStore } from "./use-guest-store";

export const useStore = () => {
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  const setGuest = () => {
    setUserType("guest");
    localStorage.setItem("userType", "guest");
  };

  const setUser = () => {
    setUserType("user");
    localStorage.setItem("userType", "user");
  };

  const guestStore = useGuestStore();
  const userStore = useUserStore();

  const store = userType === "user" ? userStore : guestStore;

  return { store, userType, setGuest, setUser };
};
