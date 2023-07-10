// App.js
import NavBar from "./components/Navbar.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Restaurants from "./pages/Restaurants.js";
import FoodLogs from "./pages/FoodLogs.js";
import NotFound from "./pages/NotFound.js";
import { ThemeProvider, createTheme } from '@mui/material';

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Segoe UI, Roboto, sans-serif', // Set your desired font family here
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className = "App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/FoodLogs" element={<FoodLogs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
