import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";
import CardContent from "@mui/material/CardContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { Button, CardActionArea, CardActions } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";
import Whatshot from "@mui/icons-material/Whatshot";
import { useAuth } from "../hooks/Auth";

export default function MultiActionAreaCard({ foodItem, imageUrl }) {
  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState({ foodItem: "", date: "" });
  const { cookies } = useAuth();

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newDate, value) => {
    setFormInput({
      food_item_id: foodItem.id,
      date: newDate.$d,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let data = { ...formInput };
    fetch("http://localhost:6608/log/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
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
    <div>
      <Card sx={{ width: 345, m: 1.5 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt={foodItem.food_name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {foodItem.food_name}
            </Typography>

            <Grid container spacing={0} justifyContent="space-between">
              <Grid item xs={4}>
                <Typography variant="body3" display="block">
                  <b>Calories:</b> {foodItem.calories}
                </Typography>
                <Typography variant="body3" display="block">
                  <b>Protein:</b> {foodItem.protein}
                </Typography>
                <Typography variant="body3" display="block">
                  <b>Fiber:</b> {foodItem.fiber}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body3" display="block">
                  <b>Fat:</b> {foodItem.fat}
                </Typography>
                <Typography variant="body3" display="block">
                  <b>Carb:</b> {foodItem.carb}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Button color="primary" onClick={handleClickOpen}>
              <span style={{ marginRight: "8px" }}>Add to Log</span>{" "}
              <AddCircle />
            </Button>
          </Grid>
        </CardActions>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <Typography variant="h6">Add new log</Typography>
          <DialogContent>
            <Autocomplete
              disablePortal
              options={[foodItem.food_name]}
              id="readOnly"
              readOnly
              variant="outlined"
              sx={{ width: 300, marginBottom: 2 }}
              defaultValue={foodItem.food_name}
              renderInput={(params) => <TextField {...params} label="Food" />}
            />
            <DatePicker onChange={handleDateChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Log</Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
