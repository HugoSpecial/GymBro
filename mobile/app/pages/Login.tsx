// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import React, { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useAuth } from "../Context/AuthContext";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// type LoginStackParamList = {
//   Register: undefined;
//   Home: undefined;
//   RecoverPassword: undefined;
// };

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { onLogin } = useAuth();

//   const navigation =
//     useNavigation<NativeStackNavigationProp<LoginStackParamList>>();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Erro", "Por favor, preencha email e senha");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       if (!onLogin) {
//         throw new Error("Função de login não disponível");
//       }

//       const result = await onLogin(email, password);

//       if (result?.error) {
//         Alert.alert("Erro no login", result.error.message);
//       }
//     } catch (error) {
//       Alert.alert("Erro", "Falha ao fazer login");
//       console.error("Login error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // return (
//   //   <View className="flex-1 bg-slate-100">
//   //     {/* Background Image */}
//   //     <View className="absolute w-full h-full">
//   //       <ImageBackground
//   //         source={require("../../assets/1.jpeg")}
//   //         className="w-full h-3/5"
//   //         resizeMode="cover"
//   //       >
//   //         <View className="absolute inset-0 bg-black opacity-20" />
//   //       </ImageBackground>
//   //     </View>

//   //     {/* Header */}
//   //     <SafeAreaView className="flex-1">
//   //       <View className="px-8 pt-8">
//   //         <Text className="text-white text-4xl font-extrabold">Login</Text>
//   //         <Text className="text-white text-lg mt-2 opacity-70">
//   //           Continua a tua jornada!
//   //         </Text>
//   //       </View>
//   //     </SafeAreaView>

//   //     {/* Form */}
//   //     <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 h-[400px]">
//   //       {/* Email Input */}
//   //       <View className="mb-4">
//   //         <Text className="text-gray-800 font-medium mb-1">Email</Text>
//   //         <View className="flex-row items-center h-14 border rounded-xl px-4 border-gray-300">
//   //           <TextInput
//   //             className="flex-1 h-full text-gray-900"
//   //             placeholder="Escreva seu Email ..."
//   //             placeholderTextColor="#999"
//   //             keyboardType="email-address"
//   //             autoCapitalize="none"
//   //             value={email}
//   //             onChangeText={setEmail}
//   //           />
//   //         </View>
//   //       </View>

//   //       {/* Password Input */}
//   //       <View className="mb-6">
//   //         <Text className="text-gray-800 font-medium mb-1">Senha</Text>
//   //         <View className="flex-row items-center h-14 border rounded-xl px-4 border-gray-300">
//   //           <TextInput
//   //             className="flex-1 h-full text-gray-900"
//   //             placeholder="Escreva sua Senha ..."
//   //             placeholderTextColor="#999"
//   //             secureTextEntry={true}
//   //             value={password}
//   //             onChangeText={setPassword}
//   //           />
//   //         </View>
//   //       </View>

//   //       <TouchableOpacity
//   //         onPress={() => navigation.navigate("RecoverPassword")}
//   //         disabled={isLoading}
//   //       >
//   //         <Text className="text-gray text-right">Recuperar Password</Text>
//   //       </TouchableOpacity>

//   //       {/* Login Button */}
//   //       <TouchableOpacity
//   //         className="bg-red-600 rounded-xl w-full h-14 items-center justify-center my-4"
//   //         onPress={handleLogin}
//   //         disabled={isLoading}
//   //       >
//   //         <Text className="text-white text-lg font-bold tracking-wider">
//   //           {isLoading ? "Carregando..." : "Entrar"}
//   //         </Text>
//   //       </TouchableOpacity>

//   //       {/* Register Link */}
//   //       <View className="flex-row justify-center mt-8">
//   //         <Text className="text-gray-700">Sem conta? </Text>
//   //         <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//   //           <Text className="text-red-600 font-bold">Crie Agora!</Text>
//   //         </TouchableOpacity>
//   //       </View>
//   //     </View>
//   //   </View>
//   // );

//   return (
//     <KeyboardAvoidingView
//       className="flex-1"
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//     >
//       <ScrollView
//         className="flex-1"
//         contentContainerStyle={{ flexGrow: 1 }}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View className="flex-1 bg-slate-100">
//           {/* Background */}
//           <View className="absolute w-full h-full">
//             <ImageBackground
//               source={require("../../assets/1.jpeg")}
//               className="w-full h-3/5"
//               resizeMode="cover"
//             >
//               <View className="absolute inset-0 bg-black opacity-20" />
//             </ImageBackground>
//           </View>

//           {/* Header */}
//           <SafeAreaView className="flex-1">
//             <View className="px-8 pt-8">
//               <Text className="text-white text-4xl font-extrabold">Login</Text>
//               <Text className="text-white text-lg mt-2 opacity-70">
//                 Continua a tua jornada!
//               </Text>
//             </View>
//           </SafeAreaView>

//           {/* Form */}
//           <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 h-[400px]">
//             {/* Email Input */}
//             <View className="mb-4">
//               <Text className="text-gray-800 font-medium mb-1">Email</Text>
//               <View className="flex-row items-center h-14 border rounded-xl px-4 border-gray-300">
//                 <TextInput
//                   className="flex-1 h-full text-gray-900"
//                   placeholder="email@exemplo.com"
//                   placeholderTextColor="#999"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   value={email}
//                   onChangeText={setEmail}
//                 />
//               </View>
//             </View>

//             {/* Password Input */}
//             <View className="mb-6">
//               <Text className="text-gray-800 font-medium mb-1">Password</Text>
//               <View className="flex-row items-center h-14 border rounded-xl px-4 border-gray-300">
//                 <TextInput
//                   className="flex-1 h-full text-gray-900"
//                   placeholder="******"
//                   placeholderTextColor="#999"
//                   secureTextEntry
//                   value={password}
//                   onChangeText={setPassword}
//                 />
//               </View>
//             </View>

//             <TouchableOpacity
//               onPress={() => navigation.navigate("RecoverPassword")}
//               disabled={isLoading}
//             >
//               <Text className="text-gray text-right">Alterar Password</Text>
//             </TouchableOpacity>

//             {/* Login Button */}
//             <TouchableOpacity
//               className="bg-red-600 rounded-xl w-full h-14 items-center justify-center mt-8"
//               onPress={handleLogin}
//               disabled={isLoading}
//             >
//               <Text className="text-white text-lg font-bold tracking-wider">
//                 {isLoading ? "A Entrar ..." : "Entrar"}
//               </Text>
//             </TouchableOpacity>

//             <View className="flex-row justify-center mt-10">
//               <Text className="text-gray-700">Sem conta? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//                 <Text className="text-red-600 font-bold">Cria Agora!</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default Login;

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

type LoginStackParamList = {
  Register: undefined;
  Home: undefined;
  RecoverPassword: undefined;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { onLogin } = useAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<LoginStackParamList>>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha email e senha");
      return;
    }

    setIsLoading(true);

    try {
      if (!onLogin) {
        throw new Error("Função de login não disponível");
      }

      const result = await onLogin(email, password);

      if (result?.error) {
        Alert.alert("Erro no login", result.error.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao fazer login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 bg-slate-100">
          {/* Background */}
          <View className="absolute w-full h-full">
            <ImageBackground
              source={require("../../assets/1.jpeg")}
              className="w-full h-3/5"
              resizeMode="cover"
            >
              <View className="absolute inset-0 bg-black opacity-20" />
            </ImageBackground>
          </View>

          {/* Header */}
          <SafeAreaView className="flex-1">
            <View className="px-8 pt-8">
              <Text className="text-white text-4xl font-extrabold">Login</Text>
              <Text className="text-white text-lg mt-2 opacity-70">
                Continua a tua jornada!
              </Text>
            </View>
          </SafeAreaView>

          {/* Form */}
          <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 h-[400px]">
            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-gray-800 font-medium mb-1">Email</Text>
              <View className="flex-row items-center h-14 border rounded-xl px-4 border-gray-300">
                <TextInput
                  className="flex-1 h-full text-gray-900"
                  placeholder="email@exemplo.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-gray-800 font-medium mb-1">Password</Text>
              <View className="flex-row items-center h-14 border rounded-xl px-4 border-gray-300">
                <TextInput
                  className="flex-1 h-full text-gray-900"
                  placeholder="******"
                  placeholderTextColor="#999"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  className="ml-2"
                >
                  <Ionicons
                    name={passwordVisible ? "eye" : "eye-off"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("RecoverPassword")}
              disabled={isLoading}
            >
              <Text className="text-gray text-right">Alterar Password</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-red-600 rounded-xl w-full h-14 items-center justify-center mt-8"
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text className="text-white text-lg font-bold tracking-wider">
                {isLoading ? "A Entrar ..." : "Entrar"}
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-10">
              <Text className="text-gray-700">Sem conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className="text-red-600 font-bold">Cria Agora!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
