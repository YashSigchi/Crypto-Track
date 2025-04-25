# CryptoTrack - Cryptocurrency Price Tracker

A React + Redux Toolkit application that tracks cryptocurrency prices, simulating WebSocket updates and managing state via Redux.

[🎬 Watch CryptoTrack Demo](https://www.youtube.com/watch?v=9YfdSVFrJdw)

## 🚀 Features

- **Real-time Price Updates**: Simulated WebSocket connection updates cryptocurrency data every 1-2 seconds
- **Comprehensive Market Data**: Track price, market cap, volume, supply, and price charts
- **Advanced Filtering**: Sort by assets, gainers, losers, and search functionality
- **Theme Toggle**: Switch between light and dark modes
- **Currency Conversion**: View prices in different fiat currencies
- **User Authentication**: Frontend implementation of login/signup flow

## 🛠️ Tech Stack

- **Frontend Framework**: React v19.1.0
- **State Management**: Redux Toolkit v2.7.0, React-Redux v9.2.0
- **HTTP Client**: Axios v1.9.0
- **Charts**: Recharts v2.15.3
- **Icons**: React Icons v5.5.0
- **Build Tools**: React Scripts v5.0.1

## 🏗️ Project Structure

```
crypto-track/
├── public/                 # Public assets
├── src/
│   ├── assets/             # Project assets
│   ├── components/         # UI components
│   │   ├── Auth/           # Authentication components
│   │   ├── CryptoTable/    # Table components
│   │   ├── Footer/         # Footer components
│   │   ├── Header/         # Header components
│   │   ├── MarketStats/    # Market statistics components
│   │   └── Pagination/     # Pagination components
│   ├── data/               # Initial mock data
│   ├── redux/              # Redux state management
│   │   ├── authSlice.js    # Authentication state
│   │   ├── cryptoSlice.js  # Cryptocurrency data state
│   │   └── store.js        # Redux store configuration
│   ├── services/           # API and service utilities
│   │   └── websocketSimulator.js # WebSocket simulation
│   ├── utils/              # Helper functions
│   │   └── formatters.js   # Data formatting utilities
│   └── App.js              # Main application component
└── package.json            # Project dependencies
```

## 📊 State Management Flow

The application utilizes Redux Toolkit for state management:

### Data Flow Process

1. **Initial Load**:
   - Application loads initial cryptocurrency data from mock data
   - Redux store is populated with this data
   - UI components render based on initial state

2. **WebSocket Updates**:
   - The websocketSimulator.js service generates mock real-time data
   - Updates are dispatched to Redux store through cryptoSlice
   - UI components update when cryptocurrency data changes

3. **User Interactions**:
   - User actions (filtering, sorting, searching) update Redux state
   - Components receive updated data through Redux selectors
   - UI reflects changes based on user interaction

4. **Authentication Flow**:
   - Login/Signup modals handle user authentication
   - Authentication state is managed in authSlice
   - UI components conditionally render based on authentication status

## 💭 Development Thought Process

### 1. Component Architecture
The application uses a component-based architecture with separate modules for different functionalities:
- Authentication components (Login, Signup)
- Data display components (CryptoTable, CryptoRow)
- Navigation components (Header, Footer)
- Data visualization components (MiniChart, PriceChange)

### 2. State Management Strategy
Redux was selected as the central state manager to handle:
- Cryptocurrency data updates
- User authentication state
- Filter and sort preferences
- Theme and display settings

### 3. Real-time Data Simulation
A WebSocket simulator was implemented to provide realistic data updates without requiring external API connections during development.

### 4. Future Improvements
Key areas identified for future development:
- Responsive design implementation
- Test suite completion
- Real API integration
- Performance optimization

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or later recommended)
- npm (v8.0.0 or later recommended)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/YashSigchi/Crypto-Track.git
   cd crypto-track
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Access the application at:
   ```
   http://localhost:3000
   ```

## 🔄 WebSocket Simulation

The application simulates WebSocket connections through a custom service:
- Located in `src/services/websocketSimulator.js`
- Generates realistic price movements at configurable intervals
- Updates the Redux store with new cryptocurrency data

## 🚧 Current Development Status

### Completed Features
- Basic UI implementation
- Redux state management
- WebSocket simulation service
- Authentication UI components
- Cryptocurrency table with sorting

### In Progress
- Responsive design implementation 
- Test suite development
- Performance optimizations

## 🔮 Future Enhancements

- Integration with real cryptocurrency APIs
- Portfolio tracking functionality
- Responsive design for mobile users
- Comprehensive test coverage
- Dark/light theme implementation
- User preference persistence
