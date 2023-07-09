// App.js
import NavBar from "./components/Navbar.js";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Restaurants from "./pages/Restaurants.js";
import FoodLogs from "./pages/FoodLogs.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { ProtectRoutes } from './hooks/ProtectRoutes.js';
import { ThemeProvider, createTheme } from '@mui/material';

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Segoe UI, Roboto, sans-serif', // Set your desired font family here
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/FoodLogs" element={<FoodLogs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={ <ProtectRoutes /> }> 
          {/* These routes are protected by authentication */}
          <Route path='/home' element={ <Dashboard /> } />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
export default App;
