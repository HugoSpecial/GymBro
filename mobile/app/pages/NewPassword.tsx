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
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../Context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  Login: undefined;
  PassOTP: { email: string };
  NewPassword: { email: string; otp: string };
  RecoverPassword: undefined;
};

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { email, otp } = route.params as { email: string; otp: string };
  const { onNewPassword } = useAuth();

  const handleResetPassword = async () => {
    if (!newPassword) {
      Alert.alert("Erro", "Por favor, insira a nova password");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Erro", "A password deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const result = await onNewPassword(email, otp, newPassword);

      if (result?.error) {
        Alert.alert("Erro", result.error.message);
      } else {
        Alert.alert("Sucesso", "Password redefinida com sucesso");
        navigation.navigate("Login");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao redefinir a password");
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
              source={require("../../assets/3.jpeg")}
              className="w-full h-4/5"
              resizeMode="cover"
            >
              <View className="absolute inset-0 bg-black opacity-20" />
            </ImageBackground>
          </View>

          {/* Header */}
          <SafeAreaView className="flex-1">
            <View className="px-8 pt-8">
              <Text className="text-white text-4xl font-extrabold">
                Nova Password
              </Text>
              <Text className="text-white text-base mt-2">
                Crie uma password segura
              </Text>
            </View>
          </SafeAreaView>

          {/* Form */}
          <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 h-[350px]">
            <Text className="text-gray-700 text-base text-center mb-6">
              Insira sua nova Password abaixo
            </Text>

            {/* Password Input */}
            <View className="relative mb-6">
              <TextInput
                className="h-14 border border-gray-300 rounded-xl px-4 bg-gray-100 text-base"
                placeholder="Nova Password"
                secureTextEntry={!passwordVisible}
                value={newPassword}
                onChangeText={setNewPassword}
                editable={!isLoading}
              />
              <TouchableOpacity
                className="absolute right-4 top-3"
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? "eye" : "eye-off"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            {/* Password Requirements */}
            <View className="mb-6">
              <Text className="text-gray-500 text-sm">
                A password deve conter pelo menos:
              </Text>
              <Text className="text-gray-500 text-sm">• 6 caracteres</Text>
            </View>

            {/* Reset Password Button */}
            <TouchableOpacity
              className={`${
                isLoading ? "bg-red-300" : "bg-red-600"
              } rounded-xl w-full h-14 items-center justify-center mb-4`}
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              <Text className="text-white text-lg font-bold tracking-wider">
                {isLoading ? "Atualizando..." : "Alterar Password"}
              </Text>
            </TouchableOpacity>

            {/* Back to Login */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={isLoading}
              className="items-center"
            >
              <Text className="text-gray-500 text-sm font-semibold mt-6">
                Voltar para o Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewPassword;
