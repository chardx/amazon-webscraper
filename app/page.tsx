import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <DocumentMagnifyingGlassIcon className="h-64 w-64 text-indigo-600/20" />

      <h1 className="text-3xl text-center mt-2 text-black font-bold mb-5">
        Welcome to the Amazon Web Scraper
      </h1>
      <h2 className="text-lg italic text-center text-black/50">
        Introducing the Amazon Product Scraper - a powerful web scraping tool
        that provides you with essential product information such as name,
        price, and image URL.
      </h2>
      <h3 className="text-lg text-center italic text-black/50">
        https://portfolio-2-0-chardx.vercel.app/
      </h3>
    </div>
  );
};

export default HomePage;
