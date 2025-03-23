import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Healthcare from "./pages/Healthcare"; // ✅ Import Healthcare
import Marketplace from "./pages/Marketplace"; // ✅ Import Marketplace
import ProjectTracking from "./pages/ProjectTracking"; // ✅ Import Project Tracking
import News from "./pages/News"; // ✅ Import News
function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/healthcare" element={<Healthcare />} />{" "}
          {/* ✅ Healthcare Route */}
          <Route path="/marketplace" element={<Marketplace />} />{" "}
          {/* ✅ Marketplace Route */}
          <Route path="/project-tracking" element={<ProjectTracking />} />{" "}
          {/* ✅ Project Tracking Route */}
          <Route path="/news" element={<News />} /> {/* ✅ News Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
