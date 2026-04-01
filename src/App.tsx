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
import OtpPage from "./pages/OtpVerification";
import Loading from "./components/loading/Loading";
import NotFound from "./components/notfound/NotFound";
import AccessLimitPage from "./components/urls/LimitExceedPage";

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

  if (isLoading) return <Loading/>

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
          <Route path="/verifyotp" element={<PublicRoute><OtpPage/></PublicRoute>}/>
          <Route path='/login' element={<PublicRoute><LoginPage/></PublicRoute>}/>
          <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
          <Route path="/" element={<LandingPage/>}/>
          <Route path='/usage-limit' element={<AccessLimitPage/>}/>

          <Route path="*" element={<NotFound />} />
       </Routes>
       <Toaster />
    </BrowserRouter>
  );
}

export default App

