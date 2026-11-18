const CartItem = ({
  item,
  onRemove,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-[#9FA659] p-4 shadow-sm">
      <div className="flex gap-4">

        {/* Image */}
        <img
          src={`http://localhost:3000${item.item_image_url}`}
          alt={item.item_name}
          className="h-20 w-20 rounded-lg object-cover"
        />

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-semibold text-white">
            {item.item_name}
          </h3>

          {item.item_description && (
            <p className="mt-1 text-sm text-white">
              {item.item_description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-white">
                Donation Amount
              </p>

              <p className="font-bold text-white">
                $
                {Number(
                  item.donationAmount || 0
                ).toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg bg-red-700 px-3 py-1 text-lg font-medium text-white transition hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartItem;