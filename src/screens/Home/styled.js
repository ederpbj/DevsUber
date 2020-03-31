import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ff0000;
`;

/* Base
<IntineraryArea>
        <IntineraryItem>
          <>
            <IntineraryLabel>
              <IntineraryPoint />
              <IntineraryTitle>Origem</IntineraryTitle>
            </IntineraryLabel>
            <IntineraryValue>...</IntineraryValue>
*/

export const IntineraryArea = styled.View`
  position: absolute;
  left: 10px;
  right: 10px;
  top: 50px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 4px #999;
  border-color: #eee;
  border-width: 1px;
`;

export const IntineraryItem = styled.TouchableHighlight`
  padding: 15px 20px;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;

export const IntineraryLabel = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IntineraryPoint = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.color};
`;

export const IntineraryTitle = styled.Text`
  margin-left: 10px;
  color: #999;
`;

export const IntineraryValue = styled.Text`
  color: #000;
  font-size: 16px;
`;
