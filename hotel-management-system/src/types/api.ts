export interface Reservation {
  id: number;
  guest_id: number;
  room_id: number;
  check_in: string;
  check_out: string;
  status: 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
  total_price: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  guest?: Guest;
  room?: Room;
}

export interface Room {
  id: number;
  number: string;
  type: 'SINGLE' | 'DOUBLE' | 'SUITE' | 'DELUXE';
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'CLEANING';
  price_per_night: number;
  capacity: number;
  description?: string;
  amenities?: string[];
  floor: number;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
  document_type: 'CPF' | 'RG' | 'PASSPORT';
  document_number: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  status: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  meta?: {
    total: number;
    page: number;
    per_page: number;
  };
}

export interface ReservationFilters {
  status?: Reservation['status'];
  startDate?: string;
  endDate?: string;
  guestId?: number;
  roomId?: number;
}

export interface RoomFilters {
  status?: Room['status'];
  type?: Room['type'];
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  floor?: number;
}

export interface GuestFilters {
  search?: string;
  documentType?: Guest['document_type'];
  documentNumber?: string;
  email?: string;
  phone?: string;
}
