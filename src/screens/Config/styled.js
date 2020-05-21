import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #eee;
`;

export const Header = styled.SafeAreaView`
  height: 150px;
  background-color: #3574cb;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 27px;
  margin-left: 20px;
`;

export const Input = styled.TextInput`
  margin: 10px 20px;
  border-bottom-width: 2px;
  border-bottom-color: #ccc;
  height: 50px;
  font-size: 16px;
  color: #333;
`;

export const ActionButton = styled.TouchableHighlight`
  background-color: #3574cb;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 5px;
  margin: 20px;
  box-shadow: 1px 2px 2px #999;
`;

export const ActionButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;