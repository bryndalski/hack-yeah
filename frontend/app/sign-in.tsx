import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useSession } from "../ctx";
import React, { useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function SignIn() {
  const { signIn } = useSession();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View style={styles.container}>
          <FormControl className="p-4 border rounded-lg border-outline-300">
            <VStack space="xl">
              <Heading className="text-typography-900 leading-3">Login</Heading>
              <VStack space="xs">
                <Text className="text-typography-500 leading-1">Email</Text>
                <Input>
                  <InputField type="text" />
                </Input>
              </VStack>
              <VStack space="xs">
                <Text className="text-typography-500 leading-1">Password</Text>
                <Input className="text-center">
                  <InputField type="password" />
                  <InputSlot className="pr-3" onPress={handleState}></InputSlot>
                </Input>
              </VStack>
              <Button
                className="ml-auto"
                onPress={() => {
                  signIn();
                  router.replace("/");
                }}
              >
                <ButtonText className="text-typography-0">Login</ButtonText>
              </Button>
            </VStack>
          </FormControl>
        </View>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});
