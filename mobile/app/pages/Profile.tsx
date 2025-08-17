import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../Context/AuthContext";

type RootStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
  Login: undefined;
};

const Profile = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Profile">>();
  const { user, deleteUser } = useUser();
  const { onLogout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="small" color="#ef4444" />
        <Text className="text-gray-400 mt-3">
          Carregando dados do usuário...
        </Text>
      </SafeAreaView>
    );
  }

  const formatDate = (date: string | Date) => {
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString("pt-PT", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Data desconhecida";
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar Conta",
      "Tem certeza que deseja eliminar sua conta permanentemente? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              const success = await deleteUser();
              if (success) {
                await onLogout();
                Alert.alert(
                  "Conta Eliminada",
                  "Sua conta foi eliminada com sucesso."
                );
              }
            } catch {
              Alert.alert(
                "Erro",
                "Não foi possível eliminar a conta. Por favor, tente novamente."
              );
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4">
        <Text className="text-white text-2xl font-bold mb-6 text-center">
          Perfil do Utilizador
        </Text>

        {/* Profile Info Card */}
        <View className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          {/* Name */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="person-outline" size={22} color="#ef4444" />
            <View className="ml-3">
              <Text className="text-gray-400 text-sm">Nome</Text>
              <Text className="text-white text-lg font-medium">
                {user.name || "Não definido"}
              </Text>
            </View>
          </View>

          {/* Email */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="mail-outline" size={22} color="#ef4444" />
            <View className="ml-3">
              <Text className="text-gray-400 text-sm">Email</Text>
              <Text className="text-white text-lg font-medium">
                {user.email || "Não definido"}
              </Text>
            </View>
          </View>

          {/* Created At */}
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={22} color="#ef4444" />
            <View className="ml-3">
              <Text className="text-gray-400 text-sm">Conta criada em</Text>
              <Text className="text-white text-lg font-medium">
                {user.createAccountAt
                  ? formatDate(user.createAccountAt)
                  : "Data não disponível"}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileEdit")}
          className="flex-row items-center justify-center py-3 px-4 bg-gray-700 rounded-lg mb-3 active:bg-gray-600"
        >
          <Ionicons name="create-outline" size={20} color="#facc15" />
          <Text className="text-yellow-400 font-medium ml-2">
            Editar Perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onLogout}
          className="flex-row items-center justify-center py-3 px-4 bg-gray-700 rounded-lg mb-3 active:bg-gray-600"
        >
          <Ionicons name="log-out-outline" size={20} color="#f59e0b" />
          <Text className="text-yellow-500 font-medium ml-2">Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteAccount}
          disabled={isDeleting}
          className={`flex-row items-center justify-center py-3 px-4 border rounded-lg ${
            isDeleting ? "border-gray-500" : "border-red-500"
          } active:bg-gray-800`}
        >
          {isDeleting ? (
            <ActivityIndicator color="#ef4444" />
          ) : (
            <>
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
              <Text className="text-red-500 font-medium ml-2">
                Eliminar Conta
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
