import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import MapView, { Camera } from 'react-native-maps';
import * as Location from 'expo-location';
import {Marker} from 'react-native-maps';

const mapscreen = () => { 

    const mapViewRef = useRef(null);


    const [location, setLocation] = useState({
        latitude: 65.0100,
        longitude: 65.0100,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      
      useEffect(() => {
      (async() =>{
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
      
         
          if (mapViewRef.current) {
            mapViewRef.current.setCamera(
              {
                center: { latitude: position.coords.latitude, longitude: position.coords.longitude },
                pitch: 30, 
            zoom: 15,
              },
            );
          }
        } catch (error) {
          console.log(error);
        }
      };
      
    }
return (
    <SafeAreaView>
<MapView
        style={styles.map}
        mapType="standard"
        camera={{
          center: {
            latitude: 29.978,
            longitude: 31.131,
          },
          pitch: 0, 
          heading: 0,
          zoom: 15, 
        }}
      />

</SafeAreaView>




)
export default mapscreen;