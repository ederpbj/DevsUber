import React, {useRef, useState, useEffect} from 'react';

import {Container, IntineraryLabel, IntineraryTitle} from './styled';

const Trips = props => {
  return (
    <Container>
      <IntineraryLabel>
        <IntineraryTitle>Origem</IntineraryTitle>
      </IntineraryLabel>
    </Container>
  );
};
export default Trips;
