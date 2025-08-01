import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Defina os tipos de navegação diretamente no componente
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { onRegister } = useAuth();

  // Use NativeStackNavigationProp ao invés de StackNavigationProp
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
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          onChangeText={setName}
          value={name}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          editable={!isLoading}
        />

        <Button 
          title={isLoading ? "Criando conta..." : "Registrar"} 
          onPress={handleRegister} 
          disabled={isLoading}
        />
      </View>

      <TouchableOpacity 
        onPress={() => navigation.navigate("Login")}
        disabled={isLoading}
      >
        <Text style={styles.loginLink}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    gap: 15,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default Register;