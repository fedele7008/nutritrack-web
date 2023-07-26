import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid } from "@mui/material";
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

const FoodModal = ({isOpen, handleClose, type, title, buttonTitle, restaurants, data}) => {
  const [formInput, setFormInput] = useState({ food_name: "", restaurant_id: null, calories: null, fat: null, carb: null, fiber: null, protein: null});
  const [defaultRestaurant, setDefaultRestaurant] = useState({})
  const {cookies} = useAuth();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (type === "create") {
      console.log("form input", formInput)
      fetch("http://localhost:6608/food/", {
        method: "POST",
        body: JSON.stringify(formInput),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies.token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          handleClose();
        })
        .catch((error) => console.error("Error:", error));
    } else if (type === "edit") {
      console.log("edit")
      console.log("form input", formInput)
      fetch(`http://localhost:6608/food/${formInput.id}`, {
        method: "PUT",
        body: JSON.stringify(formInput),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies.token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          handleClose();
        })
        .catch((error) => console.error("Error:", error));
    }
  };
  
  useEffect(() => {
    if (data) {
      setFormInput(data);
      setDefaultRestaurant(restaurants.find(elem => elem.id === formInput.restaurant_id))
    }
  }, [data])

  const handleRestaurantChange = (evt, restaurant) => {
    if(restaurant == null) {
      setFormInput({ ...formInput, restaurant_id: null });
    } else {
      setFormInput({ ...formInput, restaurant_id: restaurant.id });
    }
  };

  const handleNameChange = (evt) => {
    setFormInput({ ...formInput, food_name: evt.target.value  });
  };

  const handleCaloriesChange = (evt) => {
    setFormInput({ ...formInput, calories: evt.target.value  });
  };

  const handleFatChange = (evt) => {
    setFormInput({  ...formInput, fat: evt.target.value });
  };

  const handleCarbChange = (evt) => {
    setFormInput({ ...formInput, carb: evt.target.value });
  };

  const handleFiberChange = (evt) => {
    setFormInput({ ...formInput, fiber: evt.target.value });
  };

  const handleProteinChange = (evt) => {
    setFormInput({ ...formInput, protein: evt.target.value });
  };


  return (
      <Modal open={isOpen} onClose={handleClose}>
      {data && <Box sx={modalBoxStyle}>
        <Typography variant="h6">{title}</Typography>
        <DialogContent>
          {defaultRestaurant !== {} && <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={restaurants}
            getOptionLabel={(restaurant) => restaurant.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: 300 }}
            defaultValue={defaultRestaurant}
            onChange={handleRestaurantChange}
            renderInput={(params) => <TextField {...params} label="Restaurant" />}
          />}
          <TextField
            label="Food name"
            required
            variant="outlined"
            fullWidth
            type="text"
            value={formInput.food_name}
            onChange={handleNameChange}
            margin="normal"
          />
          <Grid container justifyContent="space-between" spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Calories"
                // required
                variant="outlined"
                fullWidth
                type="number"
                value={formInput.calories}
                onChange={handleCaloriesChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Fat"
                // required
                variant="outlined"
                fullWidth
                type="number"
                value={formInput.fat}
                onChange={handleFatChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Carb"
                // required
                variant="outlined"
                fullWidth
                type="number"
                value={formInput.carb}
                onChange={handleCarbChange}
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Fiber"
                // required
                variant="outlined"
                fullWidth
                type="number"
                value={formInput.fiber}
                onChange={handleFiberChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Protein"
                // required
                variant="outlined"
                fullWidth
                type="number"
                value={formInput.protein}
                onChange={handleProteinChange}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{buttonTitle}</Button>
        </DialogActions>
      </Box>}
    </Modal>
  )
}

export default FoodModal;