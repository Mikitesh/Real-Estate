import React, { useState } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { useDebouncedCallback } from "use-debounce"; // Hook for debouncing input

import icons from "@/constants/icons"; // Custom icons (assumed to include 'search' and 'filter')
import { useLocalSearchParams, router, usePathname } from "expo-router"; // Routing utilities from Expo Router

// Functional component for search input
const Search = () => {
  const path = usePathname(); // Get current route path (not used in current code)
  const params = useLocalSearchParams<{ query?: string }>(); // Get query params from URL
  const [search, setSearch] = useState(params.query); // Local state for search input, initialized from URL param

  // Debounced function to update URL parameters after user stops typing for 500ms
  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text }); // Updates the query param in the URL
  }, 500);

  // Handles input changes
  const handleSearch = (text: string) => {
    setSearch(text); // Update local state
    debouncedSearch(text); // Trigger debounced update of the URL
  };

  return (
    // Container for the search bar
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      {/* Left side: Search icon and text input */}
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        {/* Search icon */}
        <Image source={icons.search} className="size-5" />
        
        {/* Text input for search query */}
        <TextInput
          value={search} // Controlled input value
          onChangeText={handleSearch} // Updates state and URL on change
          placeholder="Search for anything" // Placeholder text
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>

      {/* Right side: Filter icon button (no action yet) */}
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
