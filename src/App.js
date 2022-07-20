import "./App.css";
import { Form } from "./components/Form";
// import Login from "./Login";
import { Register } from "./components/Register";
import { Reset } from "./components/Reset";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Form />} />
        {/* <Route exact path="/" element={<Login />} /> */}
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
