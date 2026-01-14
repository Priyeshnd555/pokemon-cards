# PokéSwipe ⚡️

A professional-grade Pokémon discovery application built with **React Native** and **Expo**. This app demonstrates modern mobile development patterns, including persistent state management, high-performance animations, and robust API integration.

## 🚀 Key Features

- **Dynamic Discovery**: Interactive swiping mechanism to discover Pokémon from the national Pokédex.
- **Persistent Collection**: Save your favorite Pokémon to a local collection that persists across app restarts.
- **Premium UI/UX**: 
  - Smooth, spring-based physics using `react-native-reanimated`.
  - Haptic feedback for tactile interactions (`expo-haptics`).
  - Adaptive layout optimized for multiple screen sizes.
- **Advanced State Management**: Powered by **Zustand** with specialized persistence middleware.
- **Performance Optimized**:
  - In-memory API caching to minimize network overhead.
  - Parallel hydration logic for instantaneous startup.
  - Optimized image loading with `expo-image`.
- **Theming**: System-sycned Dark and Light mode support with manual overrides.

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54) / React Native
- **Language**: TypeScript
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Persistence**: [Async Storage](https://react-native-async-storage.github.io/async-storage/)
- **Animations**: [Reanimated 3](https://docs.swmansion.com/react-native-reanimated/)
- **API**: [PokéAPI](https://pokeapi.co/)

## 📂 Project Architecture

The codebase follows a modular, feature-based architecture designed for maintainability and scalability:

```bash
├── app/               # Expo Router file-based navigation (Tabs, Modals)
├── src/
│   ├── api/           # Service layer and PokéAPI client
│   ├── components/    # Atomic design components (Pokemon, UI)
│   ├── constants/     # Design system (Theme, Typography, Config)
│   ├── hooks/         # Shared custom logic
│   ├── store/         # Zustand global state and persistence logic
│   └── types/         # Strict TypeScript interfaces
└── assets/            # Static resources (Icons, Splash, Logos)
```

## ⌨️ Development Commands

This project uses standard Expo CLI commands for development and maintenance.

### Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run start
```

### Platform Specifics

```bash
# Run on Android
npm run android

# Run on iOS
npm run ios

# Run in Web browser
npm run web
```

### Quality & Maintenance

```bash
# Run ESLint check
npm run lint

# Execute Unit Tests
npm run test

# Clean build artifacts and cache
npm run maintenance:clean

# Version management
npm run version:bump
```

---

## 👨‍💻 Implementation Details

- **Atomic Components**: The `PokemonCard` is decoupled into `CardImage`, `CardInfo`, and `CardActions` to ensure high reusability and isolated render cycles.
- **Hydration Strategy**: On app startup, the system performs a parallel batch-fetch to hydrate full Pokémon details for all persisted IDs, ensuring the user's collection is always ready.
- **Design System**: A centralized `theme.ts` manages semantic color tokens, enabling seamless switching between themes while maintaining accessibility standards.

---
*Developed with focus on performance, scalability, and premium user experience.*

