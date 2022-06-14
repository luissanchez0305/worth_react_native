import styled from "styled-components/native";

export default function HeadSection({ icon, title }) {
  return (
    <Container>
      <Icon source={icon} />
      <Title>{title}</Title>
    </Container>
  );
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

export const Title = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
`;
