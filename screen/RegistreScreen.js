import { ScrollView, Text } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, CardContainer } from "../globalStyle";
import ButtonBack from "../components/ButtonBack";
import LoginForm from "../components/session/LoginForm";
import RegistreForm from "../components/session/RegistreForm";
import { GradientBackground } from "../components/GradientBackground";

export default function RegistreScreen() {
  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <ButtonBack />
            <RegistreForm />
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
}
