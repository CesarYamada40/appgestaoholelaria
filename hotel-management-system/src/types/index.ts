export interface Reservation {
  id?: number;
  guestName: string;
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
  createdAt?: string;
}

export interface Room {
  number: number;
  type: string;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'CLEANING';
  price: number;
}

export interface Guest {
  id?: number;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
}

export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export type LogLevel = 'ERROR' | 'WARN' | 'INFO';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  details?: any;
}
