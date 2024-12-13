import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { VStack, Text, Button, Input, Icon, Select, Box } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export const ReservationForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guests: '1',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateType, setDateType] = useState<'checkIn' | 'checkOut'>('checkIn');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        [dateType]: selectedDate
      }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <VStack space={4} p={4}>
        <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center">
          PÁGINA DE RESERVAS
        </Text>

        <Box bg="rgba(255, 255, 255, 0.1)" p={4} rounded="lg">
          <VStack space={4}>
            <Button
              variant="outline"
              borderColor="white"
              _text={{ color: "white" }}
              leftIcon={<Icon as={Ionicons} name="location-outline" color="white" />}
              onPress={() => {}}
            >
              Onde ?
            </Button>

            <Button
              variant="outline"
              borderColor="white"
              _text={{ color: "white" }}
              leftIcon={<Icon as={Ionicons} name="calendar-outline" color="white" />}
              onPress={() => {
                setDateType('checkIn');
                setShowDatePicker(true);
              }}
            >
              Data Check-In
            </Button>

            <Button
              variant="outline"
              borderColor="white"
              _text={{ color: "white" }}
              leftIcon={<Icon as={Ionicons} name="calendar-outline" color="white" />}
              onPress={() => {
                setDateType('checkOut');
                setShowDatePicker(true);
              }}
            >
              Data Check-Out
            </Button>

            <Button
              variant="outline"
              borderColor="white"
              _text={{ color: "white" }}
              leftIcon={<Icon as={Ionicons} name="people-outline" color="white" />}
              onPress={() => {}}
            >
              Hóspedes e Quartos
            </Button>

            <Button
              variant="outline"
              borderColor="white"
              _text={{ color: "white" }}
              leftIcon={<Icon as={Ionicons} name="options-outline" color="white" />}
              onPress={() => {}}
            >
              Personalização
            </Button>
          </VStack>
        </Box>

        {showDatePicker && (
          <DateTimePicker
            value={formData[dateType]}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}
      </VStack>

      <View style={styles.bottomNav}>
        <Button
          variant="ghost"
          _text={{ color: "white" }}
          leftIcon={<Icon as={Ionicons} name="home-outline" color="white" size="sm" />}
          onPress={() => navigation.navigate('Home')}
        >
          Home
        </Button>
        <Button
          variant="ghost"
          _text={{ color: "white" }}
          leftIcon={<Icon as={Ionicons} name="calendar-outline" color="white" size="sm" />}
          onPress={() => {}}
        >
          Reservar
        </Button>
        <Button
          variant="ghost"
          _text={{ color: "white" }}
          leftIcon={<Icon as={Ionicons} name="card-outline" color="white" size="sm" />}
          onPress={() => {}}
        >
          Cartões
        </Button>
        <Button
          variant="ghost"
          _text={{ color: "white" }}
          leftIcon={<Icon as={Ionicons} name="person-outline" color="white" size="sm" />}
          onPress={() => {}}
        >
          Conta
        </Button>
        <Button
          variant="ghost"
          _text={{ color: "white" }}
          leftIcon={<Icon as={Ionicons} name="menu-outline" color="white" size="sm" />}
          onPress={() => {}}
        >
          Menu
        </Button>
      </View>
    </ScrollView>
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
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
