import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import OurStory from "./pages/OurStory";
import OurFacilities from "./pages/OurFacilities";
import OurCommunity from "./pages/OurCommunity";
import Donate from "./pages/Donate";
import ContactUS from "./pages/ContactUs";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Our-Story" element={<OurStory/>}/>
        <Route path="/Our-Facilities" element={<OurFacilities/>}/>
        <Route path="/Our-Facilities" element={<OurCommunity/>}/>
        <Route path="/Donate" element={<Donate/>}/>
        <Route path="/Contact" element={<ContactUS/>}/>
      </Routes>
      <div></div>
    </Router>
  );
}

export default App;

