import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native';
import { Svg, Text as SvgText, Line } from 'react-native-svg';
import * as scale from 'd3-scale';

// Hedelmäkuvat
const images = {
  apple: require('./assets/apple.png'),
  banana: require('./assets/banana.png'),
  grape: require('./assets/grape.png'),
  orange: require('./assets/orange.png'),
  strawberry: require('./assets/strawberry.png'),
};

// Data: sokeri ja kuitu
const data = [
  { name: 'Omena', sugar: 10, fiber: 2.1, image: 'apple' },
  { name: 'Banaani', sugar: 12, fiber: 2.6, image: 'banana' },
  { name: 'Rypäle', sugar: 16, fiber: 0.9, image: 'grape' },
  { name: 'Appelsiini', sugar: 9, fiber: 2.4, image: 'orange' },
  { name: 'Mansikka', sugar: 4.9, fiber: 2.0, image: 'strawberry' },
];

// Määritellään näytön leveys
const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 40;
const chartHeight = 300;
const margin = 40;

const maxSugar = Math.ceil(Math.max(...data.map(d => d.sugar)) + 2);
const maxFiber = Math.ceil(Math.max(...data.map(d => d.fiber)) + 1);

const xScale = scale.scaleLinear().domain([0, maxSugar]).range([margin, chartWidth - margin]);
const yScale = scale.scaleLinear().domain([0, maxFiber]).range([chartHeight - margin, margin]);

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Hedelmiä: Sokeri ja Kuitu</Text>

      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* X- ja Y-akseli */}
          <Line x1={margin} y1={chartHeight - margin} x2={chartWidth - margin} y2={chartHeight - margin} stroke="black" />
          <Line x1={margin} y1={margin} x2={margin} y2={chartHeight - margin} stroke="black" />

          {/* Akselin nimet */}
          <SvgText x={chartWidth / 2} y={chartHeight - 5} textAnchor="middle" fontSize="12">Sokeri (g / 100g)</SvgText>
          <SvgText
          x={margin - 30}
          y={chartHeight / 2}
          fontSize="12"
          textAnchor="middle"
          transform={`rotate(-90, ${margin - 30}, ${chartHeight / 2})`}
          >Kuitu (g / 100g)
          </SvgText>


          {/* Akselin numerot */}
          {[0, 5, 10, 15].map(v => (
            <SvgText key={`x-${v}`} x={xScale(v)} y={chartHeight - margin + 15} fontSize="10" textAnchor="middle">{v}</SvgText>
          ))}
          {[0, 1, 2, 3, 4].map(v => (
            <SvgText key={`y-${v}`} x={margin - 10} y={yScale(v) + 4} fontSize="10" textAnchor="end">{v}</SvgText>
          ))}
        </Svg>

        {/* Kuvadatat */}
        {data.map((item, index) => {
          const x = xScale(item.sugar);
          const y = yScale(item.fiber);
          return (
            <Image
              key={index}
              source={images[item.image]}
              style={{
                position: 'absolute',
                left: x - 12,
                top: y - 12,
                width: 24,
                height: 24,
              }}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 320,
  },
});
