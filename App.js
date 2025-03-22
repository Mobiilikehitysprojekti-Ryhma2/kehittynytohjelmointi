import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { PieChart } from "react-native-gifted-charts";
import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {

 /*
 useEffect(() => {

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync(); 
    };
  }, []);
      

*/  
      const data = [{value: 22315474, color: '#177AD5', text: '1'},

        {value: 11716620, color: '#79D2DE', text: '2'},

        {value: 11090314, color: '#ED6665', text: '3'},

        {value: 11071424, color: 'yellow', text: '4'},

        {value: 10358381, color: 'green', text: '5'},

        {value: 9785388, color: 'pink', text: '6'},

        {value: 8000000, color: 'teal', text: '7'},

        {value: 7457600, color: 'grey', text: '8'},

        {value: 7415590, color: 'white', text: '9'},

        {value: 7165292, color: 'purple', text: '10'}];
  



  return (
    <View style={styles.container}>
      <PieChart data={data}
      showText
      textColor="black"
      />
      <FlatList
        data={[
          {key: '1.Shanghai'},
          {key: '2.Beijing'},
          {key: '3.Tianjin'},
          {key: '4.Guangzhou'},
          {key: '5.Shenzhen'},
          {key: '6.Wuhan'},
          {key: '7.Dongguan'},
          {key: '8.Chongqing'},
          {key: '9.changdu'},
          {key: '10.Nanjing'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
