import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";

export default function ChartsScreen() {
  return (
    <Layout>
      <ScrollView>
        <SafeAreaView>
          <HeadText>Mercado</HeadText>
          <CardContainer>
            <Text>See Your Changes</Text>
          </CardContainer>
        </SafeAreaView>
      </ScrollView>
    </Layout>
  );
}
