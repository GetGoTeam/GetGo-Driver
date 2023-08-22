import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination } from "../../../slices/navSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import React, { useEffect, useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import { colors } from "../../utils/colors";

const GoogleMap = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef();
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.005,
  });

  // console.log(origin);
  const handleRegionChange = newRegion => {
    setCurrentRegion(newRegion);
  };

  useEffect(() => {
    if (origin) {
      setCurrentRegion({
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
      });

      if (destination)
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });

      console.log(destination);
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
      {origin && destination && (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
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
