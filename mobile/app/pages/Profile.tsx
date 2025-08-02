import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useUser } from '../Context/UserContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAuth } from '../Context/AuthContext'

type RootStackParamList = {
  Profile: undefined
  ProfileEdit: undefined
  Login: undefined
}

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>()
  const { user, deleteUser } = useUser()
  const { onLogout } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-gray-600">Carregando dados do usuário...</Text>
      </View>
    )
  }

  const formatDate = (date: string | Date) => {
    try {
      const dateObj = new Date(date)
      return dateObj.toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Data desconhecida'
    }
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Conta',
      'Tem certeza que deseja eliminar sua conta permanentemente? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true)
            try {
              const success = await deleteUser()
              if (success) {
                await onLogout()
                Alert.alert('Conta Eliminada', 'Sua conta foi eliminada com sucesso.')
              }
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível eliminar a conta. Por favor, tente novamente.')
            } finally {
              setIsDeleting(false)
            }
          }
        }
      ]
    )
  }

  return (
    <View className="flex-1 p-4 bg-gray-50 items-center justify-center">
      <View className="w-full max-w-md bg-white rounded-lg p-6 shadow-sm">
        <Text className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Perfil do Utilizador
        </Text>
        
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500 mb-1">Nome</Text>
          <Text className="text-lg text-gray-800">
            {user.name || 'Não definido'}
          </Text>
        </View>
        
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-500 mb-1">Email</Text>
          <Text className="text-lg text-gray-800">
            {user.email || 'Não definido'}
          </Text>
        </View>
        
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-500 mb-1">Conta criada em</Text>
          <Text className="text-lg text-gray-800">
            {user.createAccountAt ? formatDate(user.createAccountAt) : 'Data não disponível'}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-green-500 rounded-lg p-3 items-center mb-3"
          onPress={() => navigation.navigate('ProfileEdit')}
        >
          <Text className="text-white font-medium">Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border border-red-500 rounded-lg p-3 items-center"
          onPress={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator color="#ef4444" />
          ) : (
            <Text className="text-red-500 font-medium">Eliminar Conta</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile