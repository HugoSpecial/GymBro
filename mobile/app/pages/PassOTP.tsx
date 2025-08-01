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

type RootStackParamList = {
  Login: undefined;
  PassOTP: { email: string };
  ResetPassword: { email: string };
  NewPassword: { email: string; otp: string };
  RecoverPassword: undefined;
};

const PassOTP = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { email } = route.params as { email: string };
  const { onVerifyOTP } = useAuth();

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Erro", "Por favor, insira os 6 dígitos do código OTP");
      return;
    }

    setIsLoading(true);

    try {
      if (!onVerifyOTP) {
        throw new Error("Serviço de verificação não disponível");
      }

      const result = await onVerifyOTP(email, otp);

      if (result?.error) {
        Alert.alert("Erro", result.error.message);
      } else {
        navigation.navigate("NewPassword", { email, otp });
      }
    } catch (error) {
      Alert.alert("Erro", "Código OTP inválido ou expirado");
      console.error("OTP verification error:", error);
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
                Verificação de Código
              </Text>
              <Text className="text-white text-base mt-2">
                Verifique seu email
              </Text>
            </View>
          </SafeAreaView>

          {/* Form */}
          <View className="absolute bottom-0 w-full bg-white rounded-t-3xl p-8 h-[380px]">
            {/* Instruction */}
            <Text className="text-gray-700 text-base text-center">
              Digite o código de 6 dígitos recebido por email.
            </Text>
            <Text className="text-gray-700 text-base mb-6">
                Código enviado para {email}
              </Text>

            {/* OTP Input */}
            <TextInput
              className="h-16 text-2xl border border-gray-300 rounded-xl my-8 bg-gray-100 text-center tracking-widest mb-6"
              placeholder="-    -    -    -    -    -"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
              editable={!isLoading}
            />

            {/* Verify Button */}
            <TouchableOpacity
              className={`${
                isLoading ? "bg-red-300" : "bg-red-600"
              } rounded-xl w-full h-14 items-center justify-center mt-2 mb-4`}
              onPress={handleVerifyOtp}
              disabled={isLoading}
            >
              <Text className="text-white text-lg font-bold tracking-wider">
                {isLoading ? "Verificando..." : "Verificar Código"}
              </Text>
            </TouchableOpacity>



            {/* Back to Login */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={isLoading}
              className="items-center"
            >
              <Text className="text-gray text-sm font-semibold mt-10">
                Voltar para o Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PassOTP;
