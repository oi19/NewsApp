# NewsApp

A modern, cross-platform news application built with React Native and Expo. NewsApp allows users to browse, search, and read the latest news articles with a clean and intuitive interface. Features include search, pagination, article details, and responsive design.

---

## Features

- **Top Headlines:** Browse the latest news headlines from various sources.
- **Search:** Find news articles by keywords with debounced search for performance.
- **Pagination:** Seamlessly load more articles as you scroll.
- **Article Details:** View full article details, including author, date, and description.
- **Responsive UI:** Clean, modern design with reusable components.
- **Error Handling:** User-friendly error messages and retry options.
- **API Integration:** Fetches news from the [GNews API](https://gnews.io/).

---

## Screenshots

*(Add screenshots here if available)*

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/oi19/NewsApp.git
   cd NewsApp
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your GNews API key:
     ```
     EXPO_PUBLIC_GNEWS_API_KEY=your_gnews_api_key_here
     ```

4. **Start the app:**
   ```sh
   yarn start
   # or
   npm start
   ```

---

## Project Structure

```
src/
  application/      # Business logic and service hooks
  domain/           # TypeScript types and interfaces
  infrastructure/   # API clients and hooks
  navigation/       # App navigation setup
  presentation/
    components/     # Reusable UI components
    screens/        # App screens (Home, Search, Details)
  shared/           # Shared hooks and utilities
App.tsx             # App entry point
```

---

## Scripts

- `yarn start` — Start the Expo development server
- `yarn android` — Run on Android device/emulator
- `yarn ios` — Run on iOS simulator
- `yarn web` — Run in web browser

---

## Dependencies

- React Native
- Expo
- React Navigation
- React Query
- Axios

---

## API

This app uses the [GNews API](https://gnews.io/) for fetching news articles.  
You need a free API key to use the app.

---

## License

MIT

---

## Author

- [oi19](https://github.com/oi19) 