import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, Text, Button, Icon, Box } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export const ReservationSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <VStack space={6} alignItems="center" p={4}>
        <Box w="200" h="200">
          <LottieView
            source={require('../../assets/animations/success.json')}
            autoPlay
            loop={false}
          />
        </Box>

        <VStack space={2} alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Reserva Confirmada!
          </Text>
          <Text fontSize="md" color="gray.500" textAlign="center">
            Sua reserva foi realizada com sucesso.
            Você receberá um e-mail com todos os detalhes.
          </Text>
        </VStack>

        <Button
          w="full"
          bg="#DAA520"
          size="lg"
          leftIcon={<Icon as={Ionicons} name="home" size={5} color="white" />}
          onPress={() => navigation.navigate('AccessCard', {
              reservation: {
                guestName: 'André Guimarães Lira',
                location: 'Essence Business & Living\nRondonópolis',
                checkIn: '24/04/2026',
                checkOut: '27/04/26',
                reservationCode: `STAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
              }
            })}
        >
          Voltar para o Início
        </Button>

        <Button
          w="full"
          variant="outline"
          size="lg"
          leftIcon={<Icon as={Ionicons} name="list" size={5} color="#DAA520" />}
          onPress={() => navigation.navigate('MyReservations')}
        >
          Ver Minhas Reservas
        </Button>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
