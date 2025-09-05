import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ProfileEdit = () => {
  const { user, updateUser } = useUser();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  // Preenche o formulário com os dados do usuário
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Erro", "O nome é obrigatório");
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert("Erro", "O email é obrigatório");
      return;
    }

    setLoading(true);
    try {
      const success = await updateUser(formData);
      if (success) {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o perfil");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao atualizar o perfil");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4">
        <Text className="text-white text-2xl font-bold mb-6 text-center">
          Editar Perfil
        </Text>

        <View className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          {/* Name Input */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="person-outline" size={20} color="#ef4444" />
              <Text className="text-gray-400 text-sm ml-2">Nome</Text>
            </View>
            <TextInput
              className="border border-gray-600 rounded-lg p-3 text-white bg-gray-700"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Digite seu nome"
              placeholderTextColor="#666"
              editable={!loading}
            />
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Ionicons name="mail-outline" size={20} color="#ef4444" />
              <Text className="text-gray-400 text-sm ml-2">Email</Text>
            </View>
            <TextInput
              className="border border-gray-600 rounded-lg p-3 text-white bg-gray-700"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Digite seu email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          className="flex-row items-center justify-center py-3 px-4 bg-[#ef4444] rounded-lg mb-3 active:bg-red-600"
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="checkmark-outline" size={20} color="white" />
              <Text className="text-white font-medium ml-2">
                Salvar Alterações
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-center py-3 px-4 bg-gray-700 rounded-lg mb-3 active:bg-gray-600"
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Ionicons name="close-outline" size={20} color="#facc15" />
          <Text className="text-yellow-400 font-medium ml-2">Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileEdit;