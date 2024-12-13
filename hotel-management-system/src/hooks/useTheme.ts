import { useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from '../config/config';
import { ThemeContext } from '../context/ThemeContext';
import { logger } from '../utils/logger';

const THEME_STORAGE_KEY = '@theme_mode';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(async () => {
    try {
      const newTheme = {
        dark: !theme.dark,
        colors: theme.dark ? config.theme.colors : {
          primary: '#0A84FF',
          background: '#000000',
          card: '#1C1C1E',
          text: '#FFFFFF',
          border: '#38383A',
          notification: '#FF453A'
        }
      };

      setTheme(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
      logger.info('Tema alterado com sucesso', { newTheme });
    } catch (error) {
      logger.error('Erro ao alterar tema', { error });
    }
  }, [theme, setTheme]);

  const loadTheme = useCallback(async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setTheme(JSON.parse(savedTheme));
        logger.info('Tema carregado do storage');
      }
    } catch (error) {
      logger.error('Erro ao carregar tema', { error });
    }
  }, [setTheme]);

  return {
    theme,
    toggleTheme,
    loadTheme,
    isDark: theme.dark
  };
};
