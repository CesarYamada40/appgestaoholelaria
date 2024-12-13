import { createClient } from '@supabase/supabase-js';
import { config } from '../src/config/config';

const supabase = createClient(config.supabase.url, config.supabase.token);

const rooms = [
  {
    number: '101',
    type: 'SINGLE',
    status: 'AVAILABLE',
    price_per_night: 100.00,
    capacity: 1,
    floor: 1,
    description: 'Quarto individual com vista para a cidade',
    amenities: ['TV', 'Wi-Fi', 'Ar condicionado', 'Frigobar']
  },
  {
    number: '102',
    type: 'DOUBLE',
    status: 'OCCUPIED',
    price_per_night: 150.00,
    capacity: 2,
    floor: 1,
    description: 'Quarto duplo com varanda',
    amenities: ['TV', 'Wi-Fi', 'Ar condicionado', 'Varanda', 'Frigobar']
  },
  {
    number: '201',
    type: 'SUITE',
    status: 'AVAILABLE',
    price_per_night: 300.00,
    capacity: 2,
    floor: 2,
    description: 'Suíte luxuosa com jacuzzi',
    amenities: ['TV', 'Wi-Fi', 'Ar condicionado', 'Jacuzzi', 'Minibar', 'Vista panorâmica']
  },
  {
    number: '202',
    type: 'FAMILY',
    status: 'MAINTENANCE',
    price_per_night: 250.00,
    capacity: 4,
    floor: 2,
    description: 'Quarto familiar com duas camas de casal',
    amenities: ['TV', 'Wi-Fi', 'Ar condicionado', 'Frigobar', 'Berço disponível']
  }
];

const guests = [
  {
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '11999999999',
    document_type: 'CPF',
    document_number: '12345678900',
    address: {
      street: 'Rua das Flores',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      zip_code: '01234-567',
      country: 'Brasil'
    }
  },
  {
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '11988888888',
    document_type: 'RG',
    document_number: '987654321',
    address: {
      street: 'Avenida Principal',
      number: '456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zip_code: '21234-567',
      country: 'Brasil'
    }
  }
];

const currentDate = new Date();
const tomorrow = new Date(currentDate);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(currentDate);
nextWeek.setDate(nextWeek.getDate() + 7);

const reservations = [
  {
    guest_id: 1, // Será preenchido após inserir os hóspedes
    room_id: 1,  // Será preenchido após inserir os quartos
    check_in: currentDate.toISOString(),
    check_out: tomorrow.toISOString(),
    status: 'CONFIRMED',
    total_price: 100.00,
    notes: 'Check-in realizado às 14h'
  },
  {
    guest_id: 2,
    room_id: 2,
    check_in: tomorrow.toISOString(),
    check_out: nextWeek.toISOString(),
    status: 'PENDING',
    total_price: 900.00,
    notes: 'Solicitou berço extra'
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Iniciando população do banco de dados...');

    // Inserir quartos
    console.log('🔄 Inserindo quartos...');
    const { data: insertedRooms, error: roomsError } = await supabase
      .from('rooms')
      .insert(rooms)
      .select();
    
    if (roomsError) throw roomsError;
    console.log('✅ Quartos inseridos:', insertedRooms);

    // Inserir hóspedes
    console.log('🔄 Inserindo hóspedes...');
    const { data: insertedGuests, error: guestsError } = await supabase
      .from('guests')
      .insert(guests)
      .select();
    
    if (guestsError) throw guestsError;
    console.log('✅ Hóspedes inseridos:', insertedGuests);

    // Atualizar IDs das reservas
    if (insertedRooms && insertedGuests) {
      reservations[0].room_id = insertedRooms[0].id;
      reservations[0].guest_id = insertedGuests[0].id;
      reservations[1].room_id = insertedRooms[1].id;
      reservations[1].guest_id = insertedGuests[1].id;
    }

    // Inserir reservas
    console.log('🔄 Inserindo reservas...');
    const { data: insertedReservations, error: reservationsError } = await supabase
      .from('reservations')
      .insert(reservations)
      .select();
    
    if (reservationsError) throw reservationsError;
    console.log('✅ Reservas inseridas:', insertedReservations);

    console.log('✅ Banco de dados populado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
  }
}

// Executar população do banco
seedDatabase();
