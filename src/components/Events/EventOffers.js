import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Wrapper = styled.div`
  font-size: 0.8rem;
  background-color: #d9adad;;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
  background-color: #caa5a5;
`;

const EventOffers = ({offer}) => {
  const { status, type, url } = offer;
  return (
    <Wrapper >
      <Link href={url} variant="caption" target="_blank" rel="noreferrer" underline="none">
        <Typography variant="caption" display="block" gutterBottom>
        status: {status}
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        type: {type}
      </Typography>
      </Link>
    </Wrapper>
  )
};

export default EventOffers;