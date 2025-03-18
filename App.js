import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function App() {
//const [barData] = useState([''])
 // useEffect(() => {  
  //  getBarData()  
    //}, [])
   // const getBarData = async () => {
    //}
    useEffect(() => {
 
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      return () => {
        ScreenOrientation.unlockAsync(); 
      };
    }, []);


    const barData = [

      {value: 22315474, label: 'Shanghai',

        spacing: 30,

        labelWidth: 30},

      {value: 11716620, label: 'Beijing',

        spacing: 30,

        labelWidth: 30},

      {value: 11090314, label: 'Tianjin',

        spacing: 35,

        labelWidth: 30},

      {value: 11071424, label: 'Guangzhou',

        spacing: 50,

        labelWidth: 30},

      {value: 10358381, label: 'Shenzhen',

        spacing: 30,

        labelWidth: 30},

      {value: 9785388, label: 'Wuhan',

        spacing: 30,

        labelWidth: 30},
    
      {value: 8000000, label: 'Dongguan',

        spacing: 45,

        labelWidth: 30},
    
      {value: 7457600, label: 'Chongqing',

        spacing: 45,

        labelWidth: 30},

      {value: 7415590, label: 'Chengdu',

        spacing: 30,

        labelWidth: 30},

      {value: 7165292, label: 'Nanjing',

        spacing: 30,

        labelWidth: 30},
    ];

  return (
    <View style={styles.container}>
      <BarChart

frontColor={'#177AD5'}

barWidth={22}

data={barData}

/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
