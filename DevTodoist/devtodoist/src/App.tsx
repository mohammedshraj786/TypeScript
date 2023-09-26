import React from 'react';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import TodoForm from './components/mainbody/todoForm';


function App() {
  return (
    <div className="App">
 
      <Header></Header>
<div id="main">

  <TodoForm/>
  
</div>
      <Footer></Footer>    
      
      </div>
  );
}

export default App;
