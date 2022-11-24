import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Absences from './pages/Absences';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Absences/>
    </div>
  );
}

export default App;
