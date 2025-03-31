import { useEffect, useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, Image } from 'react-native';
import MapView, { Camera } from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps'
import { FAB, RadioButton } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import uuid from "react-native-uuid"
import MainAppBar from './components/MainAppBar';
import SettingsModal from './components/SettingsModal';


export default function App() {
  const URL = 'https//api.open-meteo.com/v1/forecast?latitude=65.01&longitude=65.01&hourly=temperature_2m,weather_code&forecast_days=1'

  //https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=65.01&hourly=temperature_2m,weather_code&forecast_days=1
  //säätiedot tuolta
  const [camera, setCamera] = useState('')

  const [markers, setMarkers] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [mapType, setMapType] = useState("hybrid")

  const [location, setLocation] = useState({
    latitude: 65.0100,
    longitude: 65.0100,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })


  useEffect(() => {

    (async () => {
      getUserPosition()
    })()

  }, [])

  const getUserPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status !== 'granted') {
        console.log('Permission denied');
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

      })

    } catch (error) {
      console.log(error);
    }
  };

  const fetchweather = async () => {
    try {
      const response = await fetch(URL)
      if (response.ok) {
        const json = await response.json()
        const weather = json.contents.weather[0].weather
        console.log(weather)
      } else {
        console.log(weather)
      }
    } catch (error) {
      console.log(error)
    }


  }

  const addNewMarker = (e) => {
    const coords = e.nativeEvent.coordinate
    const id = uuid.v4()
    setMarkers([...markers, { id: id, latitude: coords.latitude, longitude: coords.longitude }])
  }

  const removeThisMarker = (id) => {
    setMarkers(markers.filter(marker => marker.id !== id));
  }

  return (
    <SafeAreaProvider>
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
          <Marker coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
            title="Oma sijainti"
          >
            <Image source={require('./marker.png')} style={{ height: 40, width: 40 }} />

          </Marker>
          {markers && markers.map((item, index) =>
            <Marker
              key={item.id}
              title={"Marker " + index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
              onPress={() => removeThisMarker(item.id)}
            />)}


        </MapView>
          <SettingsModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setMapType={setMapType} 
            currentMapType={mapType}
            />

        <MainAppBar setMarkers={setMarkers} setModalVisible={setModalVisible} />

      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, map: {
    height: '100%',
    width: '100%'
  }, fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    margin: 16
  }
});
