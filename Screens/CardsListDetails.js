import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import { SharedElement } from "react-navigation-shared-element";
import GoBack from "../components/GoBack";
import { width, height, fonts } from "../config/theme";
import * as Animatable from "react-native-animatable";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { innerData } from "../config/data/cards";
import Animated, { interpolate, Extrapolate, Easing } from "react-native-reanimated";
const CARD_WIDTH = width * 0.94;
const CARD_HEIGHT = width * 0.6;

const xxx = {
  0: { scale: 1, translateY: height / 2 - CARD_WIDTH / 2, rotate: "0deg" },
  1: { scale: 1.2, translateY: 0, rotate: "90deg" }
};

const reverse = {
  0: xxx[1],
  1: xxx[0]
};

const CardsListDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const cardRef = React.useRef();
  const translateY = React.useRef(new Animated.Value(0)).current;
  // hooks
  const bottomSheetRef = React.useRef(null);

  // variables
  const snapPoints = React.useMemo(() => ["-10%", "25%", "50%", "85%"], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const inputRange = [0, 1, 2, 3];
  const locationButtonStyle = React.useMemo(
    () => ({
      transform: [
        {
          translateY: interpolate(translateY, {
            inputRange,
            outputRange: [0, height * 0.1, -CARD_HEIGHT / 4, 0],
            extrapolate: Extrapolate.CLAMP
          })
        },
        {
          scale: interpolate(translateY, {
            inputRange,
            outputRange: [1, 1, 1, 0.8],
            extrapolate: Extrapolate.CLAMP
          })
        }
      ]
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const textStyle = React.useMemo(
    () => ({
      opacity: interpolate(translateY, {
        inputRange,
        outputRange: [0, 1, 0, 0]
        // extrapolate: Extrapolate.CLAMP,
      })
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const ccNumberStyle = React.useMemo(
    () => ({
      opacity: interpolate(translateY, {
        inputRange,
        outputRange: [0, 1, 1, 1]
        // extrapolate: Extrapolate.CLAMP,
      })
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  React.useEffect(() => {
    const xxx = setTimeout(() => {
      bottomSheetRef.current.snapTo(1);
    }, 1000);
    return () => {
      clearTimeout(xxx);
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <AntDesign
        name="arrowleft"
        size={28}
        style={{
          padding: 12,
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 2
        }}
        color={"#fff"}
        onPress={() => {
          bottomSheetRef.current.snapTo(0);
          cardRef.current.animate(reverse, 1000).then(() => {
            navigation.goBack();
          });
        }}
      />
      <Animated.View style={locationButtonStyle}>
        <Animated.View style={textStyle}>
          <Text
            style={{ ...fonts.montserratBold, color: "white", fontSize: 24, textAlign: "center" }}
          >
            Your Card
          </Text>
          <Text
            style={{
              ...fonts.montserratRegular,
              color: "white",
              fontSize: 12,
              textAlign: "center",
              opacity: 0.8
            }}
          >
            Check all the transactions below
          </Text>
        </Animated.View>
        <Animatable.View
          ref={cardRef}
          easing="ease-in-out-expo"
          animation={xxx}
          useNativeDriver
          delay={50}
          style={{ width, height: width }}
        >
          <Card
            item={item}
            cardHeight={CARD_HEIGHT}
            cardWidth={CARD_WIDTH}
            scale={0.8}
            textStyle={ccNumberStyle}
          />
        </Animatable.View>
      </Animated.View>
      <BottomSheet
        ref={bottomSheetRef}
        animatedPositionIndex={translateY}
        snapPoints={snapPoints}
        initialSnapIndex={0}
        onChange={handleSheetChanges}
        handleComponent={() => {
          return (
            <View
              style={{
                padding: 20,
                backgroundColor: "rgba(25,20,28,1)",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24
              }}
            >
              <Text style={{ ...fonts.montserratBold, color: "white", fontSize: 24 }}>Today</Text>
            </View>
          );
        }}
        style={{ backgroundColor: "red" }}
      >
        <BottomSheetFlatList
          data={innerData}
          keyExtractor={(item) => item.key}
          style={{ backgroundColor: "rgba(25,20,28,1)" }}
          renderItem={({ item }) => {
            const s = 48;
            return (
              <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
                <View
                  style={{
                    width: s,
                    height: s,
                    borderRadius: s / 2,
                    backgroundColor: item.color,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 20
                  }}
                >
                  <Feather name="shopping-bag" size={24} color="#fff" />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomColor: "rgba(255,255,255,0.2)",
                    borderBottomWidth: 1,
                    paddingVertical: 20
                  }}
                >
                  <View>
                    <Text style={{ color: "white", ...fonts.montserratBold, fontSize: 20 }}>
                      {item.name}
                    </Text>
                    <Text style={{ color: "white", ...fonts.montserratRegular, fontSize: 12 }}>
                      {item.department}
                    </Text>
                  </View>
                  <Text style={{ ...fonts.montserratBold, color: "white" }}>{item.ammount}</Text>
                </View>
              </View>
            );
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

CardsListDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.card`,
      animation: "move",
      resize: "clip",
      align: "center-left"
    }
  ];
};

export default CardsListDetails;
