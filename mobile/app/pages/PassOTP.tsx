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
// import { useAuth } from "../Context/AuthContext";

// type RootStackParamList = {
//   Login: undefined;
//   PassOTP: undefined;
//   ResetPassword: { email: string }; // Adicione outras rotas conforme necessário
//   NewPassword: undefined;
//   RecoverPassword: undefined;
// };

// const PassOTP = () => {
//   const [otp, setOtp] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//       const { onVerifyOTP } = useAuth();

//     const handleVerifyOtp = () => {
//         if (otp.length !== 6) {
//         Alert.alert("Erro", "Por favor, insira o código OTP completo (6 dígitos)");
//         return;
//         }

//         setIsLoading(true);

// try {
//     const result = await onVerifyOTP(email, otp);

//               if (result.error) {
//                 Alert.alert("Erro", result.error.message);
//               } else {
//                 navigation.navigate("NewPassword");
//               }
// } catch (error) {
//         Alert.alert("Erro", "Código OTP inválido ou expirado");
//         console.error("OTP verification error:", error);
//     }
// }

//     };
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <View style={styles.innerContainer}>
//         <Text style={styles.title}>Verificação de Código</Text>

//         <Text style={styles.instructions}>
//           Insira o código de 6 dígitos que enviamos para o seu email
//         </Text>

//         <TextInput
//           style={styles.otpInput}
//           placeholder="------"
//           keyboardType="number-pad"
//           maxLength={6}
//           value={otp}
//           onChangeText={setOtp}
//           editable={!isLoading}
//           textAlign="center"
//         />

//         <TouchableOpacity
//           style={[styles.button, isLoading && styles.buttonDisabled]}
//           onPress={handleVerifyOtp}
//           disabled={isLoading}
//         >
//           <Text style={styles.buttonText}>
//             {isLoading ? "Verificando..." : "Verificar Código"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => navigation.navigate("Login")}
//           disabled={isLoading}
//         >
//           <Text style={styles.linkText}>Voltar para o Login</Text>
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
//   otpInput: {
//     height: 60,
//     width: 200,
//     alignSelf: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     fontSize: 24,
//     letterSpacing: 10,
//     backgroundColor: "#f9f9f9",
//     marginBottom: 32,
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
//   resendContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 24,
//   },
//   resendText: {
//     color: "#666",
//     marginRight: 5,
//   },
//   resendLink: {
//     color: "#007AFF",
//     fontWeight: "600",
//   },
//   linkText: {
//     color: "#007AFF",
//     textAlign: "center",
//     fontSize: 14,
//   },
// });

// export default PassOTP;
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
  const { email } = route.params as { email: string }; // Extrai o email dos parâmetros de navegação
  const { onVerifyOTP } = useAuth();

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert(
        "Erro",
        "Por favor, insira o código OTP completo (6 dígitos)"
      );
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Verificação de Código</Text>

        <Text style={styles.instructions}>
          Insira o código de 6 dígitos que enviamos para {email}
        </Text>

        <TextInput
          style={styles.otpInput}
          placeholder="------"
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
          editable={!isLoading}
          textAlign="center"
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleVerifyOtp}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Verificando..." : "Verificar Código"}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Não recebeu o código?</Text>
          <TouchableOpacity disabled={isLoading}>
            <Text style={styles.resendLink}>Reenviar OTP</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          disabled={isLoading}
        >
          <Text style={styles.linkText}>Voltar para o Login</Text>
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
  },
  otpInput: {
    height: 60,
    width: 200,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 24,
    letterSpacing: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: "#99C8FF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  resendText: {
    color: "#666",
    marginRight: 5,
  },
  resendLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
  linkText: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 14,
  },
});
export default PassOTP;
