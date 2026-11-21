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
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#9FA659] shadow-sm transition hover:shadow-lg">
      
      {/* Image */}
      <div className="mx-5 mt-5 mb-4 flex h-48 items-center justify-center rounded-lg bg-white p-2">
        <img
          src={item.item_image_url}
          alt={item.item_name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Header */}
        <h3 className="mb-2 h-14 line-clamp-2 text-lg font-bold leading-snug text-white">
          {item.item_name}
        </h3>

        {/* Subheader */}
        <p className="mb-4 h-10 line-clamp-2 text-sm text-white">
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
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;