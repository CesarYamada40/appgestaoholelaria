import React from 'react';
import { View, StyleSheet, Share } from 'react-native';
import { VStack, Text, Icon, Box, HStack, Pressable, Image } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

interface AccessCardProps {
  navigation: any;
  route: {
    params: {
      reservation: {
        guestName: string;
        location: string;
        checkIn: string;
        checkOut: string;
        reservationCode: string;
      }
    }
  }
}

export const AccessCard = ({ navigation, route }: AccessCardProps) => {
  const { reservation } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Reserva em ${reservation.location}\nCheck-in: ${reservation.checkIn}\nCheck-out: ${reservation.checkOut}\nCódigo: ${reservation.reservationCode}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <VStack space={4} flex={1} p={4}>
        <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center">
          CARTÕES DE ACESSO
        </Text>

        <Text fontSize="xl" color="white" textAlign="center" mt={2}>
          QR CODE FAST CHECK IN
        </Text>

        <Box bg="white" rounded="3xl" p={6} mt={4} shadow={5}>
          <VStack space={4}>
            <Text fontSize="xl" color="gray.700">
              {reservation.guestName}
            </Text>

            <Text fontSize="md" color="gray.600">
              {reservation.location}
            </Text>

            <HStack space={4}>
              <VStack flex={1}>
                <Text color="gray.500">Check In</Text>
                <Text color="gray.700">{reservation.checkIn}</Text>
              </VStack>

              <VStack flex={1}>
                <Text color="gray.500">Check Out</Text>
                <Text color="gray.700">{reservation.checkOut}</Text>
              </VStack>
            </HStack>

            <Box alignItems="center" py={4}>
              <QRCode
                value={reservation.reservationCode}
                size={200}
                backgroundColor="white"
              />
            </Box>

            <HStack justifyContent="space-between" alignItems="center">
              <Pressable onPress={handleShare}>
                <Icon as={Ionicons} name="share-social-outline" size={6} color="gray.400" />
              </Pressable>
              <Image
                source={require('../../assets/images/logo.png')}
                alt="Logo"
                size="sm"
                resizeMode="contain"
              />
            </HStack>
          </VStack>
        </Box>
      </VStack>

      <View style={styles.bottomNav}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <VStack alignItems="center">
            <Icon as={Ionicons} name="home-outline" size={6} color="white" />
            <Text color="white" fontSize="xs">Home</Text>
          </VStack>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Reservar')}>
          <VStack alignItems="center">
            <Icon as={Ionicons} name="calendar-outline" size={6} color="white" />
            <Text color="white" fontSize="xs">Reservar</Text>
          </VStack>
        </Pressable>

        <Pressable onPress={() => {}}>
          <VStack alignItems="center">
            <Icon as={Ionicons} name="card-outline" size={6} color="white" />
            <Text color="white" fontSize="xs">Cartões</Text>
          </VStack>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Conta')}>
          <VStack alignItems="center">
            <Icon as={Ionicons} name="person-outline" size={6} color="white" />
            <Text color="white" fontSize="xs">Conta</Text>
          </VStack>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Menu')}>
          <VStack alignItems="center">
            <Icon as={Ionicons} name="menu-outline" size={6} color="white" />
            <Text color="white" fontSize="xs">Menu</Text>
          </VStack>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
});
