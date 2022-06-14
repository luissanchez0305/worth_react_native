import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";

export default function ChatScreen() {
  return (
    <Layout>
      <SafeAreaView>
        <HeadText>Chat</HeadText>
        <SubHeadText>Bienvenido</SubHeadText>
        <CardContainer>
          <Text>See Your Changes</Text>
        </CardContainer>
        <CardContainer>
          <Text>See Your Changes</Text>
        </CardContainer>
      </SafeAreaView>
    </Layout>
  );
}
