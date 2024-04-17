"use client"

import { Map } from 'react-map-gl';

import React from 'react'

const MapBox = () => {
  return (
    <>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiZm9sYXV0dGh5IiwiYSI6ImNsdDR1dThsdTA1a3Qya28zMHcwMmJkaXQifQ.2yquGvEAuNSA1vp2NS81Ig"
        initialViewState={{
          longitude: -122.4376,
          latitude: 47.7577,
          zoom: 8
        }}
        style={{
          width: '97%',
          height: '100%',
          borderRadius: 10
        }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      >
      </Map>
    </>
  )
}

export default MapBox