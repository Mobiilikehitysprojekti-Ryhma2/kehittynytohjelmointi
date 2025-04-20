import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Circle, G, Line, Svg, Text as SvgText } from 'react-native-svg';
import * as scale from 'd3-scale';

// Data: Suurimmat maat väkiluvultaan ja niiden pinta-ala
const data = [
  { country: 'India', population: 1463865525, area: 2973190 },
  { country: 'China', population: 1416096094, area: 9388211 },
  { country: 'United States', population: 347275807, area: 9147420 },
  { country: 'Indonesia', population: 285721236, area: 1811570 },
  { country: 'Pakistan', population: 255219554, area: 770880 },
  { country: 'Nigeria', population: 237527782, area: 910770 },
  { country: 'Brazil', population: 212812405, area: 8358140 },
  { country: 'Bangladesh', population: 175686899, area: 130170 },
  { country: 'Russia', population: 143997393, area: 16376870 },
  { country: 'Ethiopia', population: 135472051, area: 1000000 },
];

// Kaavion mitat
const chartWidth = 370;
const chartHeight = 320;

// Skaalat
const maxArea = Math.max(...data.map(d => d.area));
const maxPopulation = Math.max(...data.map(d => d.population));

const xScale = scale.scaleLinear()
  .domain([0, maxArea])
  .range([60, chartWidth - 20]);

const yScale = scale.scaleLinear()
  .domain([0, maxPopulation])
  .range([chartHeight - 30, 20]);

const xTicks = [0, 5000000, 10000000, 15000000];
const yTicks = [0, 500000000, 1000000000, 1500000000];

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hajakuvaaja: Maan koko ja väkiluku</Text>
      <Svg height={chartHeight} width={chartWidth}>
        <G>
          {/* Y-akseli */}
          <Line x1="60" y1="10" x2="60" y2={chartHeight - 30} stroke="black" />

          {/* Y-akselin arvot */}
          {yTicks.map((tick, index) => {
            const y = yScale(tick);
            return (
              <G key={`y-${index}`}>
                <Line x1="55" y1={y} x2="60" y2={y} stroke="black" />
                <SvgText
                  x="50"
                  y={y + 4}
                  fontSize="10"
                  fill="black"
                  textAnchor="end"
                >
                  {tick / 1_000_000}M
                </SvgText>
              </G>
            );
          })}

          {/* X-akseli */}
          <Line x1="60" y1={chartHeight - 30} x2={chartWidth - 20} y2={chartHeight - 30} stroke="black" />

          {/* X-akselin arvot */}
          {xTicks.map((tick, index) => {
            const x = xScale(tick);
            return (
              <G key={`x-${index}`}>
                <Line x1={x} y1={chartHeight - 30} x2={x} y2={chartHeight - 25} stroke="black" />
                <SvgText
                  x={x}
                  y={chartHeight - 10}
                  fontSize="10"
                  fill="black"
                  textAnchor="middle"
                >
                  {tick / 1_000_000}M
                </SvgText>
              </G>
            );
          })}

          {/* Pisteet ja maiden nimet */}
          {data.map((item, index) => {
            const cx = xScale(item.area);
            const cy = yScale(item.population);
            return (
              <G key={item.country}>
                <Circle cx={cx} cy={cy} r="5" fill="dodgerblue" />
                <SvgText
                  x={cx}
                  y={cy - 10}
                  fontSize="10"
                  fill="black"
                  textAnchor="middle"
                >
                  {item.country}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
