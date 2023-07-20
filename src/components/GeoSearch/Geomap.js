import React, { useEffect, useRef } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import * as turf from '@turf/turf';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2hpcm9uNzE0IiwiYSI6ImNsanpmZ3hoNjBleGMzanJ1N2Y1bXhzZGIifQ.OR-gBqAUfi65wBtGakMUrQ';

const Geomap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/chiron714/cljzhj4xx007j01pe2zwr0a7k',
      center: [74.043902, 14.991053],
      zoom: 12,
      transition: {
        duration: 500,
      },
      attributionControl: false,
    });

    const marker = new Marker().setLngLat([74.043902, 14.991053]).addTo(map);

    // Create a circle feature using Turf.js
    const center = turf.point([74.043902, 14.991053]);
    const circle = turf.circle(center, 30, { units: 'kilometers' });

    map.on('load', () => {
      map.addSource('circle', {
        type: 'geojson',
        data: circle,
      });

      map.addLayer({
        id: 'circle',
        type: 'fill',
        source: 'circle',
        paint: {
          'fill-color': '#2196f3',
          'fill-opacity': 0.2,
        },
      });
    });

    // Clean up the map instance when the component is unmounted
    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const mapElement = mapContainer.current;

      if (isMobile) {
        mapElement.style.height = '30vh';
      } else {
        mapElement.style.height = '90vh';
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div
      ref={mapContainer}
      id="map"
      style={{
        width: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      }}
    />
  );
  
};

export default Geomap;
