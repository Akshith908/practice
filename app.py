from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2
import os

app = Flask(__name__)
CORS(app)

load_dotenv()
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

# Create DB connection
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)

@app.route("/api/buses", methods=["GET"])
def get_buses():
    cur = conn.cursor()
    cur.execute("SELECT id, name, stop, eta, seats, lat, lng FROM buses")
    rows = cur.fetchall()
    cur.close()

    buses = [
        {
            "id": row[0],
            "name": row[1],
            "stop": row[2],
            "eta": row[3],
            "seats": row[4],
            "lat": float(row[5]),
            "lng": float(row[6]),
        }
        for row in rows
    ]
    return jsonify(buses)

@app.route("/api/bus/<int:bus_id>", methods=["GET"])
def get_bus(bus_id):
    cur = conn.cursor()
    cur.execute("SELECT id, name, stop, eta, seats, lat, lng FROM buses WHERE id = %s", (bus_id,))
    row = cur.fetchone()
    cur.close()

    if not row:
        return jsonify({"error": "Bus not found"}), 404

    bus = {
        "id": row[0],
        "name": row[1],
        "stop": row[2],
        "eta": row[3],
        "seats": row[4],
        "lat": float(row[5]),
        "lng": float(row[6]),
    }
    return jsonify(bus)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
