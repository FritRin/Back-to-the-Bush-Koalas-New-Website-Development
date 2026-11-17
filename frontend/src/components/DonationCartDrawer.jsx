
import DonationCartHeader from "./DonationCartHeader";
import CartItem from "./CartItem";

const DonationCartDrawer = ({ isOpen, onClose, cartItems, onRemoveItem, onDonate, }) => {
  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.donationAmount || 0), 0
  );
  console.log("cartItems:", cartItems);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-[#EEF2DB] shadow-2xl transition-transform duration-300 ${isOpen
          ? "translate-x-0"
          : "translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <DonationCartHeader
            itemCount={cartItems.length}
            onClose={onClose}
          />

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="mt-20 text-center">
                <p className="text-lg font-medium text-gray-700">
                  Your donation cart is empty
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Add wishlist items to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.item_id}
                    item={item}
                    onRemove={() =>
                      onRemoveItem(item.item_id)
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700">
                  Total Donation
                </span>

                <span className="text-2xl font-bold text-blue-600">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={onDonate}
                className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white"
              >
                Donate ${totalAmount.toFixed(2)}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DonationCartDrawer;