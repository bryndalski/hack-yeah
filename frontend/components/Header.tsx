import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "./ui/avatar";
import { TabBarIcon } from "./navigation/TabBarIcon";

type HeaderProps = {
  user: any;
  page: "home" | "add";
};

const Header = ({ user, page }: HeaderProps) => {
  const isUser = user && user.fullName;

  const getPageTitle = () => {
    switch (page) {
      case "home":
        return null;
      case "add":
        return "Add";
      default:
        return "Welcome!";
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          {page === "home" && isUser && (
            <View style={styles.userWrapper}>
              <Avatar size="md">
                <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
                <AvatarBadge />
              </Avatar>

              <View>
                <Text style={styles.userSubheader}>Welcome back!</Text>
                <Text style={styles.userHeader}>{user.fullName}</Text>
              </View>
            </View>
          )}

          {page !== "home" && (
            <Text style={styles.pageTitle}>{getPageTitle()}</Text>
          )}
        </View>

        <View>
          <TabBarIcon name="notifications-outline" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  userWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userSubheader: {
    fontSize: 14,
  },
  userHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
