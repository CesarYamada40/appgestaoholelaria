# Hotel Management System Lite

Sistema simplificado de gerenciamento hoteleiro desenvolvido com React Native + Expo.

## Requisitos

- Node.js 14+
- Expo CLI
- Supabase Account

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/CesarYamada40/appgestaoholelaria.git
cd hotel-management-system
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo .env com suas configurações

4. Inicialize o banco de dados Supabase:
- Execute o script `supabase/migrations/001_initial_schema.sql`
- Execute o script `supabase/seed.sql` para dados de exemplo

5. Inicie o projeto:
```bash
npm start
```

## Estrutura do Projeto

```
hotel-management-system/
├── src/
│   ├── api/              # Serviços e integrações
│   ├── components/       # Componentes reutilizáveis
│   ├── screens/         # Telas da aplicação
│   ├── navigation/      # Configuração de rotas
│   ├── context/         # Contextos React
│   ├── hooks/           # Hooks personalizados
│   ├── utils/           # Utilitários
│   ├── config/          # Configurações
│   └── types/           # Definições de tipos
├── supabase/
│   ├── migrations/      # Scripts SQL de migração
│   └── seed.sql         # Dados iniciais
└── docs/                # Documentação
```

## Funcionalidades

- Gestão de Reservas
- Gestão de Quartos
- Gestão de Hóspedes
- Dashboard com métricas
- Modo offline
- Sincronização automática
- Temas claro/escuro

## Scripts Disponíveis

- `npm start`: Inicia o projeto
- `npm test`: Executa testes
- `npm run lint`: Verifica código
- `npm run format`: Formata código

## Contribuição

1. Crie uma branch: `git checkout -b feature/nome-feature`
2. Commit suas mudanças: `git commit -m 'feat: Adiciona nova feature'`
3. Push para a branch: `git push origin feature/nome-feature`
4. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
