import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: any;
  functionName?: string;
  fileName?: string;
}

class Logger {
  private static instance: Logger;
  private readonly LOG_KEY = '@hotel_app_logs';
  private readonly MAX_LOGS = 1000;
  private readonly LOG_RETENTION_DAYS = 7;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private async saveLog(entry: LogEntry): Promise<void> {
    try {
      // Salvar no AsyncStorage
      const existingLogs = await this.getLogs();
      const updatedLogs = [entry, ...existingLogs].slice(0, this.MAX_LOGS);
      await AsyncStorage.setItem(this.LOG_KEY, JSON.stringify(updatedLogs));

      // Salvar em arquivo se disponível
      if (FileSystem.documentDirectory) {
        const logFile = `${FileSystem.documentDirectory}logs/${entry.timestamp.split('T')[0]}.log`;
        const logContent = `${JSON.stringify(entry)}\n`;
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}logs/`, { intermediates: true });
        await FileSystem.writeAsStringAsync(logFile, logContent, { append: true });
      }

      // Em desenvolvimento, também mostra no console
      if (__DEV__) {
        console.log(`[${entry.level}] ${entry.message}`, entry.details || '');
      }
    } catch (error) {
      console.error('Erro ao salvar log:', error);
    }
  }

  async getLogs(): Promise<LogEntry[]> {
    try {
      const logs = await AsyncStorage.getItem(this.LOG_KEY);
      return logs ? JSON.parse(logs) : [];
    } catch {
      return [];
    }
  }

  async clearOldLogs(): Promise<void> {
    try {
      const logs = await this.getLogs();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.LOG_RETENTION_DAYS);

      const filteredLogs = logs.filter((log) => {
        const logDate = new Date(log.timestamp);
        return logDate > cutoffDate;
      });

      await AsyncStorage.setItem(this.LOG_KEY, JSON.stringify(filteredLogs));

      // Limpar arquivos antigos
      if (FileSystem.documentDirectory) {
        const logsDir = `${FileSystem.documentDirectory}logs/`;
        const files = await FileSystem.readDirectoryAsync(logsDir);
        for (const file of files) {
          const fileDate = new Date(file.split('.')[0]);
          if (fileDate < cutoffDate) {
            await FileSystem.deleteAsync(`${logsDir}${file}`);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao limpar logs antigos:', error);
    }
  }

  error(message: string, details?: any, functionName?: string, fileName?: string): void {
    this.log('ERROR', message, details, functionName, fileName);
  }

  warn(message: string, details?: any, functionName?: string, fileName?: string): void {
    this.log('WARN', message, details, functionName, fileName);
  }

  info(message: string, details?: any, functionName?: string, fileName?: string): void {
    this.log('INFO', message, details, functionName, fileName);
  }

  debug(message: string, details?: any, functionName?: string, fileName?: string): void {
    if (__DEV__) {
      this.log('DEBUG', message, details, functionName, fileName);
    }
  }

  private log(level: LogLevel, message: string, details?: any, functionName?: string, fileName?: string): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
      functionName,
      fileName
    };
    this.saveLog(entry);
  }
}

export const logger = Logger.getInstance();

// Decorator para logging de funções
export function LogFunction(level: LogLevel = 'DEBUG') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const fileName = target.constructor.name;
      const functionName = propertyKey;

      try {
        logger.info(`Iniciando ${functionName}`, { args }, functionName, fileName);
        const result = await originalMethod.apply(this, args);
        logger.info(`${functionName} completado com sucesso`, { result }, functionName, fileName);
        return result;
      } catch (error) {
        logger.error(
          `Erro em ${functionName}`,
          { error, args },
          functionName,
          fileName
        );
        throw error;
      }
    };

    return descriptor;
  };
}
