import React from "react";

const SidebarFilter = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, priceRange: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ category: "", priceRange: "" });
  };

  return (
    <div className="w-64 bg-white shadow-md p-5 border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">
        Filter Products
      </h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Category</label>
        <select
          className="w-full border border-gray-300 p-2 rounded-md"
          value={filters.category}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Price Range</label>
        <select
          className="w-full border border-gray-300 p-2 rounded-md"
          value={filters.priceRange}
          onChange={handlePriceChange}
        >
          <option value="">All</option>
          <option value="low">Below ₹500</option>
          <option value="medium">₹500 - ₹1500</option>
          <option value="high">Above ₹1500</option>
        </select>
      </div>

      <button
        onClick={clearFilters}
        className="w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SidebarFilter;
