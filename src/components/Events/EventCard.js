import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  font-size: 0.8rem;
  background-color: #d9adadb3;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  &:hover {
  background-color: #d9adad;
`;

const EventCard = ({event}) => {
  const { id, title, datetime } = event;
  let history = useHistory();
  return (
    <Wrapper onClick={() => (
      history.push({
        pathname: `/event/${id}`,
        state: { event: event }
      })
    )}>
      {title} at { moment(datetime).format('MMMM Do YYYY') }
    </Wrapper>
  )
};

export default EventCard;