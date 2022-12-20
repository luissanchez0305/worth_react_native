import { ScrollView, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import CountryFlag from "react-native-country-flag";
import { formatCurrencyDecimals, getDateFormatComplete } from "../../utils";

export default function ListEvents({ events }) {
  const capitalizeFirstLetter = (
    [first, ...rest],
    locale = navigator.language
  ) => first.toLocaleUpperCase(locale) + rest.join("");
  const cleanUnit = (val) => (val.indexOf("Index") ? val.toUpperCase() : null);
  return (
    <ScrollView>
      {events.map((data, index) => (
        <Container key={index}>
          <View style={{ paddingRight: 4, paddingTop: 4, paddingLeft: 4 }}>
            <CountryFlag isoCode={data.country} size={15} />
          </View>
          <ContainerText>
            <Title>{capitalizeFirstLetter(data.event)}</Title>
            <ContainerInfo>
              <Text style={styles.tagStyle}>Impact</Text>
              <Topic>{data.impact.toUpperCase()}</Topic>
              {data.estimate ? (
                <>
                  <Text style={styles.tagStyle}>Estimate</Text>
                  <Tag>
                    {formatCurrencyDecimals(data.estimate) +
                      (cleanUnit(data.unit) ? cleanUnit(data.unit) : "")}
                  </Tag>
                </>
              ) : null}
            </ContainerInfo>
            <ContainerInfo>
              {data.actual ? (
                <>
                  <Text style={styles.tagStyle}>Actual</Text>
                  <Tag>
                    {formatCurrencyDecimals(data.actual)}{" "}
                    {cleanUnit(data.unit) ? cleanUnit(data.unit) : ""}
                  </Tag>
                </>
              ) : null}
              {data.prev ? (
                <>
                  <Text style={styles.tagStyle}>Previous</Text>
                  <Tag>
                    {formatCurrencyDecimals(data.prev)}{" "}
                    {cleanUnit(data.unit) ? cleanUnit(data.unit) : ""}
                  </Tag>
                </>
              ) : null}
            </ContainerInfo>
            <ContainerInfo>
              <TagSmall>
                {getDateFormatComplete(data.time.replace(" ", "T"))}
              </TagSmall>
            </ContainerInfo>
          </ContainerText>
        </Container>
      ))}
    </ScrollView>
  );
}

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 6px;
  border-radius: 8px;
  padding-top: 10px;
  padding-bottom: 14px;
  padding-right: 10px;
  padding-left: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #45464f;
  background-color: #353c47;
`;

export const ContainerText = styled.View`
  flex: 1;
`;

export const ContainerInfo = styled.View`
  flex-direction: row;
`;

export const Image = styled.Image`
  width: 65px;
  height: 55px;
  margin-right: 8px;
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
`;
export const Tag = styled.Text`
  color: #ffffff;
  font-weight: 800;
  padding-right: 4px;
`;
export const TagSmall = styled.Text`
  color: #fda434;
  font-size: 10px;
  font-weight: bold;
`;

export const Topic = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #cda434;
  padding-right: 4px;
`;

const styles = StyleSheet.create({
  tagStyle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#aaabb5",
    paddingRight: 4,
  },
});
