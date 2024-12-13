-- Inserir quartos de exemplo
INSERT INTO rooms (number, type, status, price_per_night, capacity, description, amenities, floor) VALUES
('101', 'SINGLE', 'AVAILABLE', 100.00, 1, 'Quarto individual com vista para a cidade', '["TV", "Wi-Fi", "Ar condicionado"]', 1),
('102', 'DOUBLE', 'AVAILABLE', 150.00, 2, 'Quarto duplo com varanda', '["TV", "Wi-Fi", "Ar condicionado", "Varanda"]', 1),
('201', 'SUITE', 'AVAILABLE', 300.00, 2, 'Suíte luxuosa com jacuzzi', '["TV", "Wi-Fi", "Ar condicionado", "Jacuzzi", "Minibar"]', 2),
('202', 'DELUXE', 'AVAILABLE', 400.00, 3, 'Suíte deluxe com sala de estar', '["TV", "Wi-Fi", "Ar condicionado", "Sala de estar", "Minibar"]', 2);

-- Inserir hóspedes de exemplo
INSERT INTO guests (name, email, phone, document_type, document_number, address) VALUES
('João Silva', 'joao@email.com', '11999999999', 'CPF', '12345678900', 
  '{"street": "Rua A", "number": "123", "city": "São Paulo", "state": "SP", "zip_code": "01234-567", "country": "Brasil"}'
),
('Maria Santos', 'maria@email.com', '11988888888', 'RG', '987654321', 
  '{"street": "Rua B", "number": "456", "city": "Rio de Janeiro", "state": "RJ", "zip_code": "21234-567", "country": "Brasil"}'
);

-- Inserir reservas de exemplo
INSERT INTO reservations (guest_id, room_id, check_in, check_out, status, total_price, notes) VALUES
(1, 1, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', 'CONFIRMED', 300.00, 'Check-in previsto para 14h'),
(2, 2, CURRENT_DATE + INTERVAL '5 days', CURRENT_DATE + INTERVAL '7 days', 'PENDING', 300.00, 'Solicitou berço extra');
