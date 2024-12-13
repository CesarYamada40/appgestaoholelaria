from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reservas.db'
db = SQLAlchemy(app)

class Reserva(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    data = db.Column(db.DateTime, nullable=False)
    pessoas = db.Column(db.Integer, nullable=False)
    observacoes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/reservas')
def lista_reservas():
    reservas = Reserva.query.order_by(Reserva.data.desc()).all()
    return render_template('reservas.html', reservas=reservas)

@app.route('/nova-reserva', methods=['GET', 'POST'])
def nova_reserva():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        telefone = request.form['telefone']
        data_str = request.form['data']
        pessoas = int(request.form['pessoas'])
        observacoes = request.form['observacoes']
        
        data = datetime.strptime(data_str, '%Y-%m-%dT%H:%M')
        
        nova_reserva = Reserva(
            nome=nome,
            email=email,
            telefone=telefone,
            data=data,
            pessoas=pessoas,
            observacoes=observacoes
        )
        
        db.session.add(nova_reserva)
        db.session.commit()
        
        flash('Reserva criada com sucesso!', 'success')
        return redirect(url_for('lista_reservas'))
    
    return render_template('nova_reserva.html')

@app.route('/editar-reserva/<int:id>', methods=['GET', 'POST'])
def editar_reserva(id):
    reserva = Reserva.query.get_or_404(id)
    
    if request.method == 'POST':
        reserva.nome = request.form['nome']
        reserva.email = request.form['email']
        reserva.telefone = request.form['telefone']
        reserva.data = datetime.strptime(request.form['data'], '%Y-%m-%dT%H:%M')
        reserva.pessoas = int(request.form['pessoas'])
        reserva.observacoes = request.form['observacoes']
        
        db.session.commit()
        flash('Reserva atualizada com sucesso!', 'success')
        return redirect(url_for('lista_reservas'))
    
    return render_template('editar_reserva.html', reserva=reserva)

@app.route('/deletar-reserva/<int:id>')
def deletar_reserva(id):
    reserva = Reserva.query.get_or_404(id)
    db.session.delete(reserva)
    db.session.commit()
    flash('Reserva deletada com sucesso!', 'success')
    return redirect(url_for('lista_reservas'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
