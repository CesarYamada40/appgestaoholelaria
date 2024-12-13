import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, Input, Button, Text, Icon, HStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

export const CheckIn = () => {
  const [reservationCode, setReservationCode] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const handleCheckIn = () => {
    setShowQRCode(true);
  };

  return (
    <View style={styles.container}>
      <VStack space={6} p={6} alignItems="center">
        <Icon
          as={Ionicons}
          name="log-in-outline"
          size={12}
          color="#DAA520"
        />
        
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Faça seu Check-in
        </Text>

        {!showQRCode ? (
          <VStack space={4} w="100%">
            <Input
              placeholder="Código da Reserva"
              value={reservationCode}
              onChangeText={setReservationCode}
              size="lg"
            />

            <Button
              bg="#DAA520"
              onPress={handleCheckIn}
              size="lg"
            >
              Gerar QR Code
            </Button>
          </VStack>
        ) : (
          <VStack space={4} alignItems="center">
            <QRCode
              value={reservationCode}
              size={200}
            />
            <Text fontSize="md" textAlign="center" color="gray.500">
              Apresente este QR Code na recepção
            </Text>
          </VStack>
        )}
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
