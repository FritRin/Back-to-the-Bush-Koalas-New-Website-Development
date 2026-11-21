import WishlistCard from "./WishlistCard";

const WishlistGrid = ({
  items,
  onAddToCart,
}) => {
  console.log("Grid Items:", items);
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <WishlistCard
          key={item.item_id}
          item={item}
          onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default WishlistGrid;