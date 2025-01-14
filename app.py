from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Mock data storage
cells = {}

@app.route('/get_data', methods=['GET'])
def get_data():
    return jsonify(cells)

@app.route('/update_cell', methods=['POST'])
def update_cell():
    data = request.json
    row = data['row']
    col = data['col']
    value = data['value']
    cells[f"{row}-{col}"] = value
    return jsonify({'message': 'Cell updated'})

if __name__ == '__main__':
    app.run(debug=True)
