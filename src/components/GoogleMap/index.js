import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { selectOrigin } from "../../../slices/navSlice";

import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

const GoogleMap = () => {
  const origin = useSelector(selectOrigin);
  const { location, setLocation } = useState({ longitude: 0, latitude: 0 });

  const getCurrentLocation = () => {
    if (Platform.OS === "android" && Platform.Version >= 23) {
      // Kiểm tra và yêu cầu quyền truy cập vị trí trên Android 6.0 trở lên
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Quyền truy cập vị trí đã được cấp
            Geolocation.getCurrentPosition(
              position => {
                setLocation({
                  longitude: position.coords.longitude,
                  latitude: position.coords.latitude,
                });
              },
              error => {
                console.log("Error:", error);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          } else {
            // Quyền truy cập vị trí bị từ chối
            console.log("Location permission denied");
          }
        })
        .catch(error => {
          console.log("Error:", error);
        });
    } else {
      // Trường hợp là iOS hoặc Android dưới 6.0
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        error => {
          console.log("Error:", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  return (
    <MapView
      style={{ flex: 1, zIndex: 0 }}
      mapType="mutedStandard"
      initialRegion={{
        latitude: 10.8231,
        longitude: 106.6297,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker
        coordinate={{
          latitude: 10.8231,
          longitude: 106.6297,
        }}
        title="Origin"
        description="description"
        identifier="origin"
      />
    </MapView>
  );
};

export default GoogleMap;
