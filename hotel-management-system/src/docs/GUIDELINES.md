# Hotel Management System Lite - Diretrizes de Desenvolvimento

## 1. Visão Geral
sempre se reportar em portugues a qualquer resposta ou pergunta
Sistema simplificado de gerenciamento hoteleiro focado em performance e baixo consumo de recursos.

## 2. Stack Tecnológico
### Core
- Frontend: React Native + Expo
- Banco de Dados: SQLite (via expo-sqlite)
- Gerenciamento de Estado: Context API
- UI Framework: Native Base
- Navegação: React Navigation

### Dependências Principais
```bash
@react-navigation/native
@react-navigation/stack
native-base
expo-sqlite
@react-native-async-storage/async-storage
```

## 3. Estrutura do Projeto
```
hotel-management-lite/
├── src/
│   ├── api/              # Serviços e integrações
│   ├── components/       # Componentes reutilizáveis
│   │   ├── common/      # Componentes gerais
│   │   └── forms/       # Componentes de formulário
│   ├── screens/         # Telas da aplicação
│   │   ├── reservations/
│   │   ├── rooms/
│   │   └── guests/
│   ├── utils/           # Utilitários e helpers
│   └── config/          # Configurações e constantes
```

## 4. Operações CRUD
### 4.1 Reservas
- Create: Nova reserva com dados do hóspede e quarto
- Read: Listagem e detalhes de reservas
- Update: Modificação de datas e status
- Delete: Cancelamento de reservas

### 4.2 Quartos
- Create: Cadastro de novos quartos
- Read: Lista de quartos e status
- Update: Atualização de status e informações
- Delete: Remoção do cadastro

### 4.3 Hóspedes
- Create: Cadastro de hóspedes
- Read: Consulta de dados
- Update: Atualização de informações
- Delete: Remoção do cadastro

## 5. Padrões de Performance
### 5.1 Metas de Performance
- Tamanho do App: < 20MB
- Tempo de Inicialização: < 2s
- Uso de Memória: < 100MB
- Tempo de Resposta: < 100ms

### 5.2 Otimizações
- Lazy Loading para telas secundárias
- Paginação em listas (20 itens por página)
- Compressão de imagens
- Cache local com limpeza automática
- Minimal dependencies approach

## 6. Padrões de Código
### 6.1 Nomenclatura
- Componentes: PascalCase (ex: ReservationCard)
- Funções: camelCase (ex: createReservation)
- Variáveis: camelCase (ex: userStatus)
- Constantes: UPPER_SNAKE_CASE (ex: MAX_ITEMS)
- Arquivos: PascalCase para componentes, camelCase para utils

### 6.2 Estrutura de Componentes
```typescript
import React from 'react';
import { View } from 'react-native';

interface ComponentProps {
  // props definition
}

export const Component: React.FC<ComponentProps> = ({ prop }) => {
  // component logic
  return (
    <View>
      {/* component content */}
    </View>
  );
};
```

## 7. Banco de Dados
### 7.1 Estrutura das Tabelas
```sql
-- Reservas
CREATE TABLE reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_name TEXT,
  room_number INTEGER,
  check_in TEXT,
  check_out TEXT,
  status TEXT
);

-- Quartos
CREATE TABLE rooms (
  number INTEGER PRIMARY KEY,
  type TEXT,
  status TEXT,
  price REAL
);

-- Hóspedes
CREATE TABLE guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  phone TEXT
);
```

### 7.2 Índices
- rooms(number)
- reservations(check_in, check_out)
- guests(email)

## 8. Logging e Monitoramento
### 8.1 Níveis de Log
- ERROR: Erros críticos que impedem funcionamento
- WARN: Alertas importantes não críticos
- INFO: Informações gerais de operação

### 8.2 Retenção
- Logs mantidos por 7 dias
- Máximo de 100 entradas
- Limpeza automática de logs antigos

## 9. Segurança
### 9.1 Dados Sensíveis
- Não armazenar senhas em texto puro
- Sanitizar inputs
- Validar dados antes de persistir
- Limpar cache ao logout

### 9.2 Validações
- Verificar disponibilidade antes de reservas
- Validar formato de emails
- Verificar datas válidas
- Prevenir duplicação de reservas

## 10. Práticas de Desenvolvimento
### 10.1 Git
- Commits semânticos
- Feature branches
- Pull requests para main
- Code review obrigatório

### 10.2 Testing
- Testes unitários para utils
- Testes de componentes
- Testes de integração para CRUD
- Coverage mínimo: 70%

### 10.3 Build e Deploy
```bash
# Desenvolvimento
expo start

# Build Android
eas build --platform android --profile preview

# Build iOS
eas build --platform ios --profile preview
```

## 11. Status e Estados
### 11.1 Reservas
- CONFIRMED
- PENDING
- CANCELLED
- COMPLETED

### 11.2 Quartos
- AVAILABLE
- OCCUPIED
- MAINTENANCE
- CLEANING

## 12. Manutenção
### 12.1 Cache
- Limpar cache automaticamente após 7 dias
- Remover dados não utilizados
- Manter apenas dados essenciais

### 12.2 Updates
- Verificar updates ao iniciar
- Auto update em background
- Notificar usuário sobre novidades

## 13. Contatos e Suporte
- Documentação: /docs
- Issues: GitHub Issues
