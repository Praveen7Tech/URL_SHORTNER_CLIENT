import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./routes/public.route";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<PublicRoute><Register/></PublicRoute>}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App
