import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegistrationPage from "./pages/RegisterPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element = {<RegistrationPage/>}/>
      </Routes>
    </>
  );
}

export default App;
