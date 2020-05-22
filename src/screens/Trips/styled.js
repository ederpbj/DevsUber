import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #eee;
`;

// Tela carregando...
export const LoadingArea = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const TripScroll = styled.ScrollView`
  margin-left: 10px;
  color: #999;
`;

export const TripFrom = styled.Text`
  color: #000;
  font-size: 24px;
`;

export const TripArea = styled.SafeAreaView`
  flex: 1;
`;
