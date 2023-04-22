import axios from 'axios';

const url =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlaces = async ({ neLat, neLng, swLat, swLng }) => {
  const options = {
    params: {
      bl_latitude: swLat,
      tr_latitude: neLat,
      bl_longitude: swLng,
      tr_longitude: neLng,
    },
    headers: {
      'X-RapidAPI-Key': 'X-RAPID-KEY',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.get(url, options);

    return response.data.data;
  } catch (err) {
    console.error(err.message);
  }
};
