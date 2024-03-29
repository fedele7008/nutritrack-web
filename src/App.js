// App.js
import NavBar from "./components/Navbar.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Statistics from "./pages/Statistics.js";
import FoodLogs from "./pages/FoodLogs.js";
import Admin from "./pages/Admin.js";
import NotFound from "./pages/NotFound.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { ProtectRoutes } from './hooks/ProtectRoutes.js';
import { UserProvider } from "./hooks/Auth.js";
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat, sans-serif', // Set your desired font family here
    },
    palette: {
      primary: {
        main: '#15603C',
        light: '#A6C2B4',
        contrastText: '#fff',
      },
      white: {
        main: 'white',
        // light: alpha(violetBase, 0.5),
        // dark: alpha(violetBase, 0.9),
        contrastText: '#000',
      },
      dark_green: {
        main: '#15603C',
        contrastText: '#fff',
      },
      
    },
  });

  return (
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App" style={{ backgroundColor: '#E0EAD6'}}>
              <Routes>
                <Route path="/" element={
                  <>
                    <NavBar />
                    <Dashboard />
                  </>
                } />
                <Route path="/statistics" element={
                  <>
                    <NavBar />
                    <Statistics />
                  </>
                } />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectRoutes />}>
                  {/* These routes are protected by authentication */}
                  <Route path="/foodlogs" element={
                  <>
                    <NavBar />
                    <FoodLogs />
                  </>
                } />
                  <Route path="/admin" element={
                  <>
                    <NavBar />
                    <Admin />
                  </>
                } />
                </Route>
                <Route path="*" element={
                  <>
                    <NavBar />
                    <NotFound />
                  </>
                } />
              </Routes>
            </div>
          </LocalizationProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
