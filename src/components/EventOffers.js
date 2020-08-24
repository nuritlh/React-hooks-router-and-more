import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Wrapper = styled.div`
  font-size: 0.8rem;
  background-color: #dad2d294;;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
  background-color: #a8ccaa;
`;

const EventOffers = ({offer}) => {
  const { status, type, url } = offer;
  let history = useHistory();
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