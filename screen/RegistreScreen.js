import { ScrollView, Text } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, CardContainer, ContainerForm } from "../globalStyle";
import ButtonBack from "../components/ButtonBack";
import LoginForm from "../components/session/LoginForm";
import RegistreForm from "../components/session/RegistreForm";
import { GradientBackground } from "../components/GradientBackground";
import HeadDetail from "../components/HeadDetail";

export default function RegistreScreen() {
  return (
    <GradientBackground>
      <Layout>
        <ScrollView>
          <SafeAreaView>
            <ButtonBack />
            <ContainerForm>
              <HeadDetail
                title={"Registro"}
                detail={
                  "Crea una cuenta fácilmente para obtener beneficios de tener una cuenta con Worth"
                }
              />
            </ContainerForm>
            <RegistreForm />
          </SafeAreaView>
        </ScrollView>
      </Layout>
    </GradientBackground>
  );
}
