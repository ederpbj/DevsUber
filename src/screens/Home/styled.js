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
`;

export const IntineraryItem = styled.TouchableHighlight` `;

export const IntineraryLabel = styled.View` `;

export const IntineraryPoint = styled.View` `;

export const IntineraryTitle = styled.Text` `;

export const IntineraryValue = styled.Text` `;