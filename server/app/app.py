from flask import Flask, request
from flask_cors import CORS
from sentiment_analysis import SentimentAnalysis
from price_prediction import PricePrediction
import os

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "Hello CryptoPlace!"


@app.route("/api/sentiment", methods=["POST"])
def analyse_sentiment():
    crypto = request.json["crypto"]
    symbol = request.json["symbol"]
    result = SentimentAnalysis(crypto, symbol)
    return result


@app.route("/api/pricepredict", methods=["POST"])
def predict_price():
    uuid = request.json["uuid"]
    result = PricePrediction(uuid)
    return result


port = int(os.environ.get("PORT", 33507))
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=port)
