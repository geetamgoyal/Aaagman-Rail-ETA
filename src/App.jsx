import React from 'react';
import Header from './Header';
import LiveTrainStatus from './LiveTrainStatus';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <LiveTrainStatus />
      </main>
    </div>
  );
}

export default App;
