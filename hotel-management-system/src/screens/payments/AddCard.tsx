import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, FormControl, Input, Button } from 'native-base';

export const AddCard = ({ navigation }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = () => {
    // Implementar lógica de adicionar cartão
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <VStack space={4} p={4}>
        <FormControl>
          <FormControl.Label>Número do Cartão</FormControl.Label>
          <Input
            value={formData.cardNumber}
            onChangeText={value => setFormData({ ...formData, cardNumber: value })}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Nome no Cartão</FormControl.Label>
          <Input
            value={formData.cardHolder}
            onChangeText={value => setFormData({ ...formData, cardHolder: value })}
            placeholder="NOME COMO ESTÁ NO CARTÃO"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Data de Validade</FormControl.Label>
          <Input
            value={formData.expiryDate}
            onChangeText={value => setFormData({ ...formData, expiryDate: value })}
            placeholder="MM/AA"
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>CVV</FormControl.Label>
          <Input
            value={formData.cvv}
            onChangeText={value => setFormData({ ...formData, cvv: value })}
            placeholder="123"
            keyboardType="numeric"
            maxLength={3}
          />
        </FormControl>

        <Button onPress={handleSubmit} bg="#DAA520" mt={4}>
          Adicionar Cartão
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
