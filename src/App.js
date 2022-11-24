import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Absences from './pages/Absences';
import { Container } from './styles/Styles';
function App() {
  return (
    <div className="App">
        <Navbar />
        <Container>
          <Absences />
        </Container>
    </div>
  );
}

export default App;
