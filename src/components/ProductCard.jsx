import React from "react";
import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { user } = useAuth(); //Get current user

  const handleAddToCart = async () => {
    //Check if user is logged in
    if (!user) return alert("Please login to add items to cart");

    //creating a Firestore document reference at this location
    //So each user has their own “cart” collection inside their user document.
    //Each product in their cart is stored by its product ID.
    const cartRef = doc(db, "users", user.uid, "cart", product.id);

    try {
      //check if the product is already in the cart
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        //Product already in cart -> increment quantity
        await updateDoc(cartRef, { quantity: increment(1) });
      } else {
        //Add new product if not already in cart
        await setDoc(cartRef, {
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }
      alert(`${product.name} added to cart!`); //This shows a message when the operation is complete.
      //If any part of the process fails (like no internet or Firebase error),
      //it prints the error in the console so you can debug.
    } catch (err) {
      console.error("Error adding to cart: ", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl"
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 mb-2">₹{product.price}</p>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
