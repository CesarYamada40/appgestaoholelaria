import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { AppProvider } from './src/context/AppContext';
import { initDatabase } from './src/config/database';
import { initSupabase } from './src/config/supabase';
import { logger } from './src/utils/logger';

export default function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Inicializa o banco de dados local
        await initDatabase();
        logger.info('Banco de dados local inicializado');

        // Inicializa conexão com Supabase
        const supabaseConnected = await initSupabase();
        if (supabaseConnected) {
          logger.info('Conexão com Supabase estabelecida');
        } else {
          logger.warn('Não foi possível conectar ao Supabase');
        }
      } catch (error) {
        logger.error('Erro ao inicializar aplicativo', { error });
      }
    };

    initializeApp();
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <ThemeProvider>
          <AppProvider>
            <AppNavigator />
          </AppProvider>
        </ThemeProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
