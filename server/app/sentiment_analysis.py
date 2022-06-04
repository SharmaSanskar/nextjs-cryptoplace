import re
import tweepy as tw
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from stop_words import stop_words_list

import os
from dotenv import load_dotenv

load_dotenv()


# Twitter keys
consumer_key = os.getenv("TWITTTER_CONSUMER_KEY")
consumer_secret = os.getenv("TWITTTER_CONSUMER_SECRET")
access_token = os.getenv("TWITTTER_ACCESS_TOKEN")
access_token_secret = os.getenv("TWITTTER_ACCESS_TOKEN_SECRET")


def get_tweets(crypto, symbol):
    auth = tw.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tw.API(auth, wait_on_rate_limit=True)
    search = f"{crypto} OR {symbol} -filter:retweets"
    tweet_cursor = tw.Cursor(
        api.search_tweets,
        q=search,
        lang="en",
        tweet_mode="extended",
        result_type="mixed",
    ).items(50)
    tweets = [
        {"Tweets": tweet.full_text, "Timestamp": tweet.created_at}
        for tweet in tweet_cursor
    ]
    df = pd.DataFrame.from_dict(tweets)
    df["Timestamp"] = df["Timestamp"].dt.date
    print("Number of tweet fetched:", df.shape[0])
    return df


def clean_tweet(tweet):
    twt = tweet
    twt = re.sub("(#|RT)", "", twt)
    twt = re.sub("@\S+", "", twt)
    twt = re.sub("\\n", "", twt)
    twt = re.sub("https?:\/\/\S+", "", twt)
    twt = " ".join(word for word in twt.split() if word.lower() not in stop_words_list)
    return twt


def find_sentiment(sentiment_list):
    pos = neg = neu = 0
    for sentiment in sentiment_list:
        if sentiment > 0:
            pos += 1
        elif sentiment < 0:
            neg += 1
        else:
            neu += 1
    return (pos, neg, neu)


def calculate_pct_change(df):
    newSentiment = df.groupby("Timestamp")["sentiment"].mean()[-1]
    oldSentiment = df.groupby("Timestamp")["sentiment"].mean()[-2]
    change = (newSentiment) - (oldSentiment)
    pctChange = (change / oldSentiment) * 100
    if pctChange < 0:
        return "negative"
    elif pctChange > 0:
        return "positive"
    else:
        return "no"


def SentimentAnalysis(crypto, symbol):
    tweets_df = get_tweets(crypto, symbol)
    tweets_df["Tweets"] = tweets_df["Tweets"].apply(clean_tweet)
    sia = SentimentIntensityAnalyzer()
    tweets_df["sentiment"] = tweets_df["Tweets"].apply(
        lambda twt: sia.polarity_scores(twt)["compound"]
    )
    pos, neg, neu = find_sentiment(tweets_df["sentiment"])
    pctChange = calculate_pct_change(tweets_df)
    return {
        "positive": pos,
        "negative": neg,
        "neutral": neu,
        "change": pctChange,
    }
