import { ShoppingCart } from "lucide-react";

const CartIcon = ({
  itemCount = 0,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition
      ${
        itemCount > 0
          ? "animate-bounce"
          : ""
      }`}
    >
      <ShoppingCart size={30} />

      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-7 min-w-[28px] items-center justify-center rounded-full bg-red-500 px-1 text-sm font-bold text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;