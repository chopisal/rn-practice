import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { SLIDER_DATA } from "../config/travel";
import { ITEM_WIDTH, width, SPACING } from "../config/theme";

export default function MarketingSlider() {
  return (
    <FlatList
      data={SLIDER_DATA}
      keyExtractor={(item) => item.color}
      horizontal
      snapToInterval={ITEM_WIDTH + SPACING * 2}
      contentContainerStyle={{
        paddingRight: width - ITEM_WIDTH - SPACING * 2
      }}
      decelerationRate={"fast"}
      renderItem={({ item }) => {
        return (
          <View style={[styles.itemContainer, { backgroundColor: item.color }]}>
            <Text style={StyleSheet.itemText}>{item.title}</Text>
          </View>
        );
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1
  }
});
