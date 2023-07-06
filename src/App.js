// App.js
import NavBar from "./components/Navbar.js";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Restaurants from "./pages/Restaurants.js";
import FoodLogs from "./pages/FoodLogs.js";
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
      </Routes>
    </ThemeProvider>
  );
};
export default App;
