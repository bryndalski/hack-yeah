import Header from "@/components/Header";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

const Add = () => {
  return (
    <View>
      <SafeAreaView>
        <Header
          user={{
            fullName: "Jane Doe",
          }}
          page="add"
        />

        <Text>Add</Text>
      </SafeAreaView>
    </View>
  );
};

export default Add;
