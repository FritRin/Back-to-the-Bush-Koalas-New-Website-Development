import WishlistCard from "./WishlistCard";
//images
import CodoClippers from "../assets/whishlist/codos-clippers.jpg"
import InstTrolleyRail from "../assets/whishlist/inst-trolley-rail.jpg"
import MayoTableThree from "../assets/whishlist/mayo-table-three-leg.jpg"
import PlatformWeighScale from "../assets/whishlist/Platform-weigh-scale.jpg"
import QualityCanineSpey from "../assets/whishlist/quality-canine-spey-kit.jpg"
import SurgicalStool from "../assets/whishlist/surgical-stool-round-seat-with-wheels.jpg"
import WeichAllynFibre from "../assets/whishlist/welch-allyn-fibre-optic.jpg"
import WeichAllynOperating from "../assets/whishlist/welch-allyn-operating-diagnostic-set.jpg"
import TemperatureCompensated from "../assets/whishlist/temperature-compensated-urine.png"

const wishlistItems = [
  {
    id: 1,
    title: "",
    description: "",
    targetPrice: 764.00,
    image: CodoClippers,
  },
  {
    id: 2,
    title: "",
    description: "",
    targetPrice: 667.00,
    image: InstTrolleyRail,
  },
  {
    id: 3,
    title: "",
    description: "",
    targetPrice: 292.00,
    image: MayoTableThree,
  },
  {
    id: 4,
    title: "",
    description: "",
    targetPrice: 950.00,
    image: PlatformWeighScale,
  },
  {
    id: 5,
    title: "",
    description: "",
    targetPrice: 1282.00,
    image: QualityCanineSpey,
  },
  {
    id: 6,
    title: "",
    description: "",
    targetPrice: 70.00,
    image: SurgicalStool,
  },
  {
    id: 7,
    title: "",
    description: "",
    targetPrice: 2591.00,
    image: WeichAllynFibre,
  },
  {
    id: 8,
    title: "",
    description: "",
    targetPrice: 156.00,
    image: WeichAllynOperating,
  },
  {
    id: 8,
    title: "Temperature Compensated Urine S.G.",
    description: "",
    targetPrice: 156.00,
    image: TemperatureCompensated,
  },
];

const WishlistGrid = ({ onAddToCart }) => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {wishlistItems.map((item) => (
          <WishlistCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default WishlistGrid;