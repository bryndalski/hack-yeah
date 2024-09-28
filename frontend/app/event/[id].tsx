import React from "react";
import { Image, SafeAreaView, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const getEventData = (id: string) => {
  return {
    name: "Running together in Cracow",
    description: "Event description",
    locationName: "Cracow",
    location: {
      lat: 50.0647,
      log: 19.945,
    },
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    peopleJoined: 2,
    maxPeople: 10,
    image:
      "https://media.istockphoto.com/id/1366052585/pl/zdj%C4%99cie/uj%C4%99cie-grupy-przyjaci%C3%B3%C5%82-sp%C4%99dzaj%C4%85cych-czas-przed-wsp%C3%B3lnym-treningiem.jpg?s=1024x1024&w=is&k=20&c=8ZgzGPSoLos0xm0iGakhlr6NsONtmKfdVwOpDDuBtK0=",
  };
};

const EventPage = () => {
  const { id } = useLocalSearchParams();

  const {
    name,
    description,
    locationName,
    date,
    peopleJoined,
    maxPeople,
    image,
  } = getEventData((id as string) ?? "1");

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <Text>Event page: {id}</Text>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default EventPage;
