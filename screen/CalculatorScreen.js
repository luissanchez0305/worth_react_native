import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalculatorForm from "../components/calculator/CalculatorForm";
import { Layout, HeadText, SubHeadText } from "../globalStyle";

export default function CalculatorScreen() {
  return (
    <Layout>
      <ScrollView>
        <SafeAreaView>
          <HeadText>Calculadora</HeadText>
          <SubHeadText>Cotizar</SubHeadText>
          <CalculatorForm />
        </SafeAreaView>
      </ScrollView>
    </Layout>
  );
}
