from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Agent 0 Backend Online"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    return jsonify({"reply": f"Echo: {data.get('message')}"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
