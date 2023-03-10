import Home from './views/Home/Home';
import {Routes, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/user/:id" element={< Home/>} />
        <Route path="*" element={< Home/>}/>
      </Routes>      
    </div>
  );
}

export default App;
