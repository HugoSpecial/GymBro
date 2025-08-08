import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "./AuthContext";

interface User {
  id: string;
  name: string;
  email: string;
  createAccountAt: Date | string;
}

interface UserResponse {
  success: boolean;
  user: User;
}

// export const API_URL = "http://localhost:4000/api/user";
export const API_URL = "http://127.0.0.1:4000/api/user";


const UserContext = createContext({
  user: null as User | null,
  fetchUser: async (): Promise<void> => {},
  updateUser: async (data: { name?: string; email?: string }): Promise<boolean> => false,
  deleteUser: async (): Promise<boolean> => false,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (authState.authenticated) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [authState.authenticated]);

  const fetchUser = async (): Promise<void> => {
    try {
      const response: AxiosResponse<UserResponse> = await axios.get(`${API_URL}/me`);
      setUser(response.data.user);  // Fixed: Now properly accessing nested user data
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const updateUser = async (data: { name?: string; email?: string }): Promise<boolean> => {
    try {
      const response: AxiosResponse<UserResponse> = await axios.put(
        `${API_URL}/me-update`,
        data
      );
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error("Failed to update user:", error);
      return false;
    }
  };

  const deleteUser = async (): Promise<boolean> => {
    try {
      await axios.delete(`${API_URL}/me-delete`);
      setUser(null);
      return true;
    } catch (error) {
      console.error("Failed to delete user:", error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};