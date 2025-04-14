
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaProvider } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import MainAppBar from "../components/MainAppBar";
import SettingsModal from "../components/SettingsModal";
import { getDistance } from "geolib";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  firestore,
  deleteDoc, addDoc, serverTimestamp, collection

} from "../firebase/Config";
import { Button } from "react-native-paper";
import RouteInputModal from "../components/RouteInputModal";

const MapScreen = ({ navigation }) => {
  const [routeModalVisible, setRouteModalVisible] = useState(false);
  const [newMarkerCoords, setNewMarkerCoords] = useState(null);
  const URL =
    "https//api.open-meteo.com/v1/forecast?latitude=65.01&longitude=65.01&hourly=temperature_2m,weather_code&forecast_days=1";

  //https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=65.01&hourly=temperature_2m,weather_code&forecast_days=1
  //säätiedot tuolta
  const [camera, setCamera] = useState("");
  const [distance, setDistance] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapType, setMapType] = useState("hybrid");

  const [location, setLocation] = useState({
    latitude: 65.01,
    longitude: 25.4723,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      await getUserPosition();
    })();
  }, []);

  const getUserPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({
        ...location,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      setCamera({
        ...camera,
        pitch: 90,
        heading: 0,
        zoom: 10,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* const fetchweather = async () => {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const json = await response.json();
        const weather = json.contents.weather[0].weather;
        console.log(weather);
      } else {
        console.log(weather);
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  const addNewMarker = (e) => {

    const coords = e.nativeEvent.coordinate;
    const id = uuid.v4();
    setMarkers([
      ...markers,
      { id: id, latitude: coords.latitude, longitude: coords.longitude },
    ]);
  };

  const handleSaveMarker = ({ name, difficulty }) => {
    if (difficulty === null) {
   
      alert("Please select a difficulty level before placing markers.");
      return;
    }
    const id = uuid.v4();
    const { latitude, longitude } = newMarkerCoords;

    const newMarker = {
      id,
      latitude,
      longitude,
      difficulty, 
    };

    setMarkers([...markers, newMarker]); 
    setRouteModalVisible(false); 
  };

  const removeThisMarker = (id) => {
    setMarkers(markers.filter((marker) => marker.id !== id));
    if (markers.length <= 1) {
      setDistance(0)
    }
  };



  const sendMarkersToFirebase = async (routeDetails) => {
    try {
      const { name, difficulty } = routeDetails;
      const routeData = {
        id: uuid.v4(),
        name,
        difficulty,
        markers: markers.map(({ latitude, longitude }) => ({ latitude, longitude })),
        createdAt: new Date().toISOString(),
      };
  
      const routesRef = collection(firestore, "routes");
      await addDoc(routesRef, routeData);
  
      setMarkers([]);
      setDistance(0);
    } catch (error) {
      console.error("Error reitti", error);
    }
  };















  const calculateDistance = () => {
    if (markers.length > 0) {
      const userLocation = { latitude: location.latitude, longitude: location.longitude };

      let totalDistance = 0;

      let firstDistance = false;
      let nextMarker;
      let prevMarker;
      markers.forEach((marker) => {
        if (!firstDistance) {
          if (marker.latitude && marker.longitude) {
            totalDistance += getDistance(userLocation, {
              latitude: marker.latitude,
              longitude: marker.longitude,
            });

            prevMarker = marker;
            firstDistance = true;
          } else {
            console.log("error", markers);
          }
        } else {
          if (marker.latitude && marker.longitude) {
            totalDistance += getDistance(marker, prevMarker);
            prevMarker = marker;
          }
        }
      });

      setDistance(totalDistance / 1000);
      
    }
  };

  useEffect(() => {
    calculateDistance();
  }, [markers, location]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          mapType={mapType}
          onLongPress={addNewMarker}
          camera={{
            center: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            pitch: 90,
            heading: 0,
            zoom: 15,
          }}
          showsUserLocation={true}
          followUserLocation={true}
          showsCompass={false}
          showsBuildings={true}
          pitchEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Oma sijainti"

            opacity={0}
          />
          {markers &&
            markers.map((item, index) => (
              <Marker
                key={item.id}
                title={"Marker " + index}
                description={`Difficulty: ${item.difficulty}`}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                onPress={() => removeThisMarker(item.id)}
              />
            ))}

          {markers.length > 0 && (
            <Polyline
              coordinates={[
                { latitude: location.latitude, longitude: location.longitude },
                ...markers.map((marker) => ({
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                })),
              ]}
              strokeColor="red"
              strokeWidth={6}
            />
          )}
         
        </MapView>
        <Button title="Finish Route" onPress={() => setRouteModalVisible(true)} />
       
        <SettingsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setMapType={setMapType}
          currentMapType={mapType}
        />
       
<RouteInputModal
  visible={routeModalVisible}
  onSave={(details) => {
    sendMarkersToFirebase(details);
    setRouteModalVisible(false);
  }}
  onCancel={() => setRouteModalVisible(false)}
  modalTitle="Create New Route"
  modalBackgroundColor="blue"
/>

        <MainAppBar setMarkers={setMarkers} setModalVisible={setModalVisible} setDistance={setDistance} distance={distance}/>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
 
});
export default MapScreen;