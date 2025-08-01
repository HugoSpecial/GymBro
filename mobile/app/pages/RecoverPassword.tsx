// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import React, { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import PassOTP from "./PassOTP";
// import { useAuth } from "../Context/AuthContext";

// type RootStackParamList = {
//   Login: undefined;
//   RecoverPassword: undefined;
//   PassOTP: undefined;
// };

// const RecoverPassword = () => {
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { onSendOTPEmail } = useAuth();

//   const handleRecoverPassword = async () => {
//     if (!email) {
//       Alert.alert("Erro", "Por favor, insira seu email");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       if (!onSendOTPEmail) {
//         throw new Error("Função de login não disponível");
//       }

//       const result = await onSendOTPEmail(email);

//       setIsLoading(false);
//       if (result?.error) {
//         Alert.alert("Erro no envio", result.error.message);
//       } else {
//         navigation.navigate("PassOTP"); // Redireciona para PassOTP após envio bem-sucedido
//       }
//     } catch (error) {
//       Alert.alert("Erro", "Falha ao enviar email de recuperação");
//       console.error("Recovery error:", error);
//     }

//     // Simulação de envio de email (substitua pela sua lógica real)
//     setTimeout(() => {
//       setIsLoading(false);
//       Alert.alert(
//         "Email enviado",
//         `Código de recuperação foi enviado para ${email}`,
//         [
//           {
//             text: "OK",
//             onPress: () => navigation.navigate("PassOTP"),
//           },
//         ]
//       );
//     }, 1500);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <View style={styles.innerContainer}>
//         <Text style={styles.title}>Recuperar Senha</Text>

//         <Text style={styles.instructions}>
//           Digite seu email para receber um link de recuperação
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Seu email"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoCorrect={false}
//           value={email}
//           onChangeText={setEmail}
//           editable={!isLoading}
//         />

//         <TouchableOpacity
//           style={[styles.button, isLoading && styles.buttonDisabled]}
//           onPress={() => navigation.navigate("PassOTP")}
//           disabled={isLoading}
//         >
//           <Text style={styles.buttonText}>
//             {isLoading ? "Enviando..." : "Enviar Codigo"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//     color: "#333",
//   },
//   instructions: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 32,
//     color: "#666",
//     paddingHorizontal: 20,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     marginBottom: 24,
//     fontSize: 16,
//     backgroundColor: "#f9f9f9",
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   buttonDisabled: {
//     backgroundColor: "#99C8FF",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   linkText: {
//     color: "#007AFF",
//     textAlign: "center",
//     fontSize: 14,
//   },
// });

// export default RecoverPassword;

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
  } from "react-native";
  import React, { useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { NativeStackNavigationProp } from "@react-navigation/native-stack";
  import { useAuth } from "../Context/AuthContext";
  
  type RootStackParamList = {
    Login: undefined;
    RecoverPassword: undefined;
    PassOTP: { email: string }; // Adicionando email como parâmetro
  };
  
  const RecoverPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Recuperar Senha</Text>
  
          <Text style={styles.instructions}>
            Digite seu email para receber um código de verificação
          </Text>
  
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
  
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRecoverPassword}  // Corrigido para chamar a função handleRecoverPassword
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Enviando..." : "Enviar Código"}
            </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            disabled={isLoading}
            style={styles.backButton}
          >
            <Text style={styles.linkText}>Voltar para Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    innerContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: "#333",
    },
    instructions: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 32,
      color: "#666",
      paddingHorizontal: 20,
      lineHeight: 24,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 24,
      fontSize: 16,
      backgroundColor: "#f9f9f9",
    },
    button: {
      backgroundColor: "#007AFF",
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 16,
    },
    buttonDisabled: {
      backgroundColor: "#99C8FF",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    backButton: {
      padding: 10,
      alignItems: "center",
    },
    linkText: {
      color: "#007AFF",
      fontSize: 14,
      fontWeight: "500",
    },
  });
  
  export default RecoverPassword;