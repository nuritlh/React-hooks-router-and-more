import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Link from '@material-ui/core/Link';
import { saveToStorage, loadFromStorage, addOrRemove } from '../../services/utils';
import Button from '@material-ui/core/Button';
import EventOffers from './EventOffers';
import GoogleApiWrapper from '../GoogleMap';

const Wrapper = styled.div`
  height: 100%;
  margin: 0 20px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
`;

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Details = styled.div`
  margin: 20px;
  background-color: #a3d2ca;
  border-radius: 50%;
  min-width: 200px;
  display: inline-block;
`;

const MapWrapper = styled.div`
  // width: 90%;
  padding: 20px;
  display: flex;
  justify-content: center;
    `;

const DATE_FORMAT = 'MMMM Do YYYY, h:mm:ss a';
const MY_FAVORITES_KEY = 'my_Favorites_events';

const Event = () => {
  const location = useLocation();
  let history = useHistory();
  const [isFavorites, setIsFavorites] = useState(false);
  const [event, setEvent] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (location && location.state) {
      setEvent(location.state.event);
      const favorites = loadFromStorage(MY_FAVORITES_KEY) || [];
      setFavorites(favorites);
      const isFavorites = favorites.filter(fav => fav.id === location.state.event.id);
      setIsFavorites(isFavorites.length > 0);
    } else {
      history.push({
        pathname: `/NotFoundPage`
      })
    }
  }, [location, history]);

  const toggleFavorites = useCallback(() => {
    const favorites = loadFromStorage(MY_FAVORITES_KEY) || [];
    const updatedFavorites = addOrRemove(favorites, event);
    saveToStorage(MY_FAVORITES_KEY,updatedFavorites);
    setIsFavorites(!isFavorites);
  },[event, isFavorites]);

  return (
    <Wrapper>
      <FlexWrapper>
        <h1>Who’s In Town</h1>
        <FlexWrapper onClick={toggleFavorites}>
          {isFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
          add to favorites
        </FlexWrapper>
      </FlexWrapper>
      {event && <DetailsWrapper>
        <Details>
        <h3>Details</h3>
        <h4>Title: {event.title ? event.title : 'no title'}</h4>
        <h4>Description: {event.description ? event.description : 'no description'}</h4>
        <h4>Date: { moment(event.datetime).format(DATE_FORMAT)}</h4>
        <h4>On Sale at: { moment(event.on_sale_datetime).format(DATE_FORMAT)}</h4>
        { event.url !== '' && <Link href={event.url} variant="caption" target="_blank" rel="noreferrer">
          Read more
        </Link>
        }
      </Details>
      <Details>
        <h3>Where?</h3>
        <h5>City: {event.venue.city}</h5>
        <h5>Country: {event.venue.country}</h5>
        <h5>Location: {event.venue.location}</h5>
        <h5>Name: {event.venue.name}</h5>
      </Details>
      <Details>
        <h3>Special offers</h3>
        {event.offers.map((offer, idx) => (<EventOffers key={idx} offer={offer}/>))}
      </Details>
      </DetailsWrapper>
      }
      <MapWrapper>
        <GoogleApiWrapper/>
      </MapWrapper>
      <Button variant="contained" color="primary" onClick={() => (history.push({
        pathname: `/`
      }))}>
        Back to Search
      </Button>
    </Wrapper>
  )
};

export default Event;