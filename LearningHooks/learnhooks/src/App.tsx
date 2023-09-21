import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button/button';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h5>Button Test Case If it is rendered or not and when click is working or not</h5>
      <Button label="Click me" onClick={handleClick} />
      </header>
      
    </div>
  );
}


export default App;


