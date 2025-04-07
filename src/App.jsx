import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Healthcare from "./pages/Healthcare";
import Marketplace from "./pages/Marketplace";
import News from "./pages/News";
import Farmer from "./pages/Farmer";
import Doctor from "./pages/Doctor";
import Admin from "./pages/Admin";

// Project Tracking Pages
import ProjectTracking from "./pages/ProjectTracking";
import AdminProjectTracking from "./pages/ProjectTracking/AdminProjectTracking";
import VillagerProjectTracking from "./pages/ProjectTracking/VillagerProjectTracking";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/healthcare" element={<Healthcare />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/project-tracking" element={<ProjectTracking />} />
            <Route path="/admin-project-tracking" element={<AdminProjectTracking />} />
            <Route path="/villager-project-tracking" element={<VillagerProjectTracking />} />
            <Route path="/news" element={<News />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/farmer" element={<Farmer />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 