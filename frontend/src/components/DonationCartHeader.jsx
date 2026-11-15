const DonationCartHeader = ({
  itemCount,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-4 bg-[#797641]">
      <div>
        <h2 className="text-xl font-bold text-g text-white">
          Donation Cart
        </h2>

        <p className="mt-1 text-sm text-white">
          {itemCount} item{itemCount !== 1 ? "s" : ""}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
  );
};

export default DonationCartHeader;