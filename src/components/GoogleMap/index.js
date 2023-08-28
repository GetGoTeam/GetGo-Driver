import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination } from "../../../slices/navSlice";
import { GOONG_MAPS_APIKEY } from "@env";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../utils/colors";
import axios from "axios";
import { decode } from "@googlemaps/polyline-codec";

const GoogleMap = props => {
  const [directionsData, setDirectionsData] = useState(null);

  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  // const [destination, setDestination] = useState({
  //   latitude: 10.8231,
  //   longitude: 106.6297,
  // });
  const mapRef = useRef();
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.005,
  });

  const handleFitMakers = () => {
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  };

  useEffect(() => {
    if (origin) {
      setCurrentRegion({
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
      });

      if (destination) {
        axios
          .get(
            `https://rsapi.goong.io/Direction?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&vehicle=car&api_key=${GOONG_MAPS_APIKEY}`
          )
          .then(response => {
            const polyline = decode(
              response.data.routes[0].overview_polyline.points
            ).map(point => {
              return {
                latitude: point[0],
                longitude: point[1],
              };
            });
            setDirectionsData(polyline);
            handleFitMakers();

            console.log(polyline);
          })
          .catch(error => {
            console.error("Error fetching directions:", error);
          });
      }
    }
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1, zIndex: 0 }}
      mapType="mutedStandard"
      region={currentRegion}
      initialRegion={currentRegion}
      // onRegionChange={handleRegionChange}
    >
      {origin && destination && directionsData && (
        <Polyline
          coordinates={directionsData}
          strokeWidth={4}
          strokeColor={colors.primary_300}
        />
      )}
      {origin && (
        <Marker title="Điểm đón" coordinate={origin} identifier="origin" />
      )}
      {destination && (
        <Marker
          title="Điểm đến"
          coordinate={destination}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default GoogleMap;
