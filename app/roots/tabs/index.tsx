import { View } from "react-native";
export default function index(){
  return(
    <View
     style={{
      flex:1,
      justifyContent:"center",
       alignItems:"center",
     }}>
      <text>welcome</text>
       <link href="/sign-in.tsx">signin</link>
       <link href="/explore.tsx">explore</link>
       <link href="/profile.tsx">profile</link>
       <link href="/properties.tsx">properties</link>
     </View>
  )
}