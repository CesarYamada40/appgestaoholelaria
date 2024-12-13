import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, HStack, Text, Pressable, Icon, Divider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const Menu = ({ navigation }) => {
  const menuItems = [
    {
      title: 'Explorar',
      description: 'Conhecer o Essence',
      icon: 'compass-outline',
      onPress: () => {},
    },
    {
      title: 'Room Service',
      description: 'Pedir serviço de quartos',
      icon: 'restaurant-outline',
      onPress: () => {},
    },
    {
      title: 'Configurações',
      description: 'Preferências do app',
      icon: 'settings-outline',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      title: 'Ajuda',
      description: 'Central de ajuda',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('Help'),
    },
  ];

  return (
    <View style={styles.container}>
      <VStack space={2} p={4}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <Pressable
              onPress={item.onPress}
              bg="white"
              p={4}
              rounded="lg"
              shadow={1}
            >
              <HStack space={4} alignItems="center">
                <Icon
                  as={Ionicons}
                  name={item.icon}
                  size={6}
                  color="#DAA520"
                />
                <VStack>
                  <Text fontSize="md" fontWeight="bold">{item.title}</Text>
                  <Text fontSize="sm" color="gray.500">{item.description}</Text>
                </VStack>
              </HStack>
            </Pressable>
            {index < menuItems.length - 1 && <Divider my={2} />}
          </React.Fragment>
        ))}
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
