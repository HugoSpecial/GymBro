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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../Context/AuthContext";

type RootStackParamList = {
  Login: undefined;
  RecoverPassword: undefined;
  PassOTP: { email: string };
};

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { onSendOTPEmail } = useAuth();

  const handleRecoverPassword = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu email");
      return;
    }

    setIsLoading(true);

    try {
      const result = await onSendOTPEmail(email);

      if (result.error) {
        Alert.alert("Erro", result.error.message);
      } else {
        navigation.navigate("PassOTP", { email });
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro inesperado");
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
                Recuperar Senha
              </Text>
              <Text className="text-white text-lg mt-2 opacity-70">
                Digite seu email para continuar
              </Text>
            </View>
          </SafeAreaView>

          {/* Form Container */}
          <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 h-[350px]">
            {/* Instruction */}
            <Text className="text-gray-700 text-base text-center mb-6">
              Enviaremos um código de verificação para o seu email.
            </Text>

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

            {/* Send Button */}
            <TouchableOpacity
              className={`${
                isLoading ? "bg-red-300" : "bg-red-600"
              } rounded-xl w-full h-14 items-center justify-center my-4`}
              onPress={handleRecoverPassword}
              disabled={isLoading}
            >
              <Text className="text-white text-lg font-bold tracking-wider">
                {isLoading ? "Enviando..." : "Enviar Código"}
              </Text>
            </TouchableOpacity>

            {/* Back to Login */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={isLoading}
              className="items-center mt-8"
            >
              <Text className="text-gray font-semibold">
                Voltar para Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RecoverPassword;
