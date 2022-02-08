from flask import Flask, request
from flask_cors import CORS
from sentiment_analysis import SentimentAnalysis
from price_prediction import PricePrediction

app = Flask(__name__)
CORS(app)


@app.route("/sentiment", methods=["POST"])
def analyse_sentiment():
    crypto = request.json["crypto"]
    symbol = request.json["symbol"]
    result = SentimentAnalysis(crypto, symbol)
    return result


@app.route("/pricepredict", methods=["POST"])
def predict_price():
    uuid = request.json["uuid"]
    result = PricePrediction(uuid)
    return result


if __name__ == "__main__":
    app.run(debug=True)
