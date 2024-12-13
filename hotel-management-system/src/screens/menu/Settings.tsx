import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, HStack, Text, Switch, Pressable, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsItems = [
    {
      title: 'Notificações',
      icon: 'notifications-outline',
      value: notifications,
      onToggle: () => setNotifications(!notifications),
    },
    {
      title: 'Modo Escuro',
      icon: 'moon-outline',
      value: darkMode,
      onToggle: () => setDarkMode(!darkMode),
    },
  ];

  return (
    <View style={styles.container}>
      <VStack space={2} p={4}>
        {settingsItems.map((item, index) => (
          <Pressable
            key={index}
            bg="white"
            p={4}
            rounded="lg"
            shadow={1}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <HStack space={3} alignItems="center">
                <Icon
                  as={Ionicons}
                  name={item.icon}
                  size={6}
                  color="#DAA520"
                />
                <Text fontSize="md">{item.title}</Text>
              </HStack>
              <Switch
                isChecked={item.value}
                onToggle={item.onToggle}
                colorScheme="amber"
              />
            </HStack>
          </Pressable>
        ))}

        <Text fontSize="sm" color="gray.500" mt={4} px={2}>
          Versão do App: 1.0.0
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
