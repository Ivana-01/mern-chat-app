import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chatroom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/chat" element={<Chat />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
