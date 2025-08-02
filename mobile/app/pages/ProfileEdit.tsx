import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigation } from "@react-navigation/native";

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
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <View className="bg-white rounded-lg p-6 shadow-sm">
        <Text className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Editar Perfil
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500 mb-1">Nome</Text>
          <TextInput
            className="border border-gray-300 rounded p-3 text-gray-800"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Digite seu nome"
            editable={!loading}
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-500 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded p-3 text-gray-800"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          className="bg-blue-500 rounded-lg p-3 items-center mb-3"
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-medium">Salvar Alterações</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-gray-300 rounded-lg p-3 items-center"
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text className="text-gray-800 font-medium">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileEdit;
