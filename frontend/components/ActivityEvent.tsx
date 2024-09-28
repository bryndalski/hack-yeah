import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { Link } from "expo-router";

type ActivityEventProps = {
  proficiencyLevel: string;
  name: string;
  locationName: string;
  date: Date;
  peopleJoined: number;
  maxPeople: number;
};

const ActivityEvent = ({
  proficiencyLevel,
  name,
  locationName,
  date,
  peopleJoined,
  maxPeople,
}: ActivityEventProps) => {
  const placeholderImage =
    "https://media.istockphoto.com/id/1366052585/pl/zdj%C4%99cie/uj%C4%99cie-grupy-przyjaci%C3%B3%C5%82-sp%C4%99dzaj%C4%85cych-czas-przed-wsp%C3%B3lnym-treningiem.jpg?s=1024x1024&w=is&k=20&c=8ZgzGPSoLos0xm0iGakhlr6NsONtmKfdVwOpDDuBtK0=";

  const getParticipantsInfo = () => {
    if (!peopleJoined || !maxPeople) return null;
    return `${peopleJoined}/${maxPeople}`;
  };
  const participantsInfo = getParticipantsInfo();

  const getFormattedDate = () => {
    if (!date) return null;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}.${month}`;
  };
  const formattedDate = getFormattedDate();

  return (
    <Link href={`/event/1`}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: placeholderImage }}
          resizeMode="cover"
          style={styles.image}
          imageStyle={{
            borderRadius: 10,
          }}
        >
          <View style={styles.wrapper}>
            <Text style={{ ...styles.text, ...styles.badge }}>
              {proficiencyLevel}
            </Text>

            <View style={styles.activityInfo}>
              <Text style={{ ...styles.text, ...styles.name }}>{name}</Text>

              <View style={styles.footer}>
                {locationName && (
                  <Text style={styles.footerItem}>
                    <TabBarIcon name="location" color="white" size={14} />
                    {locationName}
                  </Text>
                )}

                {participantsInfo && (
                  <Text style={styles.footerItem}>
                    <TabBarIcon name="people" color="white" size={14} />
                    {participantsInfo}
                  </Text>
                )}

                {formattedDate && (
                  <Text style={styles.footerItem}>
                    <TabBarIcon name="calendar" color="white" size={14} />
                    {formattedDate}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 230,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    height: "100%",
    padding: 10,
    paddingTop: 40,
    display: "flex",
    justifyContent: "flex-end",
  },
  text: {
    color: "white",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 10,
  },
  activityInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  footerItem: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
});

export default ActivityEvent;
