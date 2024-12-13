import { logger, LogFunction } from '../utils/logger';
import db from '../config/database';
import { Reservation } from '../types';

export class ReservationService {
  @LogFunction('INFO')
  async createReservation(reservation: Reservation): Promise<number> {
    try {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO reservations (guest_name, room_number, check_in, check_out, status)
             VALUES (?, ?, ?, ?, ?)`,
            [
              reservation.guestName,
              reservation.roomNumber,
              reservation.checkIn,
              reservation.checkOut,
              reservation.status
            ],
            (_, { insertId }) => {
              logger.info('Reserva criada com sucesso', { reservationId: insertId });
              resolve(insertId);
            },
            (_, error) => {
              logger.error('Erro ao criar reserva', { error, reservation });
              reject(error);
              return false;
            }
          );
        });
      });
    } catch (error) {
      logger.error('Erro não tratado ao criar reserva', { error, reservation });
      throw error;
    }
  }

  @LogFunction('INFO')
  async getReservation(id: number): Promise<Reservation | null> {
    try {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM reservations WHERE id = ?',
            [id],
            (_, { rows }) => {
              const reservation = rows.item(0);
              logger.info('Reserva recuperada', { reservationId: id, reservation });
              resolve(reservation || null);
            },
            (_, error) => {
              logger.error('Erro ao buscar reserva', { error, reservationId: id });
              reject(error);
              return false;
            }
          );
        });
      });
    } catch (error) {
      logger.error('Erro não tratado ao buscar reserva', { error, reservationId: id });
      throw error;
    }
  }
}
