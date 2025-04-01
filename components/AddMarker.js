import React from "react";
import { Marker } from "react-native-maps";

export default function AddMarker(props) {
  return (
    <Marker
      title={props.title}
      coordinate={{ latitude: props.latitude, longitude: props.longitude }}
    />
  );
}
