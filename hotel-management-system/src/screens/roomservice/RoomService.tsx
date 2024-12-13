import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { VStack, HStack, Text, Image, Box, Heading, Button, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const RoomService = () => {
  const [cart, setCart] = useState([]);

  const menuItems = [
    {
      category: 'Café da Manhã',
      items: [
        { id: 1, name: 'Café Continental', price: 45, image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Ovos Beneditinos', price: 38, image: 'https://via.placeholder.com/100' },
      ]
    },
    {
      category: 'Pratos Principais',
      items: [
        { id: 3, name: 'Salmão Grelhado', price: 89, image: 'https://via.placeholder.com/100' },
        { id: 4, name: 'Filé Mignon', price: 95, image: 'https://via.placeholder.com/100' },
      ]
    },
    {
      category: 'Sobremesas',
      items: [
        { id: 5, name: 'Cheesecake', price: 28, image: 'https://via.placeholder.com/100' },
        { id: 6, name: 'Petit Gateau', price: 32, image: 'https://via.placeholder.com/100' },
      ]
    },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <VStack space={6} p={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="lg">Room Service</Heading>
            <Button
              leftIcon={<Icon as={Ionicons} name="cart-outline" size={5} color="white" />}
              bg="#DAA520"
            >
              {cart.length}
            </Button>
          </HStack>

          {menuItems.map((category, index) => (
            <VStack key={index} space={4}>
              <Heading size="md">{category.category}</Heading>
              
              {category.items.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => addToCart(item)}
                >
                  <HStack
                    bg="white"
                    p={4}
                    rounded="lg"
                    space={4}
                    alignItems="center"
                  >
                    <Image
                      source={{ uri: item.image }}
                      alt={item.name}
                      size="sm"
                      rounded="md"
                    />
                    <VStack flex={1}>
                      <Text fontSize="md" fontWeight="bold">
                        {item.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        R$ {item.price.toFixed(2)}
                      </Text>
                    </VStack>
                    <Icon
                      as={Ionicons}
                      name="add-circle-outline"
                      size={6}
                      color="#DAA520"
                    />
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          ))}
        </VStack>
      </ScrollView>

      {cart.length > 0 && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="white"
          p={4}
          shadow={5}
        >
          <Button
            bg="#DAA520"
            size="lg"
          >
            Fazer Pedido ({cart.length} itens)
          </Button>
        </Box>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
