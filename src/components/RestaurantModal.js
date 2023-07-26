import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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

const RestaurantModal = ({isOpen, handleClose}) => {
  const [restaurantName, setRestaurantName] = useState("");
  const {cookies} = useAuth();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log("form input", restaurantName)
    fetch("http://localhost:6608/restaurant/", {
    method: "POST",
    body: JSON.stringify({name: restaurantName}),
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
  };

  return (
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <Typography variant="h6">Create new restaurant</Typography>
          <DialogContent>
            <TextField
            label="Restaurant name"
            required
            variant="outlined"
            fullWidth
            type="text"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Create restaurant</Button>
          </DialogActions>
        </Box>
    </Modal>
  )
}

export default RestaurantModal;