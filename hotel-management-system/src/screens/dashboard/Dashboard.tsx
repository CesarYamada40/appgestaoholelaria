import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Box, Text, VStack, HStack, Heading, Progress, useColorModeValue } from 'native-base';
import { useRooms } from '../../hooks/useApi';
import { Room } from '../../types/api';
import { logger } from '../../utils/logger';

interface DashboardStats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  maintenanceRooms: number;
  occupancyRate: number;
}

export const Dashboard: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    maintenanceRooms: 0,
    occupancyRate: 0,
  });

  const { data: rooms, loading, execute: loadRooms } = useRooms();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  useEffect(() => {
    calculateStats();
  }, [rooms]);

  const calculateStats = () => {
    if (!rooms) return;

    try {
      const occupied = rooms.filter(room => room.status === 'OCCUPIED').length;
      const available = rooms.filter(room => room.status === 'AVAILABLE').length;
      const maintenance = rooms.filter(room => room.status === 'MAINTENANCE').length;
      const total = rooms.length;

      setStats({
        totalRooms: total,
        occupiedRooms: occupied,
        availableRooms: available,
        maintenanceRooms: maintenance,
        occupancyRate: total > 0 ? (occupied / total) * 100 : 0,
      });

      logger.info('Estatísticas do dashboard atualizadas', { stats });
    } catch (error) {
      logger.error('Erro ao calcular estatísticas', { error });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadRooms();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
    <Box bg={bgColor} p={4} rounded="lg" shadow={2} width="48%">
      <VStack>
        <Text color="gray.500" fontSize="sm">{title}</Text>
        <Heading size="lg" color={color}>{value}</Heading>
      </VStack>
    </Box>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <VStack space={4} p={4}>
        <Box bg={bgColor} p={4} rounded="lg" shadow={2}>
          <Heading size="md" color={textColor} mb={4}>Taxa de Ocupação</Heading>
          <Progress value={stats.occupancyRate} colorScheme="blue" />
          <Text mt={2} color="gray.500">{stats.occupancyRate.toFixed(1)}%</Text>
        </Box>

        <HStack space={4} justifyContent="space-between">
          <StatCard
            title="Quartos Ocupados"
            value={stats.occupiedRooms}
            color="orange.500"
          />
          <StatCard
            title="Quartos Disponíveis"
            value={stats.availableRooms}
            color="green.500"
          />
        </HStack>

        <HStack space={4} justifyContent="space-between">
          <StatCard
            title="Em Manutenção"
            value={stats.maintenanceRooms}
            color="red.500"
          />
          <StatCard
            title="Total de Quartos"
            value={stats.totalRooms}
            color="blue.500"
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
};
