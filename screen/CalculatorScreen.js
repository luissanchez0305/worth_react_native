import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalculatorForm from "../components/calculator/CalculatorForm";
import { GradientBackground } from "../components/GradientBackground";
import { Layout, HeadText, SubHeadText, CardContainer } from "../globalStyle";
import HeadSection from "../components/HeadSection";

export default function CalculatorScreen() {
  return (
    <GradientBackground>
      <Layout>
        <SafeAreaView>
          <CardContainer>
        <View style={{
          marginTop: 10,
        }}>
          <HeadSection
            icon={require("../assets/headIcons/calculator.png")}
            title={"Calculadora"}
            iconColor={"#CDA434"}
          />
        </View>
        <ScrollView>
          <SafeAreaView>
            <CalculatorForm />
          </SafeAreaView>
        </ScrollView>
        </CardContainer>
        </SafeAreaView>
      </Layout>
    </GradientBackground>
  );
}
