import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import { Toolbar } from "@mui/material";
import {useAuth} from "../hooks/Auth";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Admin() {
  // TODO: make only accessible by admins
  const [foodItems, setFoodItems] = useState([]);
  const [openNewFood, setOpenNewFood] = useState(false);
  const [openNewRestaurant, setOpenNewRestaurant] = useState(false);
  const [openEditFood, setOpenEditFood] = useState(false);
  const [formInput, setFormInput] = useState({ foodItem: "", date: "" });
  const {cookies} = useAuth();

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

  const handleClickEditOpen = () => {
    setOpenEditFood(true);
  };

  const handleEditClose = () => {
    setOpenEditFood(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let data = { ...formInput, user_id: cookies.id };
    fetch("http://localhost:6608/log/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // fetchFoodLogs();
        handleFoodClose(); // TODO: edit
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (evt, foodItem) => {
    setFormInput({ ...formInput, food_item_id: foodItem.id });
  };

  const handleDateChange = (newDate, value) => {
    setFormInput({
      ...formInput,
      date: newDate.$d,
    });
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

  useEffect(() => {
    fetchFoodItems();
  }, []);

  return (
    <div>
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
                <TableCell align="right">{foodItem.protein}</TableCell>
                <TableCell align="right">
                    <Button
                    variant="outlined"
                    onClick={handleClickEditOpen}>
                    Edit
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }

      <Modal open={openNewFood} onClose={handleFoodClose}>
        <Box sx={modalBoxStyle}>
          <Typography variant="h6">Add new food item</Typography>
          <DialogContent>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={foodItems}
              getOptionLabel={(foodItem) => foodItem.food_name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: 300 }}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} label="Food" />}
            />
            <DatePicker onChange={handleDateChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFoodClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Log</Button>
          </DialogActions>
        </Box>
      </Modal>

      <Modal open={openNewRestaurant} onClose={handleRestaurantClose}>
        <Box sx={modalBoxStyle}>
          <Typography variant="h6">Add new restaurant</Typography>
          <DialogContent>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={foodItems}
              getOptionLabel={(foodItem) => foodItem.food_name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: 300 }}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} label="Food" />}
            />
            <DatePicker onChange={handleDateChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRestaurantClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Log</Button>
          </DialogActions>
        </Box>
      </Modal>

      <Modal open={openEditFood} onClose={handleEditClose}>
        <Box sx={modalBoxStyle}>
          <Typography variant="h6">Edit food item</Typography>
          <DialogContent>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={foodItems}
              getOptionLabel={(foodItem) => foodItem.food_name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: 300 }}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} label="Food" />}
            />
            <DatePicker onChange={handleDateChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Log</Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}

export default Admin;
