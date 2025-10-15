import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  increment,
  addDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items in real time
  useEffect(() => {
    if (!user) return;
    const cartRef = collection(db, "users", user.uid, "cart");

    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);
    });

    return () => unsubscribe();
  }, [user]);

  // Increase quantity
  const handleIncrease = async (item) => {
    const cartRef = doc(db, "users", user.uid, "cart", item.id);
    await updateDoc(cartRef, { quantity: increment(1) });
  };

  // Decrease quantity or delete item
  const handleDecrease = async (item) => {
    const cartRef = doc(db, "users", user.uid, "cart", item.id);
    if (item.quantity > 1) {
      await updateDoc(cartRef, { quantity: increment(-1) });
    } else {
      await deleteDoc(cartRef);
    }
  };

  if (!user)
    return (
      <p className="text-center mt-10">Please log in to view your cart.</p>
    );

  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Checkout logic
  const handleCheckout = async () => {
    if (cartItems.length === 0) return toast.warn("🛒 Your cart is empty!");

    try {
      const orderData = {
        items: cartItems,
        totalAmount,
        orderDate: new Date().toLocaleString(),
      };

      // Save order
      await addDoc(collection(db, "users", user.uid, "orders"), orderData);

      // Clear cart
      for (const item of cartItems) {
        await deleteDoc(doc(db, "users", user.uid, "cart", item.id));
      }

      toast.success("✅ Order placed successfully!");
    } catch (err) {
      console.error("Checkout error:", err);
      toast.warn("🛒 Your cart is empty!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white p-4 rounded-xl shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="text-center mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Total: ₹{totalAmount.toFixed(2)}
          </h2>
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
