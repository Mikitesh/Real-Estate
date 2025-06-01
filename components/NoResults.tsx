import React from "react";
import { View, Text, Image } from "react-native";

import images from "@/constants/images"; // Custom image assets (assumed to include a 'noResult' image)

// Functional component to display a "No Results Found" message
const NoResults = () => {
  return (
    // Outer container to center the content
    <View className="flex items-center my-5">
      
      {/* Image displayed when no results are found */}
      <Image
        source={images.noResult} // Image source from custom assets
        className="w-11/12 h-80"   // Responsive width and fixed height
        resizeMode="contain"       // Keeps image aspect ratio within bounds
      />
      
      {/* Main title text */}
      <Text className="text-2xl font-rubik-bold text-black-300 mt-5">
        No Result
      </Text>
      
      {/* Subtitle text with more context */}
      <Text className="text-base text-black-100 mt-2">
        We could not find any result
      </Text>
    </View>
  );
};

export default NoResults;
