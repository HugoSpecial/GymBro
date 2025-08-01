// // import { createContext, useContext, useEffect, useState } from "react";
// // import axios from "axios";
// // import * as SecureStore from "expo-secure-store";

// // interface AuthProps {
// //   authState?: { token: string | null; authenticated: boolean | null };
// //   onRegister?: (name: string, email: string, password: string) => Promise<any>;
// //   onLogin?: (email: string, password: string) => Promise<any>;
// //   onLogout?: () => Promise<any>;
// // }

// // const TOKEN_KEY = "authToken";
// // const AuthContext = createContext<AuthProps>({});
// // export const API_URL = "http://localhost:4000/api/auth";

// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // export const AuthProvider = ({ children }: any) => {
// //   const [authState, setAuthState] = useState<{
// //     token: string | null;
// //     authenticated: boolean | null;
// //   }>({
// //     token: null,
// //     authenticated: null,
// //   });

// //   useEffect(() => {
// //     const loadToken = async () => {
// //       const token = await SecureStore.getItemAsync(TOKEN_KEY);
// //       console.log("stored:", token);
// //       if (token) {
// //         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// //         setAuthState({
// //           token: token,
// //           authenticated: true,
// //         });
// //       }
// //     };
// //     loadToken();
// //   }, []);

// //   const register = async (name: string, email: string, password: string) => {
// //     try {
// //       const response = await axios.post(`${API_URL}/register`, {
// //         name,
// //         email,
// //         password,
// //       });

// //       const token = response.data.token;

// //       // Se houver token, armazena e autentica
// //       if (token) {
// //         setAuthState({
// //           token: token,
// //           authenticated: true,
// //         });

// //         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// //         await SecureStore.setItemAsync(TOKEN_KEY, token);
// //       }

// //       return response.data;
// //     } catch (error) {
// //       console.error("Registration error:", error);
// //       throw error;
// //     }
// //   };

// //   const login = async (email: string, password: string) => {
// //     try {
// //       const result = await axios.post(`${API_URL}/login`, {
// //         email,
// //         password,
// //       });

// //       console.log("~ file: AuthContext.tsx line 79 ~ login ~ result :", result);

// //       setAuthState({
// //         token: result.data.token,
// //         authenticated: true,
// //       });

// //       axios.defaults.headers.common[
// //         "Authorization"
// //       ] = `Bearer ${result.data.token}`;

// //       await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
// //       return result;
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       throw error;
// //     }
// //   };

// //   const logout = async () => {
// //     try {
// //       await SecureStore.deleteItemAsync(TOKEN_KEY);
// //       setAuthState({
// //         token: null,
// //         authenticated: false,
// //       });
// //       delete axios.defaults.headers.common["Authorization"];
// //       return true;
// //     } catch (error) {
// //       console.error("Logout error:", error);
// //       throw error;
// //     }
// //   };

// //   const value = {
// //     onRegister: register,
// //     onLogin: login,
// //     onLogout: logout,
// //     authState,
// //   };

// //   return (
// //     <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
// //   );
// // };

// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import axios, { AxiosResponse } from "axios";
// import * as SecureStore from "expo-secure-store";
// import { NavigationProp } from "@react-navigation/native";

// interface AuthState {
//   token: string | null;
//   authenticated: boolean | null;
// }

// interface UserData {
//   name?: string;
//   email: string;
//   password: string;
// }

// interface AuthResponse {
//   token?: string;
//   error?: {
//     message: string;
//   };
// }

// interface AuthContextType {
//   authState: AuthState;
//   onRegister?: (name: string, email: string, password: string) => Promise<AuthResponse>;
//   onLogin?: (email: string, password: string) => Promise<AuthResponse>;
//   onLogout?: () => Promise<boolean>;
//   onSendOTPEmail?: (email: string) => Promise<void>;
// }

// const TOKEN_KEY = "authToken";
// const AuthContext = createContext<AuthContextType>({
//   authState: { token: null, authenticated: null }
// });

// export const API_URL = "http://localhost:4000/api/auth";

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     token: null,
//     authenticated: null,
//   });

//   useEffect(() => {
//     const loadToken = async () => {
//       const token = await SecureStore.getItemAsync(TOKEN_KEY);
//       if (token) {
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         setAuthState({
//           token: token,
//           authenticated: true,
//         });
//       }
//     };
//     loadToken();
//   }, []);

//   const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
//     try {
//       const response: AxiosResponse<{ token: string }> = await axios.post(`${API_URL}/register`, {
//         name,
//         email,
//         password,
//       });

//       const token = response.data.token;

//       if (token) {
//         setAuthState({
//           token: token,
//           authenticated: true,
//         });

//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         await SecureStore.setItemAsync(TOKEN_KEY, token);
//       }

//       return response.data;
//     } catch (error: any) {
//       console.error("Registration error:", error);
//       return { error: { message: error.response?.data?.message || error.message } };
//     }
//   };

//   const login = async (email: string, password: string): Promise<AuthResponse> => {
//     try {
//       const result: AxiosResponse<{ token: string }> = await axios.post(`${API_URL}/login`, {
//         email,
//         password,
//       });

//       setAuthState({
//         token: result.data.token,
//         authenticated: true,
//       });

//       axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
//       await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

//       return result.data;
//     } catch (error: any) {
//       console.error("Login error:", error);
//       return { error: { message: error.response?.data?.message || error.message } };
//     }
//   };

//   const logout = async (): Promise<boolean> => {
//     try {
//       await SecureStore.deleteItemAsync(TOKEN_KEY);
//       setAuthState({
//         token: null,
//         authenticated: false,
//       });
//       delete axios.defaults.headers.common["Authorization"];
//       return true;
//     } catch (error) {
//       console.error("Logout error:", error);
//       throw error;
//     }
//   };

//   const sendOTPEmail = async (email: string): Promise<void> => {
//     try {
//       await axios.post(`${API_URL}/send-pass-reset-code`, { email });
//       console.log("OTP email sent successfully");
//     } catch (error: any) {
//       console.error("Error sending OTP email:", error);
//       throw new Error(error.response?.data?.message || "Failed to send OTP email");
//     }
//   };

//   const value: AuthContextType = {
//     onRegister: register,
//     onLogin: login,
//     onLogout: logout,
//     onSendOTPEmail: sendOTPEmail,
//     authState,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  token: string | null;
  authenticated: boolean | null;
}

interface UserData {
  name?: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token?: string;
  error?: {
    message: string;
  };
}

interface OTPResponse {
  success?: boolean;
  error?: {
    message: string;
  };
}

interface AuthContextType {
  authState: AuthState;
  onRegister: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  onLogin: (email: string, password: string) => Promise<AuthResponse>;
  onLogout: () => Promise<boolean>;
  onSendOTPEmail: (email: string) => Promise<OTPResponse>;
  onVerifyOTP: (email: string, otp: string) => Promise<OTPResponse>;
  onNewPassword: (email: string, otp: string, newPassword: string) => Promise<OTPResponse>;
}

const TOKEN_KEY = "authToken";
export const API_URL = "http://localhost:4000/api/auth";

const AuthContext = createContext<AuthContextType>({
  authState: { token: null, authenticated: null },
  onRegister: () => Promise.reject("Context not initialized"),
  onLogin: () => Promise.reject("Context not initialized"),
  onLogout: () => Promise.reject("Context not initialized"),
  onSendOTPEmail: () => Promise.reject("Context not initialized"),
  onVerifyOTP: () => Promise.reject("Context not initialized"),
  onNewPassword: () => Promise.reject("Context not initialized"),
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({
            token,
            authenticated: true,
          });
        }
      } catch (error) {
        console.error("Failed to load token:", error);
      }
    };
    loadToken();
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<{ token: string }> = await axios.post(
        `${API_URL}/register`,
        {
          name,
          email,
          password,
        }
      );

      const { token } = response.data;
      if (!token) throw new Error("No token received");

      await SecureStore.setItemAsync(TOKEN_KEY, token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({ token, authenticated: true });

      return { token };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || err.message || "Registration failed";
      return { error: { message } };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const response: AxiosResponse<{ token: string }> = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      if (!token) throw new Error("No token received");

      await SecureStore.setItemAsync(TOKEN_KEY, token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({ token, authenticated: true });

      return { token };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || err.message || "Login failed";
      return { error: { message } };
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      delete axios.defaults.headers.common["Authorization"];
      setAuthState({ token: null, authenticated: false });
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  };

  const sendOTPEmail = async (email: string): Promise<OTPResponse> => {
    try {
      await axios.post(`${API_URL}/send-pass-reset-code`, { email });
      return { success: true };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || err.message || "Failed to send OTP";
      return { error: { message } };
    }
  };

  const verifyOTP = async (
    email: string,
    otp: string
  ): Promise<OTPResponse> => {
    try {
      const response: AxiosResponse<{ success: boolean }> = await axios.post(
        `${API_URL}/verify-pass-reset-code`,
        { email, otp }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || err.message || "OTP verification failed";
      return { error: { message } };
    }
  };

  const newPassword = async (
    email: string,
    otp: string,
    newPassword: string
  ): Promise<OTPResponse> => {
    try {
      const response: AxiosResponse<{ success: boolean; message?: string }> =
        await axios.post(`${API_URL}/reset-password`, {
          email,
          otp,
          newPassword,
        });
  
      if (!response.data.success) {
        throw new Error(response.data.message || "Password reset failed");
      }
  
      return { success: true };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message || err.message || "Password reset failed";
      return { error: { message } };
    }
  };
  
  

  const value: AuthContextType = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onSendOTPEmail: sendOTPEmail,
    onVerifyOTP: verifyOTP,
    onNewPassword: newPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
