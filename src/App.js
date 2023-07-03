// App.js
import NavBar from "./components/Navbar.js";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import Restaurants from "./pages/Restaurants.js";
import FoodLogs from "./pages/FoodLogs.js";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/FoodLogs" element={<FoodLogs />} />
      </Routes>
    </>
  );
};
export default App;
