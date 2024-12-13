import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

// Telas
import { ReservationList } from '../screens/reservations/ReservationList';
import { ReservationCreate } from '../screens/reservations/ReservationCreate';
import { ReservationDetails } from '../screens/reservations/ReservationDetails';
import { RoomList } from '../screens/rooms/RoomList';
import { RoomDetails } from '../screens/rooms/RoomDetails';
import { GuestList } from '../screens/guests/GuestList';
import { GuestCreate } from '../screens/guests/GuestCreate';
import { GuestDetails } from '../screens/guests/GuestDetails';
import { Dashboard } from '../screens/dashboard/Dashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ReservationStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ReservationList" component={ReservationList} options={{ title: 'Reservas' }} />
    <Stack.Screen name="ReservationCreate" component={ReservationCreate} options={{ title: 'Nova Reserva' }} />
    <Stack.Screen name="ReservationDetails" component={ReservationDetails} options={{ title: 'Detalhes da Reserva' }} />
  </Stack.Navigator>
);

const RoomStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="RoomList" component={RoomList} options={{ title: 'Quartos' }} />
    <Stack.Screen name="RoomDetails" component={RoomDetails} options={{ title: 'Detalhes do Quarto' }} />
  </Stack.Navigator>
);

const GuestStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="GuestList" component={GuestList} options={{ title: 'Hóspedes' }} />
    <Stack.Screen name="GuestCreate" component={GuestCreate} options={{ title: 'Novo Hóspede' }} />
    <Stack.Screen name="GuestDetails" component={GuestDetails} options={{ title: 'Detalhes do Hóspede' }} />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Dashboard':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Reservas':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'Quartos':
                iconName = focused ? 'bed' : 'bed-outline';
                break;
              case 'Hóspedes':
                iconName = focused ? 'people' : 'people-outline';
                break;
              default:
                iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Reservas" component={ReservationStack} />
        <Tab.Screen name="Quartos" component={RoomStack} />
        <Tab.Screen name="Hóspedes" component={GuestStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
