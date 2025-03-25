import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { BarChart } from "react-native-gifted-charts";

const Chartscreen = () => { 

    
    const App = () => {

        const barData = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];
    
        return <BarChart data={barData}/>;
    
    };
    
      
   
return (
    <SafeAreaView>


</SafeAreaView>




)
}
export default Chartscreen;