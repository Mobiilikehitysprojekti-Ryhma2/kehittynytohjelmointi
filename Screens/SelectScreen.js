import React from "react";

import {
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
    StatusBar, Button, View
  } from "react-native";








const SelectScreen = ({ navigation }) => {








    return (

            <SafeAreaView style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Admin Tools</Text>
              </View>
              <Button
                onPress={() => navigation.navigate("Map")}
                title="Reittien luonti"
              />
            </SafeAreaView>
          );
        };
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center", 
      padding: 20, 
    },
    textContainer: {
      marginBottom: 20, 
    },
    title: {
      fontSize: 24, 
      fontWeight: "bold", 
      textAlign: "center",
    },
  });
    export default SelectScreen;