import axios from 'axios';
export { fetchImages };

const API_KEY = '29966303-d9893c98832d118b1f4c04955';
const baseUrl = 'https://pixabay.com/api/';

const axios = require('axios').default;

async function fetchImages(searchImgName, page) {
  return await axios({
    method: 'get',
    url: `${baseUrl}`,
    params: {
      key: API_KEY,
      q: `${searchImgName}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: page,
    },
  });
}
