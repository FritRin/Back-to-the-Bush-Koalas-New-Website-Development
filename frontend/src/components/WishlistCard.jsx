import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const WishlistCard = ({ item, onAddToCart }) => {
  const [amount, setAmount] = useState(item.targetPrice);

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      donationAmount: amount,
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#9FA659] shadow-sm transition hover:shadow-lg">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold text-white">
          {item.title}
        </h3>

        <p className="mb-4 text-sm text-white">
          {item.description}
        </p>

        {/* Target Price */}
        <div className="mb-4 rounded-lg bg-gray-50 p-3">
          <p className="text-sm text-gray-500">
            Wishlist Price
          </p>

          <p className="text-xl font-bold text-green-600">
            ${item.targetPrice.toFixed(2)}
          </p>
        </div>

        {/* Donation Amount */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Donation Amount
          </label>

          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) =>
              setAmount(Number(e.target.value))
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-700 focus:outline-none text-white"
          />
        </div>

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <ShoppingCart size={18} />

          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;