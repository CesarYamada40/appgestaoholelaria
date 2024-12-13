import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { logger } from '../utils/logger';
import { ApiError, ApiResponse } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiResponse<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options = { loadingInitial: false }
): UseApiResponse<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: options.loadingInitial,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        logger.info(`Iniciando chamada à API: ${apiFunction.name}`, { args });

        const result = await apiFunction(...args);

        setState(prev => ({ ...prev, data: result, loading: false }));
        logger.info(`Chamada à API concluída: ${apiFunction.name}`, { result });
      } catch (error: any) {
        const apiError: ApiError = {
          code: error.code || 'UNKNOWN_ERROR',
          message: error.message || 'Um erro inesperado ocorreu',
          details: error.details,
          status: error.status || 500,
        };

        setState(prev => ({ ...prev, error: apiError, loading: false }));
        logger.error(`Erro na chamada à API: ${apiFunction.name}`, { error: apiError, args });
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hooks específicos para cada entidade
export function useReservations(filters?: any) {
  return useApi(() => api.getReservations(filters));
}

export function useCreateReservation() {
  return useApi(api.createReservation);
}

export function useRooms(filters?: any) {
  return useApi(() => api.getRooms(filters));
}

export function useCreateGuest() {
  return useApi(api.createGuest);
}

export function useSearchGuests() {
  return useApi(api.searchGuests);
}
