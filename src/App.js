import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Screen/Auth/Auth";
import "./App.css";
import Home from "./Screen/Home/Home";

function App() {
  return (
    <>
      {/*  */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
