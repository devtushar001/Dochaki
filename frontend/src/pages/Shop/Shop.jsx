import React, { useState, useContext, useEffect } from "react";
import './Shop.css';
import { DochakiContext } from "../../components/Context/Contact";
import ShopCategories from "../../components/ShopCategories/ShopCategories";
import ShopAccessoryDisplay from "../../components/ShopAccessoryDisplay/ShopAccessoryDisplay";
import { toast } from "react-toastify";

const Shop = () => {
  const [category, setCategory] = useState('All');
  const [activeSubCtg, setActiveSubCtg] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredAccessories, setFilteredAccessories] = useState([]); // State for filtered products
  const { bikeAccessories } = useContext(DochakiContext);

  // Scroll to top and initialize accessories on first render
  useEffect(() => {
    window.scrollTo(0, 0);
    setFilteredAccessories(bikeAccessories || []); // Prevent undefined issues
  }, [bikeAccessories]);

  // Handle filtering based on search query and category
  useEffect(() => {
    let filtered = bikeAccessories || [];

    if (category !== 'All') {
      filtered = filtered.filter(item => item.category === category);
      setSearchQuery(""); // Reset search query when category changes
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item => {
        const query = searchQuery.toLowerCase();
        
        return (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.subcategory.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.additionalInfo?.compatibility?.some(compatibility =>
            compatibility.toLowerCase().includes(query)
          ) ||
          item.price?.newPrice?.toString().includes(query) ||
          item.price?.oldPrice?.toString().includes(query)
        );
      });
    }

    setFilteredAccessories(filtered);
  }, [searchQuery, category, bikeAccessories]);

  return (
    <>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an item..."
        />
        <button onClick={() => setSearchQuery(searchQuery.trim())}>Search Item</button>
      </div>
      <hr />

      {/* Categories and Accessories */}
      <div className="ksdl">
        <ShopCategories
          inputValue={setSearchQuery}
          category={category}
          setCategory={setCategory}
          activeSubCtg={activeSubCtg}
          setActiveSubCtg={setActiveSubCtg}
        />
        <ShopAccessoryDisplay
          activeSubCtg={activeSubCtg}
          category={category}
          accessories={filteredAccessories}
        />
      </div>
    </>
  );
};

export default Shop;
