import { ShoppingCart } from "lucide-react";

const CartIcon = ({
  itemCount = 0,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50 hover:shadow-md"
    >
      <ShoppingCart
        size={22}
        className="text-gray-700"
      />

      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;