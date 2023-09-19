// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import './App.css';
import Header  from './components/header';
import TodoForm from './components/todoForm'; 


function App()
 {
  return (
    <div className="App">
                                                 <div ><Header/></div>
                          <main>
                                 <TodoForm />
                          </main>
      
    </div>
  );
}

export default App;