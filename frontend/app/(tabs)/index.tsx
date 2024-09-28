import { Image, StyleSheet, Platform, ScrollView } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Header from "@/components/Header";
import ActivityEvent from "@/components/ActivityEvent";

export default function HomeScreen() {
  return (
    <ScrollView>
      <Header
        user={{
          fullName: "Jane Doe",
        }}
        page="home"
      />
      <ScrollView style={styles.listContainer}>
        <ActivityEvent
          proficiencyLevel="Beginner"
          name="Running together in Cracow"
          locationName="Cracow"
          date={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
          peopleJoined={2}
          maxPeople={4}
        />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  listContainer: {
    width: "100%",
    padding: 10,
  },
});
