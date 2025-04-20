import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Eratostheneen siivilä alkulukujen löytämiseksi
function sieveOfEratosthenes(limit) {
  const primes = Array(limit + 1).fill(true);
  primes[0] = primes[1] = false;
  for (let i = 2; i * i <= limit; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= limit; j += i) {
        primes[j] = false;
      }
    }
  }
  return primes.map((isPrime, index) => isPrime ? index : null).filter(Boolean);
}

// Stem and Leaf -kuvaajan generoiminen
function generateStemAndLeaf(primes) {
  const stems = {};

  primes.forEach((prime) => {
    const stem = Math.floor(prime / 10); // Kymmenet
    const leaf = prime % 10; // Ykköset
    if (!stems[stem]) stems[stem] = [];
    stems[stem].push(leaf);
  });

  return stems;
}

// Stem and Leaf -kuvaajan komponentti
export default function App() {
  const primes = sieveOfEratosthenes(100); // Alkuluvut 1-100
  const stemAndLeaf = generateStemAndLeaf(primes);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stem and Leaf -kuvaaja (Alkuluvut 1-100)</Text>
      {Object.keys(stemAndLeaf).map((stem) => (
        <View key={stem} style={styles.row}>
          <Text style={styles.stem}>{stem} |</Text>
          <Text style={styles.leaves}>
            {stemAndLeaf[stem].join(' ')}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  stem: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 40,
  },
  leaves: {
    fontSize: 16,
    color: '#333',
  },
});
