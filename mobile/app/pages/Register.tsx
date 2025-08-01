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

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { onRegister } = useAuth();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      if (!onRegister) {
        throw new Error("Função de registro não disponível");
      }

      const result = await onRegister(name, email, password);

      if (result?.error) {
        Alert.alert("Erro no registro", result.error.message);
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao criar conta");
      console.error("Registration error:", error);
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
          {/* Background Image */}
          <View className="absolute w-full h-full">
            <ImageBackground
              source={require("../../assets/2.jpeg")}
              className="w-full h-3/5"
              resizeMode="cover"
            >
              <View className="absolute inset-0 bg-black opacity-20" />
            </ImageBackground>
          </View>

          {/* Header */}
          <SafeAreaView className="flex-1">
            <View className="px-8 pt-5">
              <Text className="text-white text-4xl font-extrabold">Criar Conta</Text>
              <Text className="text-white text-lg mt-2 opacity-70">
                Junta-te à aventura!
              </Text>
            </View>
          </SafeAreaView>

          {/* Form Container */}
          <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 h-[460px]">
            {/* Name Input */}
            <View className="mb-4">
              <Text className="text-gray-800 font-medium mb-1">Nome</Text>
              <View className="flex-row items-center h-14 border rounded-xl px-4 border-gray-300">
                <TextInput
                  className="flex-1 h-full text-gray-900"
                  placeholder="Hugo Especial"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  editable={!isLoading}
                />
              </View>
            </View>

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
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-gray-800 font-medium mb-1">Password</Text>
              <View className="flex-row items-center h-14 border rounded-xl px-4 border-gray-300">
                <TextInput
                  className="flex-1 h-full text-gray-900"
                  placeholder="******"
                  placeholderTextColor="#999"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isLoading}
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

            {/* Register Button */}
            <TouchableOpacity
              className="bg-red-600 rounded-xl w-full h-14 items-center justify-center my-4"
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text className="text-white text-lg font-bold tracking-wider">
                {isLoading ? "A Criar..." : "Criar Conta"}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-700">Já tem conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-red-600 font-bold">Entra Aqui!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
