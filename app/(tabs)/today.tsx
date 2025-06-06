
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // for city icon

import { getTodayWeather } from '../../utils/api';

export default function TodayScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
  if (!city.trim()) {
    setError('Enter a valid city name');  // Set error for empty input
    setWeather(null);                      // Clear previous weather if any
    return;                               // Stop further execution
  }

  setLoading(true);
  setError('');  // Clear previous errors when starting fetch
  Keyboard.dismiss();

  try {
    const data = await getTodayWeather(city.trim());
    setWeather(data);
    setCity(''); // Clear input after success
  } catch (err) {
    setWeather(null);
    setError('City not found or API error');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Today's Weather</Text>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="city" size={24} color="#00796b" />
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Enter city name"
          style={styles.input}
          placeholderTextColor="#666"
          returnKeyType="done"
          onSubmitEditing={fetchWeather}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchWeather} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#00796b" style={{ marginTop: 20 }} />}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {weather && !loading && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#e0f2f1',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004d40',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#004d40',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  result: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#b2dfdb',
    paddingVertical: 30,
    borderRadius: 12,
    shadowColor: '#004d40',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 7,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004d40',
  },
  temp: {
    fontSize: 64,
    fontWeight: '300',
    color: '#00796b',
  },
  desc: {
    fontSize: 20,
    color: '#004d40',
    textTransform: 'capitalize',
    marginTop: 8,
  },
});