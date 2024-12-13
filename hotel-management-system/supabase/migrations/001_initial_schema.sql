-- Criação da tabela de hóspedes
CREATE TABLE guests (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    document_type VARCHAR(20) NOT NULL,
    document_number VARCHAR(50) NOT NULL,
    address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de quartos
CREATE TABLE rooms (
    id BIGSERIAL PRIMARY KEY,
    number VARCHAR(10) UNIQUE NOT NULL,
    type VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    price_per_night DECIMAL(10,2) NOT NULL,
    capacity INTEGER NOT NULL,
    description TEXT,
    amenities JSONB,
    floor INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de reservas
CREATE TABLE reservations (
    id BIGSERIAL PRIMARY KEY,
    guest_id BIGINT REFERENCES guests(id),
    room_id BIGINT REFERENCES rooms(id),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    total_price DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_guests_email ON guests(email);
CREATE INDEX idx_guests_document ON guests(document_type, document_number);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_rooms_type ON rooms(type);
CREATE INDEX idx_reservations_dates ON reservations(check_in, check_out);
CREATE INDEX idx_reservations_status ON reservations(status);

-- Triggers para atualização automática do updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_guests_updated_at
    BEFORE UPDATE ON guests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at
    BEFORE UPDATE ON rooms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Função para verificar disponibilidade de quarto
CREATE OR REPLACE FUNCTION check_room_availability(
    room_id_param BIGINT,
    check_in_param DATE,
    check_out_param DATE
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM reservations
        WHERE room_id = room_id_param
        AND status NOT IN ('CANCELLED')
        AND (
            (check_in_param BETWEEN check_in AND check_out)
            OR (check_out_param BETWEEN check_in AND check_out)
            OR (check_in_param <= check_in AND check_out_param >= check_out)
        )
    );
END;
$$ LANGUAGE plpgsql;
