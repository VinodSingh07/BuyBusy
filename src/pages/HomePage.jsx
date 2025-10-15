import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import SidebarFilter from "../components/SidebarFilter";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "", priceRange: "" });

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setFilteredProducts(productList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Run once
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔍 Apply search and filter simultaneously
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Filter by price range
    if (filters.priceRange === "low") {
      filtered = filtered.filter((p) => p.price < 500);
    } else if (filters.priceRange === "medium") {
      filtered = filtered.filter((p) => p.price >= 500 && p.price <= 1500);
    } else if (filters.priceRange === "high") {
      filtered = filtered.filter((p) => p.price > 1500);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, filters, products]);

  if (loading) return <Spinner />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarFilter filters={filters} setFilters={setFilters} />

      {/* Main content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          🛍️ BusyBuy Products
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
