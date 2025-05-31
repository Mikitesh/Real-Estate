// Import necessary modules and hooks
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router"; // For navigation and accessing URL parameters
import { Text, ScrollView, TouchableOpacity } from "react-native";

import { categories } from "@/constants/data"; // Importing predefined categories

// Main Filters component
const Filters = () => {
  // Get current URL parameters; filter is optional
  const params = useLocalSearchParams<{ filter?: string }>();

  // Local state for the selected category
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All" // Initialize with the URL param or default to "All"
  );

  // Handle category button press
  const handleCategoryPress = (category: string) => {
    // If the selected category is clicked again, deselect it
    if (selectedCategory === category) {
      setSelectedCategory(""); // Clear selection
      router.setParams({ filter: "" }); // Update URL param
      return;
    }

    // Otherwise, set the new category
    setSelectedCategory(category);
    router.setParams({ filter: category }); // Update URL param with new filter
  };

  return (
    // Horizontally scrollable list of categories
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {/* Loop through each category item */}
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)} // Handle press
          key={index}
          // Apply dynamic styling based on selection
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
            selectedCategory === item.category
              ? "bg-primary-300" // Selected style
              : "bg-primary-100 border border-primary-200" // Unselected style
          }`}
        >
          {/* Category title text */}
          <Text
            className={`text-sm ${
              selectedCategory === item.category
                ? "text-white font-rubik-bold mt-0.5" // Selected text style
                : "text-black-300 font-rubik" // Default text style
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
