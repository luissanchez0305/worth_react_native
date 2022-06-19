import styled from "styled-components/native";

export default function HeadDetail({ detail, title }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Detail>{detail}</Detail>
    </Container>
  );
}

export const Container = styled.View`
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  padding-bottom: 16px;
  font-weight: 800;
  color: #ffffff;
`;

export const Detail = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #aaabb5;
`;
