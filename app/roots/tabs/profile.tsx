// Importing necessary components and modules from React Native and other custom modules
import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { logout } from "@/lib/appwrite"; // Custom logout function from appwrite config
import { useGlobalContext } from "@/lib/global-provider"; // Custom context hook to access global state

import icons from "@/constants/icons"; // Icon assets
import { settings } from "@/constants/data"; // Settings data array

// Type definition for props passed into each settings item component
interface SettingsItemProp {
  icon: ImageSourcePropType; // Icon image source
  title: string;             // Title text
  onPress?: () => void;      // Optional onPress callback
  textStyle?: string;        // Optional custom text style
  showArrow?: boolean;       // Whether to show a right arrow icon
}

// Component to render individual settings item
const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    {/* Left side with icon and text */}
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {/* Optional arrow icon on the right */}
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

// Main profile screen component
const Profile = () => {
  const { user, refetch } = useGlobalContext(); // Access user info and refetch function from global context

  // Function to handle logout logic
  const handleLogout = async () => {
    const result = await logout(); // Call logout function
    if (result) {
      Alert.alert("Success", "Logged out successfully"); // Show success alert
      refetch({}); // Refresh user state (log out)
    } else {
      Alert.alert("Error", "Failed to logout"); // Show error alert
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      {/* Scrollable container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Header with title and notification icon */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        {/* User avatar and name section */}
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            {/* User avatar image */}
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            {/* Edit button on avatar */}
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            {/* User name */}
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        {/* First group of settings (e.g. Bookings, Payments) */}
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        {/* Second group of settings loaded from `settings` data array */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        {/* Logout section */}
        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
