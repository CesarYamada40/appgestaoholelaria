import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, HStack, Text, Avatar, Pressable, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const Profile = ({ navigation }) => {
  const menuItems = [
    {
      title: 'Editar Perfil',
      icon: 'person-outline',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      title: 'Minhas Reservas',
      icon: 'calendar-outline',
      onPress: () => navigation.navigate('Reservar'),
    },
    {
      title: 'Meus Cartões',
      icon: 'card-outline',
      onPress: () => navigation.navigate('Cartões'),
    },
    {
      title: 'Configurações',
      icon: 'settings-outline',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'Ajuda',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('Help'),
    },
  ];

  return (
    <View style={styles.container}>
      <VStack space={6} p={4}>
        <HStack space={4} alignItems="center">
          <Avatar
            size="xl"
            source={{ uri: 'https://via.placeholder.com/150' }}
          />
          <VStack>
            <Text fontSize="xl" fontWeight="bold">André Guimarães Lira</Text>
            <Text fontSize="sm" color="gray.500">213.234 pontos</Text>
          </VStack>
        </HStack>

        <VStack space={2}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={item.onPress}
              bg="white"
              p={4}
              rounded="lg"
              shadow={1}
            >
              <HStack alignItems="center" justifyContent="space-between">
                <HStack space={3} alignItems="center">
                  <Icon
                    as={Ionicons}
                    name={item.icon}
                    size={6}
                    color="#DAA520"
                  />
                  <Text fontSize="md">{item.title}</Text>
                </HStack>
                <Icon
                  as={Ionicons}
                  name="chevron-forward"
                  size={5}
                  color="gray.400"
                />
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
