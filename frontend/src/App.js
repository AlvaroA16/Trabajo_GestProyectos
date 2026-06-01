import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { SurveyProvider } from './context/SurveyContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Careers from './pages/Careers';
import Universities from './pages/Universities';
import Survey from './pages/Survey';
import Compare from './pages/Compare';
import Workshops from './pages/Workshops';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <SurveyProvider>
            <div className="app-layout">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/universities" element={<Universities />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
              <Footer />
            </div>
          </SurveyProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
