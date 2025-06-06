import axios from 'axios';

const API_KEY = 'f75d4172587239cd962c4c6a4c2ef1fb';  
const CITY = '';          

export const getTodayWeather = async (city: string) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

