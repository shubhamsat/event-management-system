import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Events from "./Events/Events";
import LoginForm from "./Login/LoginForm";
import RegistrationForm from "./Registration/RegistrationForm";
import RegistrationSuccess from "./Registration/RegistrationSuccess";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />}></Route>
          <Route path="/register" element={<RegistrationForm />}></Route>
          <Route
            path="/registrationSuccess"
            element={<RegistrationSuccess />}
          ></Route>
          <Route path="/eventForm" element={<Events />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
