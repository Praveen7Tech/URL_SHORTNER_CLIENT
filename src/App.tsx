import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./routes/public.route";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import { ProtectedRoute } from "./routes/protected.route";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthApi } from "./api/auth.api";
import { logout, setCredentials } from "./app/slice/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const  data  = await AuthApi.getMe();
        dispatch(setCredentials(data));
      } catch (err) {
        dispatch(logout());
      }
    };
    initializeAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
          <Route path='/login' element={<PublicRoute><LoginPage/></PublicRoute>}/>
          <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
          <Route path="/" element={<LandingPage/>}/>
       </Routes>
       <Toaster />
    </BrowserRouter>
  );
}

export default App

