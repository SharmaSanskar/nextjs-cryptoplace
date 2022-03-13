import requests
import pandas as pd

# from prophet import Prophet
from neuralprophet import NeuralProphet

import os
from dotenv import load_dotenv

load_dotenv()

headers = {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": os.getenv("RAPIDAPI_KEY"),
}


def get_prices(uuid):
    url = f"https://coinranking1.p.rapidapi.com/coin/{uuid}/history"
    # Get prices of past 3 months
    querystring = {"timePeriod": "3m"}

    res = requests.request("GET", url, headers=headers, params=querystring)
    data = res.json()["data"]
    df = pd.DataFrame(data["history"])
    df["ds"] = pd.to_datetime(df["timestamp"], unit="s").dt.date
    df["y"] = pd.to_numeric(df["price"])
    df.drop(["price", "timestamp"], axis=1, inplace=True)
    # For neural prophet
    df = df.groupby(["ds"], as_index=False).mean()
    return df


# For prophet
# def PricePrediction(uuid):
#     price_df = get_prices(uuid)
#     m = Prophet(daily_seasonality=True)
#     m.fit(price_df)
#     future = m.make_future_dataframe(periods=15, include_history=False)
#     forecast = m.predict(future)
#     price_list = forecast["yhat"].to_list()
#     date_list = forecast["ds"].to_list()
#     return {"prices": price_list, "dates": date_list}

# For neural prophet
def PricePrediction(uuid):
    price_df = get_prices(uuid)
    m = NeuralProphet()
    metrics = m.fit(price_df)
    future = m.make_future_dataframe(df=price_df, periods=15)
    forecast = m.predict(df=future)
    price_list = forecast["yhat1"].to_list()
    date_list = forecast["ds"].to_list()
    return {"prices": price_list, "dates": date_list}

