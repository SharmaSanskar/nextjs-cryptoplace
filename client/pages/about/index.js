import Head from "next/head";
import Image from "next/image";

export default function Cryptos() {
  return (
    <>
      <Head>
        <title>CryptoPlace - About</title>
      </Head>
      <section className="py-8 px-10">
        <h1 className="text-2xl font-bold uppercase">
          <span className="border-b-4 border-indigo-400">About</span>{" "}
          CryptoPlace
        </h1>
        <div className="my-8 text-indigo-50/70">
          <p>
            Cryptocurrency has gained a lot of traction in recent times.
            CryptoPlace enables its user to explore the crypto market by
            providing them comprehensive information about all the top
            cryptocurrencies as well as the latest crypto news. Registered
            members can also utilize Machine Learning to gain more insights into
            their favourite cryptocurrency.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-indigo-50 font-bold my-4 uppercase">
            What is Cryptocurrency?
          </h2>
          <div className="lg:flex gap-8 text-indigo-50/70">
            <div className="mb-6 lg:mb-0">
              <p>
                A cryptocurrency, crypto-currency, or crypto is a digital
                currency designed to work as a medium of exchange through a
                computer network that is not reliant on any central authority,
                such as a government or bank, to uphold or maintain it. Bitcoin,
                which launched in 2008, was the first cryptocurrency, and it
                remains by far the biggest, most influential, and best-known. In
                the decade since, Bitcoin and other cryptocurrencies like
                Ethereum have grown as digital alternatives to money issued by
                governments.
              </p>
              <p>
                Cryptocurrencies can be mined or purchased from cryptocurrency
                exchanges. Not all ecommerce sites allow purchases using
                cryptocurrencies. In fact, cryptocurrencies, even popular ones
                like Bitcoin, are hardly used for retail transactions. However,
                the skyrocketing value of cryptocurrencies has made them popular
                as trading instruments.
              </p>
            </div>
            <div>
              <Image src="/about-crypto.png" width={2000} height={1400} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
