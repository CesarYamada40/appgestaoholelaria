import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { VStack, HStack, Text, Box, Button, Icon, Divider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const ReservationConfirmation = ({ route, navigation }) => {
  const { formData } = route.params;

  const calculateTotal = () => {
    // Implementar cálculo do valor total baseado no tipo de reserva e período
    return 1000;
  };

  return (
    <ScrollView style={styles.container}>
      <VStack space={6} p={4}>
        <Box bg="white" p={4} rounded="lg" shadow={2}>
          <VStack space={4}>
            <Text fontSize="xl" fontWeight="bold">
              Confirmar Reserva
            </Text>

            <Divider />

            <VStack space={3}>
              <HStack justifyContent="space-between">
                <Text color="gray.500">Tipo de Reserva</Text>
                <Text fontWeight="bold">
                  {formData.locationType === 'room' ? 'Quarto' :
                   formData.locationType === 'auditorium' ? 'Auditório' : 'GoWork'}
                </Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text color="gray.500">Data de Entrada</Text>
                <Text fontWeight="bold">{formData.checkIn.toLocaleDateString()}</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text color="gray.500">Data de Saída</Text>
                <Text fontWeight="bold">{formData.checkOut.toLocaleDateString()}</Text>
              </HStack>

              {formData.locationType === 'room' && (
                <HStack justifyContent="space-between">
                  <Text color="gray.500">Número de Hóspedes</Text>
                  <Text fontWeight="bold">{formData.guests}</Text>
                </HStack>
              )}
            </VStack>

            <Divider />

            <HStack justifyContent="space-between">
              <Text fontSize="lg" fontWeight="bold">Valor Total</Text>
              <Text fontSize="lg" fontWeight="bold" color="#DAA520">
                R$ {calculateTotal().toFixed(2)}
              </Text>
            </HStack>
          </VStack>
        </Box>

        <Box bg="white" p={4} rounded="lg" shadow={2}>
          <VStack space={4}>
            <Text fontSize="lg" fontWeight="bold">Formas de Pagamento</Text>
            
            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="card-outline" size={6} color="#DAA520" />
              <Text flex={1}>Cartão de Crédito</Text>
              <Icon as={Ionicons} name="chevron-forward" size={6} color="gray.400" />
            </HStack>

            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="barcode-outline" size={6} color="#DAA520" />
              <Text flex={1}>Boleto Bancário</Text>
              <Icon as={Ionicons} name="chevron-forward" size={6} color="gray.400" />
            </HStack>

            <HStack space={3} alignItems="center">
              <Icon as={Ionicons} name="cash-outline" size={6} color="#DAA520" />
              <Text flex={1}>PIX</Text>
              <Icon as={Ionicons} name="chevron-forward" size={6} color="gray.400" />
            </HStack>
          </VStack>
        </Box>

        <Button
          bg="#DAA520"
          size="lg"
          leftIcon={<Icon as={Ionicons} name="checkmark-circle" size={5} color="white" />}
          onPress={() => {
            navigation.navigate('ReservationSuccess');
          }}
        >
          Confirmar e Pagar
        </Button>
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
