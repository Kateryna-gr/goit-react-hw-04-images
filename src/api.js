import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const params = new URLSearchParams({
    key: '39252796-33dd54a02d1582f089eb20416',
    q: query,
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const resp = await axios.get(`?${params}`);
  return resp.data;
};
