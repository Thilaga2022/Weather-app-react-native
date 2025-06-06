import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getTodayWeather } from '../../utils/api'; 

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function ActivitiesScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    Keyboard.dismiss();

    try {
      const data = await getTodayWeather(city.trim());
      setWeather(data);
      setCity('');
    } catch (err) {
      setWeather(null);
      setError('City not found or API error');
    } finally {
      setLoading(false);
    }
  };

  const getActivitySuggestions = () => {
    if (!weather) return [];

    const mainWeather = weather.weather[0].main.toLowerCase();
    const temp = weather.main.temp;

    let suggestions: { text: string; emoji: string }[] = [];

    if (mainWeather.includes('rain')) {
      suggestions = [
        { text: 'Read a book', emoji: '📖' },
        { text: 'Watch a movie', emoji: '🎬' },
        { text: 'Try indoor yoga', emoji: '🧘‍♀️' },
        { text: 'Bake something new', emoji: '🧁' },
        { text: 'Do a puzzle', emoji: '🧩' },
      ];
    } else if (mainWeather.includes('clear')) {
      suggestions =
        temp > 25
          ? [
              { text: 'Go for a swim', emoji: '🏊‍♂️' },
              { text: 'Have a picnic', emoji: '🧺' },
              { text: 'Take a bike ride', emoji: '🚴‍♀️' },
              { text: 'Visit a garden', emoji: '🌸' },
              { text: 'Try outdoor painting', emoji: '🎨' },
            ]
          : [
              { text: 'Go for a walk', emoji: '🚶‍♂️' },
              { text: 'Visit a park', emoji: '🏞️' },
              { text: 'Take photos outside', emoji: '📷' },
              { text: 'Do a sketch outdoors', emoji: '✏️' },
              { text: 'Try a nature scavenger hunt', emoji: '🔍' },
            ];
    } else if (mainWeather.includes('cloud')) {
      suggestions = [
        { text: 'Visit a museum', emoji: '🏛️' },
        { text: 'Go to a cafe', emoji: '☕' },
        { text: 'Do indoor workout', emoji: '🏋️‍♀️' },
        { text: 'Journal your thoughts', emoji: '📓' },
        { text: 'Visit a bookstore', emoji: '📚' },
      ];
    } else if (temp < 10) {
      suggestions = [
        { text: 'Drink hot chocolate', emoji: '🍫' },
        { text: 'Visit a cozy cafe', emoji: '☕' },
        { text: 'Watch a movie at home', emoji: '📺' },
        { text: 'Knit or crochet', emoji: '🧶' },
        { text: 'Read in bed', emoji: '🛏️' },
      ];
    } else {
      suggestions = [
        { text: 'Explore local attractions', emoji: '🗺️' },
        { text: 'Try new recipes at home', emoji: '👩‍🍳' },
        { text: 'Read a book', emoji: '📖' },
        { text: 'Do a DIY project', emoji: '🛠️' },
        { text: 'Call a friend', emoji: '📞' },
      ];
    }

    const randomCount = Math.floor(Math.random() * 3) + 2; // 2 to 4
    return shuffleArray(suggestions).slice(0, randomCount);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Find Activities Based on Weather</Text>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="city" size={24} color="#0288d1" />
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Enter city"
          style={styles.input}
          placeholderTextColor="#555"
          returnKeyType="done"
          onSubmitEditing={fetchWeather}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchWeather} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Get Activities</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0288d1" style={{ marginTop: 20 }} />}

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {weather && !loading && (
        <View style={styles.result}>
          <Text style={styles.city}>Weather in {weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>

          <View style={styles.separator} />

          <Text style={styles.activitiesTitle}>Suggested Activities:</Text>
          {getActivitySuggestions().map((activity, idx) => (
            <View key={idx} style={styles.activityItem}>
              <MaterialCommunityIcons name="check-circle-outline" size={20} color="#0288d1" />
              <Text style={styles.activityText}>
                {activity.emoji} {activity.text}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#e3f2fd',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#01579b',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#0288d1',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#01579b',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#0288d1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#01579b',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 6,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  result: {
    backgroundColor: '#bbdefb',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#01579b',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  city: {
    fontSize: 26,
    fontWeight: '700',
    color: '#01579b',
    marginBottom: 5,
  },
  temp: {
    fontSize: 54,
    fontWeight: '300',
    color: '#0288d1',
    marginBottom: 5,
  },
  desc: {
    fontSize: 20,
    color: '#01579b',
    textTransform: 'capitalize',
    marginBottom: 15,
  },
  separator: {
    borderBottomColor: '#0288d1',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  activitiesTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#01579b',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  activityText: {
    fontSize: 16,
    color: '#01579b',
    marginLeft: 8,
  },
});
