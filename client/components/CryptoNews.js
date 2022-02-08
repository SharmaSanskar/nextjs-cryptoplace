import Image from "next/image";
import moment from "moment";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const myLoader = ({ src, width, quality }) => {
  return src;
};

export default function CryptoNews({ newsData }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {newsData.map((news, i) => (
        <a key={i} href={news.url} target="_blank" rel="noreferrer">
          <div className="bg-secondary rounded-md px-4 py-6 hover:shadow-lg flex flex-col justify-between h-full">
            <div className="flex">
              <Image
                loader={myLoader}
                src={news.image?.thumbnail?.contentUrl || demoImage}
                width={200}
                height={200}
                objectFit="cover"
              />
              <p className="ml-3 font-bold">{news.name}</p>
            </div>
            <p className="text-indigo-50/70 text-sm mt-2">
              {news.description.length > 100
                ? `${news.description.substring(0, 100)}...`
                : news.description}
            </p>

            <p className="text-indigo-50/70 text-xs mt-2">
              By {news.provider[0]?.name},{" "}
              {moment(news.datePublished).startOf("ss").fromNow()}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
