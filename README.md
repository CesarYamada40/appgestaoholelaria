# Sistema de Gerenciamento de Hotel

Sistema completo para gerenciamento de reservas de hotel, desenvolvido com Python, React Native e Supabase.

## 🚀 Funcionalidades

- Gerenciamento de reservas
- Geração de QR Code para check-in
- Interface web e mobile
- Sistema de autenticação
- Sincronização em tempo real

## 💻 Tecnologias

- Backend:
  - Python
  - Flask
  - SQLite
- Frontend Mobile:
  - React Native
  - Expo
  - TypeScript
- Banco de Dados:
  - Supabase

## 📋 Pré-requisitos

- Python 3.8+
- Node.js 14+
- Expo CLI
- Conta no Supabase

## 🔧 Instalação

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITORIO]
```

2. Instale as dependências do Python
```bash
pip install -r requirements.txt
```

3. Configure as variáveis de ambiente
```bash
cp hotel-management-system/.env.example hotel-management-system/.env
```

4. Instale as dependências do React Native
```bash
cd hotel-management-system
npm install
```

## 🏃‍♂️ Executando o projeto

### Backend
```bash
python app.py
```

### App Mobile
```bash
cd hotel-management-system
expo start
```

## 📱 Estrutura do Projeto

- `/app.py` - Servidor Flask principal
- `/gerar_qrcode.py` - Geração de QR Code
- `/templates` - Templates HTML do sistema web
- `/hotel-management-system` - Aplicativo mobile React Native
  - `/src` - Código fonte do app
    - `/components` - Componentes React
    - `/screens` - Telas do aplicativo
    - `/services` - Serviços e APIs
    - `/context` - Contextos React
    - `/hooks` - Hooks personalizados

## 📄 Licença

Este projeto está sob a licença MIT.

## ✨ Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push da Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
