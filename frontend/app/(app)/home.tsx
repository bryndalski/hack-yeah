import { Text, View } from "react-native";

import { useSession } from "../../ctx";

export default function Home() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ELO ELOE LOE</Text>
    </View>
  );
}
