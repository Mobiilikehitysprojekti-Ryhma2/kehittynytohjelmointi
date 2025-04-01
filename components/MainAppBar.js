import React from "react";
import { StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";

export default function MainAppBar(props) {

  const removeAllMarkers = () => {
    props.setMarkers([]);
    props.setDistance(0)
  };

  const toggleModal = () => {
    props.setModalVisible((prevState) => !prevState);
  };

  return (
    <Appbar.Header>
      <Appbar.Action icon={"map-marker-remove-outline"} onPress={removeAllMarkers} />
      <Appbar.Action icon={"cog"} onPress={toggleModal} />
      <Text style={styles.distanceMeter}>{props.distance.toFixed(2)} km</Text>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  distanceMeter: {
    position: "absolute",
    right: 20,
    fontWeight: 600,
    fontSize: 18,
  }
});

