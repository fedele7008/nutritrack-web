import React, { useEffect, useState } from "react";
import FoodModal from "../components/FoodModal";
import RestaurantModal from "../components/RestaurantModal";
import {useAuth} from "../hooks/Auth";
import { useNavigate } from 'react-router-dom';

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Toolbar } from "@mui/material";


function Admin() {
  // TODO: make only accessible by admins
  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [openNewFood, setOpenNewFood] = useState(false);
  const [openNewRestaurant, setOpenNewRestaurant] = useState(false);
  const [openEditFood, setOpenEditFood] = useState(false);
  const [editingFood, setEditingFood] = useState({ name: "", restaurant_id: null, calories: null, fat: null, carb: null, fiber: null, protein: null});
  const [admin, setAdmin] = useState(true);
  const {isAdmin} = useAuth();
  const navigate = useNavigate();

  const handleClickFoodOpen = () => {
    setOpenNewFood(true);
  };

  const handleFoodClose = () => {
    setOpenNewFood(false);
  };

  const handleClickRestaurantOpen = () => {
    setOpenNewRestaurant(true);
  };

  const handleRestaurantClose = () => {
    setOpenNewRestaurant(false);
  };

  const handleClickEditOpen = (foodItem) => {
    setEditingFood(foodItem);
    console.log(foodItem)
    setOpenEditFood(true);
  };

  const handleEditClose = () => {
    setEditingFood({ name: "", restaurant_id: null, calories: null, fat: null, carb: null, fiber: null, protein: null});
    setOpenEditFood(false);
  };

  const fetchFoodItems = () => {
    fetch("http://127.0.0.1:6608/food/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoodItems(data);
      });
  };

  const fetchRestaurants = () => {
    fetch("http://127.0.0.1:6608/restaurant/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
      });
  };

  const getAdmin = async () => {
    let adminRes = await isAdmin();
    if (!adminRes) {
      navigate("/login?alert=You must be an admin to view this page")
    } else {
      setAdmin(true)
    }
  }

  useEffect(() => {
    getAdmin();
    fetchFoodItems();
    fetchRestaurants();
  }, [openNewFood, openEditFood]);

  return (
    <div>
      {admin && (<>
      <Typography variant="h4" align="center" sx={{ m: 3 }}><b>Admin Dashboard</b></Typography>
      <Toolbar sx={{display: 'flex', justifyContent: 'flex-end'}}>   
        <Typography variant="h5" sx={{ marginRight: "auto" }}><b>Edit Food Items</b></Typography>     
        <Button
          sx={{ marginRight: 4 }}
          variant="contained"
          onClick={handleClickFoodOpen}>
          Create new food
        </Button>
        <Button
        //   sx={{ marginLeft: "auto" }}
          variant="contained"
          onClick={handleClickRestaurantOpen}>
          Create new restaurant
        </Button>
      </Toolbar>
      
      {Object.keys(foodItems).length > 0 &&
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Fiber&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodItems.map((foodItem) => (
              <TableRow
                key={foodItem.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}>
                <TableCell component="th" scope="row">
                  {foodItem.food_name}
                </TableCell>
                <TableCell align="right">
                  {foodItem.calories}
                </TableCell>
                <TableCell align="right">{foodItem.fat}</TableCell>
                <TableCell align="right">{foodItem.carb}</TableCell>
                <TableCell align="right">{foodItem.fiber}</TableCell>
                <TableCell align="right">{foodItem.protein}</TableCell>
                <TableCell align="right">
                    <Button
                    variant="outlined"
                    onClick={() => handleClickEditOpen(foodItem)}>
                    Edit
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }

    <FoodModal 
      isOpen={openNewFood} 
      handleClose={handleFoodClose} 
      type="create"
      title="Create new food item"
      buttonTitle="Create food"
      restaurants={restaurants}
      data={{}}
    />

    <FoodModal 
      isOpen={openEditFood} 
      handleClose={handleEditClose} 
      type="edit"
      title="Edit food item"
      buttonTitle="Edit food"
      restaurants={restaurants}
      data={editingFood}
    />

    <RestaurantModal 
      isOpen={openNewRestaurant}
      handleClose={handleRestaurantClose}
    />
    </>)}
    </div>
  );
}

export default Admin;
