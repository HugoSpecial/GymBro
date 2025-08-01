import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Tipos de navegação específicos para o Login
type LoginStackParamList = {
  Register: undefined;
  Home: undefined;
  RecoverPassword: undefined;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { onLogin } = useAuth();

  const navigation = useNavigation<NativeStackNavigationProp<LoginStackParamList>>();

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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.form}>
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

<TouchableOpacity
        onPress={() => navigation.navigate("RecoverPassword")}
        disabled={isLoading}
      >
        <Text style={styles.registerLink}>Recuperar Password</Text>
      </TouchableOpacity>



        <Button 
          title={isLoading ? "Carregando..." : "Entrar"} 
          onPress={handleLogin} 
          disabled={isLoading}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        disabled={isLoading}
      >
        <Text style={styles.registerLink}>Criar nova conta</Text>
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
  registerLink: {
    marginTop: 20,
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Login;