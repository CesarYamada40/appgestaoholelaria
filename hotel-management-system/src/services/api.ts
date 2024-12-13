import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger';
import { config } from '../config/config';

const supabaseUrl = 'https://bvbhjkmkgbhqqkwsjshv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Ymhqa21rZ2JocXFrd3Nqc2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMTc2MTksImV4cCI6MjA0OTY5MzYxOX0.mscGheHEh79jdjE8vPxxnXwDfy7EhCGSkAhkcTXWYjM';

export const supabase = createClient(supabaseUrl, supabaseKey);

class ApiService {
  private static instance: ApiService;
  private retryCount: number = 0;
  private readonly MAX_RETRIES = config.api.retryAttempts;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Métodos para Reservas
  async createReservation(data: any) {
    try {
      logger.info('Criando nova reserva', { data });
      const { data: reservation, error } = await supabase
        .from('reservations')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      logger.info('Reserva criada com sucesso', { reservation });
      return reservation;
    } catch (error) {
      logger.error('Erro ao criar reserva', { error, data });
      throw error;
    }
  }

  async getReservations(filters?: any) {
    try {
      logger.info('Buscando reservas', { filters });
      let query = supabase.from('reservations').select('*, guests(*), rooms(*)');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.startDate && filters?.endDate) {
        query = query
          .gte('check_in', filters.startDate)
          .lte('check_out', filters.endDate);
      }

      const { data, error } = await query;

      if (error) throw error;
      logger.info('Reservas recuperadas com sucesso', { count: data?.length });
      return data;
    } catch (error) {
      logger.error('Erro ao buscar reservas', { error, filters });
      throw error;
    }
  }

  // Métodos para Quartos
  async getRooms(filters?: any) {
    try {
      logger.info('Buscando quartos', { filters });
      let query = supabase.from('rooms').select('*');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }

      const { data, error } = await query;

      if (error) throw error;
      logger.info('Quartos recuperados com sucesso', { count: data?.length });
      return data;
    } catch (error) {
      logger.error('Erro ao buscar quartos', { error, filters });
      throw error;
    }
  }

  // Métodos para Hóspedes
  async createGuest(data: any) {
    try {
      logger.info('Criando novo hóspede', { data });
      const { data: guest, error } = await supabase
        .from('guests')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      logger.info('Hóspede criado com sucesso', { guest });
      return guest;
    } catch (error) {
      logger.error('Erro ao criar hóspede', { error, data });
      throw error;
    }
  }

  async searchGuests(query: string) {
    try {
      logger.info('Pesquisando hóspedes', { query });
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
        .limit(10);

      if (error) throw error;
      logger.info('Pesquisa de hóspedes concluída', { count: data?.length });
      return data;
    } catch (error) {
      logger.error('Erro ao pesquisar hóspedes', { error, query });
      throw error;
    }
  }

  // Método genérico para realizar chamadas à API com retry
  private async makeRequest<T>(
    requestFn: () => Promise<{ data: T | null; error: any }>
  ): Promise<T> {
    try {
      const { data, error } = await requestFn();
      
      if (error) {
        if (this.retryCount < this.MAX_RETRIES) {
          this.retryCount++;
          logger.warn(`Tentativa ${this.retryCount} de ${this.MAX_RETRIES}`);
          return this.makeRequest(requestFn);
        }
        throw error;
      }

      this.retryCount = 0;
      return data as T;
    } catch (error) {
      this.retryCount = 0;
      throw error;
    }
  }

  // Método para verificar status da API
  async checkApiStatus(): Promise<boolean> {
    try {
      const { data, error } = await supabase.from('health_check').select('*');
      return !error && !!data;
    } catch {
      return false;
    }
  }
}

export const api = ApiService.getInstance();
