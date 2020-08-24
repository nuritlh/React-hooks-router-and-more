import React, { useCallback, useEffect, useState } from 'react';
import { get } from '../services/api';
import styled from 'styled-components';
import SearchInputWithButton from './SearchInputWithButton/SearchInputWithButton';
import Artist from '../components/Artist';
import EventCard from './EventCard';
import { loadFromStorage } from '../services/utils';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;
`;

const Favorites = styled.div`
  background-color: #c8e8e5;
  padding: 10px;
  border-radius: 10px;
  height: fit-content;
  margin: 20px 0;
`;

const NOT_FOUND_MESSAGE = 'Could Not Found Artist';
const MY_FAVORITES_STORAGE = 'my_Favorites_events';

const Home = () => {
  const [artist, setArtist] = useState(null);
  const [events, setEvents] = useState(null);
  const [isShowNotFoundMessage, setIsShowNotFoundMessage] = useState(false);
  const [favoritesEvents, setFavoritesEvents] = useState([]);

  useEffect(() => {
    const favorites = loadFromStorage(MY_FAVORITES_STORAGE) || [];
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
                (res.data && res.data.length > 0) ? setEvents(res.data) : setEvents(null);
              })
              .catch(error => console.log(error));
          } else {
            setIsShowNotFoundMessage(true);
            setArtist(null)
          }
        })
        .catch(error => console.log(error));
    },[]);

    return (
      <Wrapper>
        <div>
          <h1>Who’s In Town</h1>
          <p>search for an artist:</p>
          <SearchInputWithButton name="home-search-input" onSearch={ onSearch }/>
          { artist &&
              <>
                <p>Results for: {artist.name}</p>
                <Artist artist={artist}/>
                { events && <div>
                  {events.map(event => (<EventCard  key={event.id} event={event}/>))}
                </div>
                }
              </>
          }
          { isShowNotFoundMessage &&
            <div>{NOT_FOUND_MESSAGE}</div>
          }
        </div>
        <Favorites>
          <h3>My Favorites Events</h3>
          { favoritesEvents && <div>
            {favoritesEvents.map(event => (<EventCard  key={event.id} event={event}/>))}
          </div>
          }
        </Favorites>
      </Wrapper>
    );
};

export default Home;