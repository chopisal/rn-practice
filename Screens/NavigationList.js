import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import navigation from "../config/navigation";
import { SPACING, fonts } from "../config/theme";
import { StatusBar } from "expo-status-bar";

export default function NavigationList(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />
      <FlatList
        data={navigation}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ flex: 1, justifyContent: "space-evenly" }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.push(item.name)}
              style={{ padding: SPACING }}
            >
              <Text style={[{ ...fonts.montserratBold, fontSize: 24 }]}>
                {index + 1}. {item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
