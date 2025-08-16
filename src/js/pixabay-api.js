import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://pixabay.com/api/',
  headers: {},
  params: {
    key: '51716967-7d1f105da1ec22b798b2084bf',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  },
});

export function getImagesByQuery(query) {
  return axios
    .get('', {
      params: {
        q: query,
      },
    })
    .then(res => res.data);
}
