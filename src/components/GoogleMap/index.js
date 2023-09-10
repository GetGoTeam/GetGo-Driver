import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useSelector } from "react-redux";
import {
  selectOrigin,
  selectDestination,
  selectTripDetails,
} from "~/slices/navSlice";
import { GOONG_MAPS_APIKEY } from "@env";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../utils/colors";
import axios from "axios";
import { decode } from "@googlemaps/polyline-codec";
import Loading from "../Loading";

const GoogleMap = props => {
  const { resetSupplied } = props;

  const [directionsData, setDirectionsData] = useState(null);

  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const tripDetails = useSelector(selectTripDetails);

  const [isLoading, setIsLoading] = useState(false);

  const mapRef = useRef();
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.005,
  });

  const handleFitMakersOrigin = () => {
    mapRef.current.fitToSuppliedMarkers(["origin"], {
      edgePadding: { top: 0, right: 0, bottom: 0, left: 0 },
    });
  };

  const handleFitMakers = () => {
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  };

  useEffect(() => {
    // console.log(origin, destination);
    if (origin) {
      setCurrentRegion({
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.005,
      });
    }
    handleFitMakers();
  }, [origin]);

  useEffect(() => {
    // console.log(destination);
    if (destination) {
      (async () => {
        setIsLoading(true);
        await axios
          .get(
            `https://rsapi.goong.io/Direction?origin=${origin.latitude},${
              origin.longitude
            }&destination=${destination.latitude},${
              destination.longitude
            }&vehicle=${
              tripDetails.vehicleType > 1 ? "car" : "bike"
            }&api_key=${GOONG_MAPS_APIKEY}`
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
            setDirectionsData([
              { latitude: origin.latitude, longitude: origin.longitude },
              ...polyline,
            ]);

            handleFitMakers();

            // console.log(polyline);
          })
          .catch(error => {
            console.error("Error fetching directions:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })();
    }
  }, [destination]);

  useEffect(() => {
    handleFitMakersOrigin();
  }, [resetSupplied]);
  return (
    <>
      {isLoading && <Loading loading={isLoading} />}
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
          <Marker
            title={origin.address}
            coordinate={origin}
            identifier="origin"
          />
        )}
        {destination && (
          <Marker
            title={destination.address}
            coordinate={destination}
            identifier="destination"
          />
        )}
      </MapView>
    </>
  );
};

export default GoogleMap;
