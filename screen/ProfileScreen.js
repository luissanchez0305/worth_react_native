import { ScrollView, Text } from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, CardContainer } from "../globalStyle";
import ButtonBack from "../components/ButtonBack";
import LoginForm from "../components/session/LoginForm";

export default function ProfileScreen() {
  const [user, setUser] = useState(false);

  return (
    <Layout>
      <ScrollView>
        <SafeAreaView>
          <ButtonBack />
          {user ? <Profile /> : <Login />}
        </SafeAreaView>
      </ScrollView>
    </Layout>
  );
}

function Profile() {
  return <Text style={{ color: "white" }}>Mi perfil</Text>;
}

function Login() {
  return <LoginForm />;
}
