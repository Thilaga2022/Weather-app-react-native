# 🌤️ Weather Activities App

A fun and simple React Native app built with Expo that lets users:
- View today’s weather by city
- Get activity suggestions based on weather
- Navigate using a bottom tab bar (Home / Today / Activities)

> Built as a part of a frontend assessment.

---

## 📱 Features

-  Search for current weather by city
-  Get weather-based activity suggestions (e.g., rainy day = indoor reading!)
-  Clean, responsive UI with icons and haptic tabs
-  Navigation with a tab-based layout (Home | Today | Activities)


---

## ⚙️ Tech Stack

- **React Native** with **Expo**
- **TypeScript**
- **React Navigation**
- **OpenWeatherMap API**
- **expo-router**
- **Styled using React Native’s StyleSheet API**

---

## 📁 Folder Structure

/WeatherActivitiesApp
│
├── app/
│ ├── (tabs)/
│ │ ├── home.tsx # Home screen (welcome)
│ │ ├── today.tsx # Weather search & result
│ │ └── activities.tsx # Activity suggestions
│ └── _layout.tsx # Tabs layout entry
│
├── components/
│ ├── HapticTab.tsx # Custom tab with haptic feedback
│ └── ui/
│ ├── IconSymbol.tsx # Tab icons
│ └── TabBarBackground.tsx # Tab bar blur background
│
├── constants/
│ └── Colors.ts # Light/Dark color schemes
│
├── hooks/
│ └── useColorScheme.ts # Detect system theme
│
├── utils/
│ └── api.ts # OpenWeatherMap API call
│
├── App.tsx # Stack navigation entry (for non-tab screens)
├── package.json
└── README.md # Project info



---

##  Getting Started

### Prerequisites
- Node.js ≥ 16
- Expo CLI: `npm install -g expo-cli`

### 1. Clone the repo

```bash
git clone https://github.com/Thilaga2022/Weather-app-react-native.git
cd WeatherActivitiesApp
### 2.Install Dependencies*
npm install
3. Run the app
npm expo start
Scan the QR using the Expo Go app or run on an emulator.
