// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useAuth } from '../Context/AuthContext';

// type RootStackParamList = {
//   Login: undefined;
//   NewPassword: undefined;
// };

// const NewPassword = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

// const {onNewPassword} = useAuth();

// const handleResetPassword = async () => {
//     if (!newPassword || !confirmPassword) {
//         Alert.alert('Erro', 'Por favor, preencha todos os campos');
//         return;
//     }
    
//     if (newPassword !== confirmPassword) {
//         Alert.alert('Erro', 'As senhas não coincidem');
//         return;
//     }
    
//     setIsLoading(true);
    
// try {
//             if (!onNewPassword) {
//               throw new Error("Função de redefinição de senha não disponível");
//             }
      
//             const result = await onNewPassword(email, password);
                    
//             if (result?.error) {
//               Alert.alert("Erro", result.error.message);
//             } else {
//               navigation.navigate("Login"); 
//             }
// } catch (error) {
//         Alert.alert('Erro', 'Ocorreu um erro ao redefinir a senha');
//         console.error('Reset password error:', error);
//     }
    
// }
// };


//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <View style={styles.innerContainer}>
//         <Text style={styles.title}>Criar Nova Senha</Text>
        
//         <Text style={styles.instructions}>
//           Crie uma nova senha segura para sua conta
//         </Text>
        
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Nova senha"
//             secureTextEntry={!passwordVisible}
//             value={newPassword}
//             onChangeText={setNewPassword}
//             editable={!isLoading}
//           />
//           <TouchableOpacity 
//             style={styles.visibilityToggle}
//             onPress={() => setPasswordVisible(!passwordVisible)}
//           >
//             <Text style={styles.visibilityText}>
//               {passwordVisible ? '👁️' : '👁️‍🗨️'}
//             </Text>
//           </TouchableOpacity>
//         </View>
        
//         <TextInput
//           style={styles.input}
//           placeholder="Confirmar nova senha"
//           secureTextEntry={!passwordVisible}
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           editable={!isLoading}
//         />
        
//         <TouchableOpacity
//           style={[styles.button, isLoading && styles.buttonDisabled]}
//           onPress={handleResetPassword}
//           disabled={isLoading}
//         >
//           <Text style={styles.buttonText}>
//             {isLoading ? 'Atualizando...' : 'Redefinir Senha'}
//           </Text>
//         </TouchableOpacity>
        

//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//     color: '#333',
//   },
//   instructions: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 32,
//     color: '#666',
//     paddingHorizontal: 20,
//   },
//   passwordContainer: {
//     position: 'relative',
//     marginBottom: 16,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   visibilityToggle: {
//     position: 'absolute',
//     right: 15,
//     top: 12,
//   },
//   visibilityText: {
//     fontSize: 20,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//     marginBottom: 24,
//   },
//   buttonDisabled: {
//     backgroundColor: '#99C8FF',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   passwordRules: {
//     marginTop: 8,
//     paddingHorizontal: 16,
//   },
//   ruleText: {
//     color: '#666',
//     fontSize: 14,
//     marginBottom: 4,
//   },
// });

// export default NewPassword;

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
    NewPassword: { email: string; otp: string }; 
    RecoverPassword: undefined;
  };
  
  
  const NewPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const { email, otp } = route.params as { email: string; otp: string };
  
    const { onNewPassword } = useAuth();
  
    const handleResetPassword = async () => {
      if (!newPassword || !confirmPassword) {
        Alert.alert("Erro", "Por favor, preencha todos os campos");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem");
        return;
      }
  
      setIsLoading(true);
  
      try {
        const result = await onNewPassword(email, otp, newPassword);
  
        if (result?.error) {
          Alert.alert("Erro", result.error.message);
        } else {
          Alert.alert("Sucesso", "Senha redefinida com sucesso");
          navigation.navigate("Login");
        }
      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao redefinir a senha");
        console.error("Reset password error:", error);
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
          <Text style={styles.title}>Criar Nova Senha</Text>
  
          <Text style={styles.instructions}>
            Crie uma nova senha segura para sua conta
          </Text>
  
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              secureTextEntry={!passwordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.visibilityToggle}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Text style={styles.visibilityText}>
                {passwordVisible ? "👁️" : "👁️‍🗨️"}
              </Text>
            </TouchableOpacity>
          </View>
  
          <TextInput
            style={styles.input}
            placeholder="Confirmar nova senha"
            secureTextEntry={!passwordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!isLoading}
          />
  
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Atualizando..." : "Redefinir Senha"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
    paddingHorizontal: 20,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  visibilityToggle: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  visibilityText: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: '#99C8FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  passwordRules: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  ruleText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
});

export default NewPassword;