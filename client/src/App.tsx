import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Generate from "./pages/Generate";
import MyGeneration from "./pages/MyGeneration";
import YtPreview from "./pages/YtPreview";
import Login from "./components/Login";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }: { children:TSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const { user, isLoggedIn } = useAuth();

  // Optional: remove in production
  if (import.meta.env.DEV) {
    console.log('📱 APP - User:', user);
    console.log('📱 APP - isLoggedIn:', isLoggedIn);
  }

  return (
    <>
      <Toaster />
      <LenisScroll />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />

        <Route path="/generate" element={<PrivateRoute><Generate /></PrivateRoute>} />
        <Route path="/generate/:id" element={<PrivateRoute><Generate /></PrivateRoute>} />
        <Route path="/my-generation" element={<PrivateRoute><MyGeneration /></PrivateRoute>} />
        <Route path="/preview" element={<PrivateRoute><YtPreview /></PrivateRoute>} />

        {/* 404 fallback */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center">404 - Page not found</div>} />
      </Routes>
      <Footer />
    </>
  );
}