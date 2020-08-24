import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #000000;
  padding: 20px;
    `;

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <Button onClick={() => history.push('/')} variant="outlined">Back to Home Page</Button>
      <p>404</p>
      <div>Page Not Found</div>
    </Wrapper>
  )
};

export default NotFoundPage;