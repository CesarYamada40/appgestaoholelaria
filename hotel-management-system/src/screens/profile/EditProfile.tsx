import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, FormControl, Input, Button, Avatar, IconButton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const EditProfile = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: 'André Guimarães Lira',
    email: 'andre@email.com',
    phone: '(11) 99999-9999',
  });

  const handleSubmit = () => {
    // Implementar lógica de atualização do perfil
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <VStack space={4} p={4} alignItems="center">
        <Avatar
          size="2xl"
          source={{ uri: 'https://via.placeholder.com/150' }}
        >
          <Avatar.Badge
            bg="gray.100"
            alignItems="center"
            justifyContent="center"
            borderWidth={0}
          >
            <IconButton
              icon={<Ionicons name="camera" size={20} color="#DAA520" />}
              onPress={() => {}}
            />
          </Avatar.Badge>
        </Avatar>

        <FormControl>
          <FormControl.Label>Nome Completo</FormControl.Label>
          <Input
            value={formData.name}
            onChangeText={value => setFormData({ ...formData, name: value })}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>E-mail</FormControl.Label>
          <Input
            value={formData.email}
            onChangeText={value => setFormData({ ...formData, email: value })}
            keyboardType="email-address"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Telefone</FormControl.Label>
          <Input
            value={formData.phone}
            onChangeText={value => setFormData({ ...formData, phone: value })}
            keyboardType="phone-pad"
          />
        </FormControl>

        <Button onPress={handleSubmit} bg="#DAA520" w="full" mt={4}>
          Salvar Alterações
        </Button>
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
