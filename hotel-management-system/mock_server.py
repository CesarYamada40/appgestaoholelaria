from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# Dados mockados
mock_reservations = []
mock_rooms = [
    {"id": 1, "number": "101", "type": "Standard", "price": 200},
    {"id": 2, "number": "102", "type": "Luxo", "price": 350},
    {"id": 3, "number": "103", "type": "Suite", "price": 500}
]

@app.route('/api/v1/rooms', methods=['GET'])
def get_rooms():
    return jsonify(mock_rooms)

@app.route('/api/v1/reservations', methods=['GET'])
def get_reservations():
    return jsonify(mock_reservations)

@app.route('/api/v1/reservations', methods=['POST'])
def create_reservation():
    data = request.json
    reservation = {
        "id": len(mock_reservations) + 1,
        "room_id": data.get('room_id'),
        "check_in": data.get('check_in'),
        "check_out": data.get('check_out'),
        "guests": data.get('guests'),
        "created_at": datetime.datetime.now().isoformat()
    }
    mock_reservations.append(reservation)
    return jsonify(reservation), 201

@app.route('/api/v1/qrcode/<reservation_id>', methods=['GET'])
def get_qrcode(reservation_id):
    return jsonify({
        "qr_code": f"RESERVATION-{reservation_id}-{datetime.datetime.now().strftime('%Y%m%d')}"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
