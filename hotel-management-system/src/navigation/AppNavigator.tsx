import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

// Telas
import { Dashboard } from '../screens/dashboard/Dashboard';
import { ReservationForm } from '../screens/reservations/ReservationForm';
import { ReservationConfirmation } from '../screens/reservations/ReservationConfirmation';
import { ReservationSuccess } from '../screens/reservations/ReservationSuccess';
import { AccessCard } from '../screens/access/AccessCard';
import { Profile } from '../screens/profile/Profile';
import { CheckIn } from '../screens/checkin/CheckIn';
import { ReservationList } from '../screens/reservations/ReservationList';
import { Explore } from '../screens/explore/Explore';
import { RoomService } from '../screens/roomservice/RoomService';
import { Shop } from '../screens/shop/Shop';
import { PaymentList } from '../screens/payments/PaymentList';
import { AddCard } from '../screens/payments/AddCard';
import { EditProfile } from '../screens/profile/EditProfile';
import { Menu } from '../screens/menu/Menu';
import { Settings } from '../screens/menu/Settings';
import { Help } from '../screens/menu/Help';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Reservar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Cartões') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Conta') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#DAA520',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
        },
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Reservar" component={ReservationForm} />
      <Tab.Screen name="Cartões" component={AccessCard} />
      <Tab.Screen name="Conta" component={Profile} />
      <Tab.Screen name="Menu" component={Dashboard} />
    </Tab.Navigator>
  );
}

const PaymentStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="PaymentList" component={PaymentList} options={{ title: 'Cartões' }} />
    <Stack.Screen name="AddCard" component={AddCard} options={{ title: 'Adicionar Cartão' }} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileMain" component={Profile} options={{ title: 'Minha Conta' }} />
    <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Editar Perfil' }} />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MenuMain" component={Menu} options={{ title: 'Menu' }} />
    <Stack.Screen name="Settings" component={Settings} options={{ title: 'Configurações' }} />
    <Stack.Screen name="Help" component={Help} options={{ title: 'Ajuda' }} />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="MainTab" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ReservationForm" 
          component={ReservationForm}
          options={{ title: 'Fazer Reserva' }}
        />
        <Stack.Screen 
          name="ReservationConfirmation" 
          component={ReservationConfirmation}
          options={{ title: 'Confirmar Reserva' }}
        />
        <Stack.Screen 
          name="ReservationSuccess" 
          component={ReservationSuccess}
          options={{ title: 'Reserva Confirmada' }}
        />
        <Stack.Screen 
          name="AccessCard" 
          component={AccessCard}
          options={{ title: 'Cartão de Acesso' }}
        />
        <Stack.Screen name="CheckIn" component={CheckIn} options={{ title: 'Check-In' }} />
        <Stack.Screen name="Reservas" component={ReservationList} options={{ title: 'Minhas Reservas' }} />
        <Stack.Screen name="Explorar" component={Explore} options={{ title: 'Explorar' }} />
        <Stack.Screen name="RoomService" component={RoomService} options={{ title: 'Room Service' }} />
        <Stack.Screen name="Comprar" component={Shop} options={{ title: 'Pacotes Especiais' }} />
        <Stack.Screen 
          name="PaymentStack" 
          component={PaymentStack}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="ProfileStack" 
          component={ProfileStack}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="MenuStack" 
          component={MenuStack}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
