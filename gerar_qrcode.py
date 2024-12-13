import qrcode
import socket

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

ip = get_ip()
url = f"http://{ip}:5000"
print(f"\nSeu sistema está disponível em: {url}")
print("Gerando QR Code...")

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

image = qr.make_image(fill_color="black", back_color="white")
image.save("qrcode.png")

print("\nQR Code gerado com sucesso!")
print("Abra o arquivo 'qrcode.png' para ver o QR Code")
print("Aponte a câmera do seu celular para o QR Code para acessar o sistema\n")
