import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { getPlaces } from './api';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [bounds, setBounds] = useState({
    ne: { lat: 0, lng: 0 },
    sw: { lat: 0, lng: 0 },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
    );
  }, []);

  useEffect(
    () => {
      getPlaces({
        neLng: bounds.ne.lng,
        neLat: bounds.ne.lat,
        swLat: bounds.sw.lat,
        swLng: bounds.sw.lng,
      }).then((data) => {
        console.log('Data', data);
        setPlaces(data);
      });
    },
    [
      // coordinates.lat,
      // coordinates.lng,
      // bounds.ne.lat,
      // bounds.ne.lng,
      // bounds.sw.lat,
      // bounds.sw.lng,
    ],
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            key={coordinates.lat}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default App;
