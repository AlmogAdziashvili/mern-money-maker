import React from 'react';
import {
  Container,
} from '@material-ui/core';

// CSS
import './style.css';

function MainContainer(props) {
  return (
    <Container maxWidth={false} className="main-container" {...props} />
  );
}

export default MainContainer;
