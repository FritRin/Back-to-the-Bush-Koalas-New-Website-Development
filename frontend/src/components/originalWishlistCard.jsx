import { ShoppingCart } from "lucide-react";

const WishlistCard = ({ item, onAddToCart }) => {
  
  const handleAddToCart = () => {
      console.log("Adding:", {
    ...item,
    donationAmount: item.price,
  });
    onAddToCart({
      ...item,
      donationAmount: item.price,
    });
  };
  
  console.log("Card Item:", item);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#9FA659] shadow-sm transition hover:shadow-lg">
      
      {/* Image */}
      <img
        src={item.item_image_url}
        alt={item.item_name}
        className="w-full object-cover"
      />

      {/* Content */}
      <div className="p-5 text-lg">
        <h3 className="mb-2 font-semibold text-white">
          {item.item_name}
        </h3>

        <p className="mb-4 text-sm text-white">
          {item.item_description}
        </p>

        {/* Quantity Remaining */}
        <div className="mb-3 text-sm text-white">
          Available: {item.number_of_items}
        </div>

        {/* Price */}
        <div className="mb-4 rounded-lg bg-gray-50 p-3">
          <p className="text-sm text-gray-500">
            Wishlist Price
          </p>

          <p className="text-xl font-bold text-green-600">
            ${Number(item.price).toFixed(2)}
          </p>
        </div>

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;