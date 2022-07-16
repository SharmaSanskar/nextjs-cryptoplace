# CryptoPlace

### _Next.js_ web application providing latest crypto information and crypto news. Also includes machine learning models with a _Flask_ and _Redis_ backend for sentiment analysis and price prediction.

### Docker Images
[Client Docker Image](https://hub.docker.com/r/sharmasanskar/cryptoplace_client) || [Server Docker Image](https://hub.docker.com/r/sharmasanskar/cryptoplace_server)

### MODULE 1: Homepage
Gets crypto information from __Coinranking API__ and news information from __Bing News API__. Styled using __Tailwind CSS__.   

![Homepage](https://user-images.githubusercontent.com/66771507/164887645-1e9574a2-b282-4ac8-88fc-3b60ddede66b.png)

### MODULE 2: Cryptocurrencies Page
Lists top 50 cryptocurrencies. Can also search for a particular cryptocurrency.   

![Cryptocurrencies Page](https://user-images.githubusercontent.com/66771507/164887665-beb7f4dd-056b-4e53-8da1-0132929ee84a.png)

### MODULE 3: News page
Displays latest crypto related news. Can filter news topic according to various tags.    

![News page](https://user-images.githubusercontent.com/66771507/164887781-1a4d5a44-dae2-4ac6-8f63-a83f9f98294e.png)

### MODULE 4: Crypto details with price chart
complete information about particular cryptocurrency. Also includes interactive price chart made using __react-chartjs-2__.    

![Crypto details](https://user-images.githubusercontent.com/66771507/164887686-b0d8f2bf-a177-4a50-ad6f-d5a979e05e54.png)
![Price chart](https://user-images.githubusercontent.com/66771507/164887689-6226baa3-7f4e-4d51-ba4a-445c51a92f34.png)

### MODULE 5: Login and Registration
User authentication for machine learning modules and watchlist module using __Firebase Auth__.    

![Login](https://user-images.githubusercontent.com/66771507/164887691-f81846cd-3413-4ebd-b8dd-6de5f3ccb1ba.png)
![Register](https://user-images.githubusercontent.com/66771507/164887694-f3463ba1-455a-422b-94b8-39808d41d311.png)

### MODULE 6: Watchlist
User can add cryptocurrencies to watchlist. Data is stored using __Redis__.    

![Watchlist](https://user-images.githubusercontent.com/66771507/164887779-31876d0b-43d1-4561-996d-6e2f4798e894.png)

### MODULE 7: Machine learning modules
Includes two ML modules. 
1) Sentiment analysis of 50 recent tweets for a particular cryptocurrency provided by __Twitter API__. 
2) Price prediction for the next 15 days of a particular cryptocurrency using __NeuralProphet__ model.    

![ML modules](https://user-images.githubusercontent.com/66771507/164887701-f10e3836-02c7-493d-909e-5512d67a8930.png)
![ML modules](https://user-images.githubusercontent.com/66771507/164887705-ecbc7941-3562-4b49-99c4-5b88f688fdb8.png)

