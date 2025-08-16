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

export async function getImagesByQuery(query, page) {
  const result = await axios.get('', {
    params: {
      per_page: 15,
      q: query,
      page: page,
    },
  });
  return result.data;
}
