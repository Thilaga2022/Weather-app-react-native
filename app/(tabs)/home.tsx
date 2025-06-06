import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Welcome to WeatherApp!</Text>
      <Text style={styles.description}>
        Stay ahead of the weather and plan your day like a pro!  
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How to use the app</Text>
        <Text style={styles.instructions}>  
          📍 Tap the <Text style={styles.highlight}>"Today"</Text> tab to check the current weather in your city.  
          {"\n"}  
           
          🎯 Tap the <Text style={styles.highlight}>"Activities"</Text> tab for fun suggestions based on your city’s weather!  
        </Text>
      </View>

      <Text style={styles.footer}>Have a sunny day, rain or shine! ☀️🌧️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 30, 
    backgroundColor: '#e0f7fa', 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#00796b', 
    textAlign: 'center', 
    marginBottom: 15,
  },
  description: { 
    fontSize: 18, 
    color: '#004d40', 
    textAlign: 'center',
    marginBottom: 25,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#004d40',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00796b',
    marginBottom: 12,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#004d40',
    lineHeight: 26,
  },
  highlight: {
    fontWeight: '700',
    color: '#009688',
  },
  footer: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    fontWeight: '600',
    color: '#00796b',
  },
});
