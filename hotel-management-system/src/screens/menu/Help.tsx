import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, HStack, Text, Pressable, Icon, Accordion } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export const Help = () => {
  const faqItems = [
    {
      title: 'Como fazer uma reserva?',
      content: 'Para fazer uma reserva, acesse a aba "Reservar" no menu inferior e siga as instruções na tela.',
    },
    {
      title: 'Como adicionar um cartão?',
      content: 'Vá até a aba "Cartões" e clique em "Adicionar Novo Cartão". Preencha os dados solicitados.',
    },
    {
      title: 'Como fazer check-in?',
      content: 'O check-in pode ser feito através do app na sua data de chegada, ou diretamente na recepção do hotel.',
    },
    {
      title: 'Como solicitar room service?',
      content: 'Acesse o menu e selecione a opção "Room Service". Escolha os itens desejados e faça seu pedido.',
    },
  ];

  const supportItems = [
    {
      title: 'Chat Online',
      icon: 'chatbubble-outline',
      onPress: () => {},
    },
    {
      title: 'E-mail',
      icon: 'mail-outline',
      onPress: () => {},
    },
    {
      title: 'Telefone',
      icon: 'call-outline',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <VStack space={6} p={4}>
        <VStack>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Perguntas Frequentes
          </Text>
          <Accordion>
            {faqItems.map((item, index) => (
              <Accordion.Item key={index}>
                <Accordion.Summary>
                  <Text fontSize="md">{item.title}</Text>
                </Accordion.Summary>
                <Accordion.Details>
                  <Text fontSize="sm" color="gray.600">
                    {item.content}
                  </Text>
                </Accordion.Details>
              </Accordion.Item>
            ))}
          </Accordion>
        </VStack>

        <VStack>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Fale Conosco
          </Text>
          {supportItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={item.onPress}
              bg="white"
              p={4}
              rounded="lg"
              shadow={1}
              mb={2}
            >
              <HStack space={3} alignItems="center">
                <Icon
                  as={Ionicons}
                  name={item.icon}
                  size={6}
                  color="#DAA520"
                />
                <Text fontSize="md">{item.title}</Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
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
