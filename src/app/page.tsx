import Banner from "./components/Banner";
import Marquee from "./components/Marquee";
import ProductPage from "./components/Products/page";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Marquee/>
      <Banner/>
      <ProductPage/>
    </div>
  );
}
