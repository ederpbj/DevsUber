import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fff;
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

export const Menu = styled.View`
  background-color: #3574cb;
  flex-direction: row;
  padding-left: 20px;
`;

export const MenuItem = styled.TouchableHighlight`
  padding: 20px;
  border-bottom-width: 5px;
  border-bottom-color: ${props => (props.active ? '#FFF' : '#3574CB')};
`;

export const MenuItemText = styled.Text`
  color: #ffff;
  font-size: 16px;
`;

export const Input = styled.TextInput`
  margin: 10px 20px;
  border-bottom-width: 2px;
  border-bottom-color: #999;
  height: 40px;
  font-size: 16px;
  color: #333;
`;

export const ActionButton = styled.TouchableHighlight`
  background-color: #3574cb;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 5px;
  margin: 20px;
  box-shadow: 1px 2px 2px #999;
`;

export const ActionButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
