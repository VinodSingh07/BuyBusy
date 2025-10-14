import React from "react";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart`);
    // TODO: Implement Firestore cart logic later
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
