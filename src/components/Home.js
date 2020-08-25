import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { get } from '../services/api';
import { loadFromStorage } from '../services/utils';
import SearchInputWithButton from './SearchInputWithButton/SearchInputWithButton';
import Artist from '../components/Artist';
import EventCard from './Events/EventCard';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;
`;

const BlockWrappers = styled.div`
  background-color: #84a9ac;
  padding: 10px;
  height: fit-content;
  margin: 15px;
`;

const Message = styled.div`
  color: #145374;
  font-weight: 500;
  padding: 5px 0;
`;

const NOT_FOUND_MESSAGE = 'No artist or band found';
const MY_FAVORITES_KEY = 'my_Favorites_events';
const NO_FAVORITES_MESSAGE= "No Favorites Yet";

const Home = () => {
  const [artist, setArtist] = useState(null);
  const [events, setEvents] = useState(null);
  const [isShowNotFoundMessage, setIsShowNotFoundMessage] = useState(false);
  const [favoritesEvents, setFavoritesEvents] = useState([]);

  useEffect(() => {
    const favorites = loadFromStorage(MY_FAVORITES_KEY) || [];
    setFavoritesEvents(favorites);
  },[]);

  const onSearch = useCallback((term) => {
      get(term)
        .then(res => {
          if (res.data && res.data.id) {
            setArtist(res.data);
            setIsShowNotFoundMessage(false);
            get(`${term}/events`)
              .then(res => {
                if (res.data && res.data.length > 0) {
                  setEvents(res.data);
                } else {
                  setEvents(null);
                }
              })
              .catch(error => console.log(error));
          } else {
            setIsShowNotFoundMessage(true);
            setArtist(null);
            setEvents(null);
          }
        })
        .catch(error => console.log(error));
    },[]);

    return (
      <Wrapper>
        <BlockWrappers style={{ flex: 0.9, minHeight: '90%'}}>
          <h1>Who’s In Town</h1>
          <Message>search for an artist:</Message>
          <SearchInputWithButton name="home-search-input" onSearch={ onSearch }/>
          { artist &&
              <>
                <Message>Results for: {artist.name}</Message>
                <Artist artist={artist}/>
                { events && <div>
                  {events.map(event => (<EventCard  key={event.id} event={event}/>))}
                </div>
                }
              </>
          }
          { isShowNotFoundMessage &&
            <Message>{NOT_FOUND_MESSAGE}</Message>
          }
        </BlockWrappers>
        <BlockWrappers>
          <h3>My Favorites Events <FavoriteBorderIcon/></h3>
          { favoritesEvents.length > 0 ?
          <div>
            {favoritesEvents.map(event => (<EventCard  key={event.id} event={event}/>))}
          </div>
            : <Message>{NO_FAVORITES_MESSAGE}</Message>
          }
        </BlockWrappers>
      </Wrapper>
    );
};

export default Home;