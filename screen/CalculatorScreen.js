import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalculatorForm from "../components/calculator/CalculatorForm";
import { GradientBackground } from "../components/GradientBackground";
import { Layout, HeadText, SubHeadText } from "../globalStyle";

export default function CalculatorScreen() {
  return (
    <GradientBackground
      start={{x: 0.4, y: 0.6}}
      end={{x: 0.5, y: 0.9}}
    >
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <HeadText>Calculadora</HeadText>
            <SubHeadText>Cotizar</SubHeadText>
            <CalculatorForm />
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
}
