import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '300px',
  height: '300px'
};

const MapContainer = (props) => {
  const locations = props.locations.stores;
  // @todo Should calculate initialCenter base on all points
  const initialCenter = { lat: locations[0].latitude, lng: locations[0].longitude};

  const displayMarkers = () => {
    return locations.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
      }}
        />
    })
  };

  return (
    <Map
      google={props.google}
      zoom={8}
      style={mapStyles}
      initialCenter={initialCenter}
    >
      {displayMarkers()}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyArwZLwu8qpwO8J1vkedj-qYnK7mdLmhYE'
})(MapContainer);