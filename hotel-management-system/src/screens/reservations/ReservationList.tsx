import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useReservations } from '../../hooks/useApi';
import { ReservationCard } from '../../components/reservations/ReservationCard';
import { ReservationCardSkeleton } from '../../components/common/SkeletonLoading';
import { ErrorView } from '../../components/common/ErrorView';
import { SearchBar } from '../../components/common/SearchBar';
import { FilterModal } from '../../components/common/FilterModal';
import { logger } from '../../utils/logger';
import { Reservation, ReservationFilters } from '../../types/api';

export const ReservationList: React.FC = () => {
  const [filters, setFilters] = useState<ReservationFilters>({});
  const [refreshing, setRefreshing] = useState(false);
  const { data: reservations, loading, error, execute } = useReservations(filters);

  useEffect(() => {
    loadReservations();
  }, [filters]);

  const loadReservations = async () => {
    try {
      await execute();
    } catch (error) {
      logger.error('Erro ao carregar reservas', { error });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadReservations();
    setRefreshing(false);
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleFilter = (newFilters: ReservationFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (error) {
    return (
      <ErrorView
        message="Não foi possível carregar as reservas"
        onRetry={loadReservations}
      />
    );
  }

  const renderItem = ({ item }: { item: Reservation }) => (
    <ReservationCard reservation={item} />
  );

  const renderSkeleton = () => (
    <>
      <ReservationCardSkeleton />
      <ReservationCardSkeleton />
      <ReservationCardSkeleton />
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Buscar reservas..."
        onSearch={handleSearch}
      />
      
      <FilterModal
        filters={filters}
        onApplyFilters={handleFilter}
      />

      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={reservations}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          onEndReached={() => {
            // Implementar paginação se necessário
          }}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};
