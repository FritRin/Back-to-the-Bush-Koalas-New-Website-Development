import { useState } from "react";

import WishlistGrid from "../components/WiishlistGrid";
import CartIcon from "../components/CartIcon";
import DonationCartDrawer from "../components/DonationCartDrawer";
import FormPopUp from "../components/FormPopUp"

const Wishlist = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleAddToCart = (item) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItem) {
                return prev.map((cartItem) =>
                    cartItem.id === item.id ? item : cartItem
                );
            }

            return [...prev, item];
        });
    };

    const handleRemoveItem = (itemId) => {
        setCartItems((prev) =>
            prev.filter((item) => item.id !== itemId)
        );
    };

    const handleDonate = () => {
        console.log("Donation Items:", cartItems);
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="border-b">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            Wishlist
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Support our wishlist by donating toward
                            the items below.
                        </p>
                    </div>

                    <div className="fixed bottom-6 right-6 z-50">
                        <CartIcon
                            itemCount={cartItems.length}
                            onClick={() => setIsCartOpen(true)}
                        />
                    </div>

                </div>
            </section>

            {/* Wishlist Items */}
            <WishlistGrid
                onAddToCart={handleAddToCart}
            />

            {/* Cart Drawer */}
            <DonationCartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
                onDonate={() => setShowForm(true)}
            />

            <FormPopUp
                open = {showForm}
                close={() => setShowForm(false)}
                donationType = "wishlist"
                cartItems = {cartItems}
            />
        </div>
    );
};

export default Wishlist;