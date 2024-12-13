import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { VStack, HStack, Text, Icon, Box, Heading } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const mainButtons = [
    {
      title: 'Check-In',
      icon: 'log-in-outline',
      onPress: () => navigation.navigate('CheckIn'),
    },
    {
      title: 'Minhas\nReservas',
      icon: 'calendar-outline',
      onPress: () => navigation.navigate('Reservas'),
    },
    {
      title: 'Explorar',
      icon: 'compass-outline',
      onPress: () => navigation.navigate('Explorar'),
    },
    {
      title: 'Room\nService',
      icon: 'restaurant-outline',
      onPress: () => navigation.navigate('RoomService'),
    },
    {
      title: 'Comprar',
      icon: 'cart-outline',
      onPress: () => navigation.navigate('Comprar'),
    },
  ];

  return (
    <View style={styles.container}>
      <Box bg="#000" p={4} roundedBottom="3xl">
        <VStack space={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text color="white" fontSize="lg">Olá,</Text>
              <Heading color="#DAA520" size="xl">André Guimarães Lira</Heading>
            </VStack>
            <Text color="#DAA520" fontSize="md">213.234 pontos</Text>
          </HStack>
        </VStack>
      </Box>

      <VStack space={6} p={6} mt={4}>
        <HStack flexWrap="wrap" justifyContent="space-between">
          {mainButtons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={button.onPress}
            >
              <VStack alignItems="center" space={2}>
                <Box
                  bg="#DAA520"
                  p={3}
                  rounded="full"
                  shadow={3}
                >
                  <Icon
                    as={Ionicons}
                    name={button.icon}
                    size={7}
                    color="white"
                  />
                </Box>
                <Text
                  textAlign="center"
                  fontSize="sm"
                  fontWeight="medium"
                  numberOfLines={2}
                >
                  {button.title}
                </Text>
              </VStack>
            </TouchableOpacity>
          ))}
        </HStack>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  button: {
    width: '30%',
    marginBottom: 20,
    alignItems: 'center',
  },
});
