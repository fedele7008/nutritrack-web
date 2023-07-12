// App.js
import NavBar from "./components/Navbar.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Restaurants from "./pages/Restaurants.js";
import FoodLogs from "./pages/FoodLogs.js";
import NotFound from "./pages/NotFound.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { ProtectRoutes } from './hooks/ProtectRoutes.js';
import {UserProvider} from "./hooks/Auth.js";
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Segoe UI, Roboto, sans-serif', // Set your desired font family here
    },
  });

  return (
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className = "App">
            <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/restaurants" element={<Restaurants />} />
              
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route element={ <ProtectRoutes /> }> 
                {/* These routes are protected by authentication */}
                <Route path="/foodlogs" element={<FoodLogs />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          </LocalizationProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
