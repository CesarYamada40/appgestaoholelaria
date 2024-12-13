import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, VStack, Button, useColorModeValue } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const PaymentList = ({ navigation }) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <View style={styles.container}>
      <VStack space={4} p={4}>
        <Button
          leftIcon={<Ionicons name="add-circle-outline" size={20} color="white" />}
          onPress={() => navigation.navigate('AddCard')}
          bg="#DAA520"
        >
          Adicionar Novo Cartão
        </Button>
        
        <Text fontSize="md" color="gray.500" textAlign="center">
          Você ainda não possui cartões cadastrados
        </Text>
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
