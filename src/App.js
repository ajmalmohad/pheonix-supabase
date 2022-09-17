import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Protected from "./components/Protected";
import Login from "./components/Login";
import Home from "./components/Home";
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected><Home /></Protected>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
