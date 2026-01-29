from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Libera o acesso para o React

# Banco de dados fake (em memória)
banco_dados = [
    {"id": 1, "nome": "Tarefa Inicial", "status": "Pendente"}
]

@app.route('/api/tarefas', methods=['GET'])
def listar():
    return jsonify(banco_dados), 200

@app.route('/api/tarefas', methods=['POST'])
def criar():
    nova_tarefa = request.json
    banco_dados.append(nova_tarefa)
    return jsonify(nova_tarefa), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)