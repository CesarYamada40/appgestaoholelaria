import { supabase } from '../config/supabase';
import { logger } from '../utils/logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export class SyncService {
  private static instance: SyncService;
  private readonly LAST_SYNC_KEY = '@last_sync_time';
  private readonly SYNC_QUEUE_KEY = '@sync_queue';
  private isSyncing = false;

  private constructor() {}

  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService();
    }
    return SyncService.instance;
  }

  async syncData(): Promise<void> {
    if (this.isSyncing) {
      logger.warn('Sincronização já em andamento');
      return;
    }

    try {
      this.isSyncing = true;
      const netInfo = await NetInfo.fetch();

      if (!netInfo.isConnected) {
        logger.warn('Sem conexão com a internet');
        return;
      }

      // Processar fila de sincronização
      const queue = await this.getSyncQueue();
      for (const item of queue) {
        await this.processSyncItem(item);
      }

      // Sincronizar dados do Supabase para local
      await this.pullDataFromSupabase();

      // Atualizar timestamp da última sincronização
      await AsyncStorage.setItem(this.LAST_SYNC_KEY, new Date().toISOString());
      
      logger.info('Sincronização concluída com sucesso');
    } catch (error) {
      logger.error('Erro durante sincronização', { error });
    } finally {
      this.isSyncing = false;
    }
  }

  private async processSyncItem(item: any): Promise<void> {
    try {
      const { table, action, data } = item;
      
      switch (action) {
        case 'INSERT':
          await supabase.from(table).insert(data);
          break;
        case 'UPDATE':
          await supabase.from(table).update(data).match({ id: data.id });
          break;
        case 'DELETE':
          await supabase.from(table).delete().match({ id: data.id });
          break;
      }

      // Remover item da fila após processamento
      await this.removeFromSyncQueue(item);
      
      logger.info('Item sincronizado com sucesso', { item });
    } catch (error) {
      logger.error('Erro ao processar item de sincronização', { error, item });
      throw error;
    }
  }

  private async pullDataFromSupabase(): Promise<void> {
    const lastSync = await AsyncStorage.getItem(this.LAST_SYNC_KEY);
    const tables = ['reservations', 'rooms', 'guests'];

    for (const table of tables) {
      try {
        let query = supabase.from(table).select('*');
        
        if (lastSync) {
          query = query.gt('updated_at', lastSync);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Atualizar dados locais
          await this.updateLocalData(table, data);
          logger.info(`Dados da tabela ${table} atualizados`, { count: data.length });
        }
      } catch (error) {
        logger.error(`Erro ao sincronizar tabela ${table}`, { error });
      }
    }
  }

  private async updateLocalData(table: string, data: any[]): Promise<void> {
    // Implementar atualização no SQLite local
    // TODO: Implementar lógica específica para cada tabela
  }

  async addToSyncQueue(item: any): Promise<void> {
    try {
      const queue = await this.getSyncQueue();
      queue.push({
        ...item,
        timestamp: new Date().toISOString()
      });
      await AsyncStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
      logger.info('Item adicionado à fila de sincronização', { item });
    } catch (error) {
      logger.error('Erro ao adicionar item à fila de sincronização', { error, item });
    }
  }

  private async removeFromSyncQueue(item: any): Promise<void> {
    try {
      const queue = await this.getSyncQueue();
      const updatedQueue = queue.filter(i => i.timestamp !== item.timestamp);
      await AsyncStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(updatedQueue));
    } catch (error) {
      logger.error('Erro ao remover item da fila de sincronização', { error, item });
    }
  }

  private async getSyncQueue(): Promise<any[]> {
    try {
      const queue = await AsyncStorage.getItem(this.SYNC_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch {
      return [];
    }
  }
}
