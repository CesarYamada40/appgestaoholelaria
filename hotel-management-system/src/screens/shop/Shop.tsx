import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { VStack, HStack, Text, Image, Box, Heading, Button, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const Shop = () => {
  const packages = [
    {
      id: 1,
      title: 'Pacote Romântico',
      description: 'Perfeito para casais, inclui jantar e spa',
      price: 899,
      image: 'https://via.placeholder.com/400x200',
      features: ['2 diárias', 'Jantar romântico', 'Massagem para casal'],
    },
    {
      id: 2,
      title: 'Pacote Família',
      description: 'Diversão garantida para toda família',
      price: 1299,
      image: 'https://via.placeholder.com/400x200',
      features: ['3 diárias', 'Café da manhã', 'Atividades infantis'],
    },
    {
      id: 3,
      title: 'Pacote Business',
      description: 'Ideal para viagens de negócios',
      price: 599,
      image: 'https://via.placeholder.com/400x200',
      features: ['1 diária', 'Sala de reunião', 'Transfer aeroporto'],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <VStack space={6} p={4}>
        <Heading size="xl" color="#DAA520">
          Pacotes Especiais
        </Heading>

        <Text fontSize="md" color="gray.600">
          Escolha o pacote ideal para sua estadia
        </Text>

        <VStack space={6}>
          {packages.map((pkg) => (
            <Pressable key={pkg.id}>
              <Box
                bg="white"
                rounded="xl"
                overflow="hidden"
                shadow={2}
              >
                <Image
                  source={{ uri: pkg.image }}
                  alt={pkg.title}
                  height={200}
                  width="100%"
                />
                
                <VStack p={4} space={3}>
                  <Heading size="md">{pkg.title}</Heading>
                  
                  <Text color="gray.500">
                    {pkg.description}
                  </Text>

                  <VStack space={2}>
                    {pkg.features.map((feature, index) => (
                      <HStack key={index} space={2} alignItems="center">
                        <Icon
                          as={Ionicons}
                          name="checkmark-circle"
                          size={5}
                          color="#DAA520"
                        />
                        <Text>{feature}</Text>
                      </HStack>
                    ))}
                  </VStack>

                  <HStack justifyContent="space-between" alignItems="center" mt={2}>
                    <Text fontSize="2xl" fontWeight="bold" color="#DAA520">
                      R$ {pkg.price}
                    </Text>
                    <Button
                      bg="#DAA520"
                      leftIcon={<Icon as={Ionicons} name="cart-outline" size={5} color="white" />}
                    >
                      Reservar
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
