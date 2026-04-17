from flask import Flask, request, send_from_directory
from flask_cors import cross_origin
import uuid

from models.api import convert_text_to_audio
from utils import save_audio

app = Flask(__name__)
cross_origin(app)

@app.route("/")
def hello():
    return "Hello, World! From Python Flask server."

@app.route("/text-to-audio", methods=["POST"])
@cross_origin()
def text_to_audio():
    text = request.json.get("text")

    file_id = uuid.uuid4()
    audio, sample_rate = convert_text_to_audio(text)

    save_audio(audio, sample_rate, file_id)

    return f"/audio/{file_id}.wav"

@app.route("/audio/<path:audio_file>")
def get_audio(audio_file):
    return send_from_directory("audio", audio_file)