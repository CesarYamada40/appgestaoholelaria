import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { VStack, HStack, Text, Image, Box, Heading, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const Explore = () => {
  const features = [
    {
      title: 'Piscina',
      icon: 'water-outline',
      description: 'Piscina aquecida com vista panorâmica',
    },
    {
      title: 'Academia',
      icon: 'fitness-outline',
      description: 'Academia completa 24 horas',
    },
    {
      title: 'Restaurante',
      icon: 'restaurant-outline',
      description: 'Gastronomia internacional',
    },
    {
      title: 'Spa',
      icon: 'leaf-outline',
      description: 'Spa com tratamentos exclusivos',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <VStack space={6}>
        <Image
          source={{ uri: 'https://via.placeholder.com/400x200' }}
          alt="Hotel"
          height={200}
          width="100%"
        />

        <VStack space={4} p={4}>
          <Heading size="xl" color="#DAA520">
            Essence Hotel
          </Heading>
          
          <Text fontSize="md" color="gray.600">
            Descubra o luxo e conforto em cada detalhe do nosso hotel.
            Uma experiência única em hospitalidade.
          </Text>

          <Heading size="md" mt={4}>
            Nossas Comodidades
          </Heading>

          <VStack space={4}>
            {features.map((feature, index) => (
              <Pressable key={index}>
                <HStack
                  bg="white"
                  p={4}
                  rounded="lg"
                  space={4}
                  alignItems="center"
                >
                  <Box
                    bg="#DAA520"
                    p={2}
                    rounded="lg"
                  >
                    <Icon
                      as={Ionicons}
                      name={feature.icon}
                      size={6}
                      color="white"
                    />
                  </Box>
                  <VStack>
                    <Text fontSize="lg" fontWeight="bold">
                      {feature.title}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {feature.description}
                    </Text>
                  </VStack>
                </HStack>
              </Pressable>
            ))}
          </VStack>
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
