import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";

import styles from "./Map.module.css";
import { useCities } from "../contexts/CityContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";

function Map() {
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { cities } = useCities();

  const {
    position: isLoadingPosition,
    isLoading: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  // if (isLoadingPosition) {
  //   console.log("this is if block causes too many re-renders so use-effect");
  //   console.log(isLoadingPosition);
  //   setMapPosition([isLoadingPosition.lat, isLoadingPosition.lng]);
  // }
  useEffect(() => {
    if (isLoadingPosition)
      setMapPosition([isLoadingPosition.lat, isLoadingPosition.lng]);
  }, [isLoadingPosition]);

  console.log(isLoadingPosition);

  return (
    <div className={styles.mapContainer}>
      {!isLoadingPosition && (
        <Button type="position" onClick={getPosition}>
          {geolocationPosition ? "LOADING..." : "USE YOUR POSITION"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={TextTrackCueList}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.cityName} {city.emoji}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />;
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
