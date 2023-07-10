// App.js
import NavBar from "./components/Navbar.js";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Restaurants from "./pages/Restaurants.js";
import FoodLogs from "./pages/FoodLogs.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/FoodLogs" element={<FoodLogs />} />
      </Routes>
    </LocalizationProvider>
  );
};
export default App;
