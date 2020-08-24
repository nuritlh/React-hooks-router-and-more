import axios from 'axios';

const API_ID = '12345';
const baseUrl = 'https://rest.bandsintown.com/artists';

// get artist
// https://rest.bandsintown.com/artists/tom/?app_id=12345 url = 'tom'
// get artist's events
// https://rest.bandsintown.com/artists/tom/events/?app_id=12345 url = 'tom/events'

export const get = (url) => {
  const requestUrl = `${baseUrl}/${url}/?app_id=${API_ID}`;
  return axios.get(requestUrl, {
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error)
    });
};