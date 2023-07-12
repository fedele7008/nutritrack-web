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

function FoodLogs() {
  const [foodLogs, setFoodLogs] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState({ foodItem: "", date: "" });
  const {cookies} = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        fetchFoodLogs();
        handleClose();
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

  const setOrganizedFoodLogs = (foodLogs) => {
    let foodLogDates = {};
    foodLogs.forEach((foodLog) => {
      const date = new Date(foodLog[0].created_at).toDateString();
      if (!foodLogDates[date]) {
        foodLogDates[date] = [foodLog[1]];
      } else {
        foodLogDates[date].push(foodLog[1]);
      }
    });
    setFoodLogs(foodLogDates);
  };

  const fetchFoodLogs = () => {
    fetch("http://127.0.0.1:6608/log/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setOrganizedFoodLogs(data);
      });
  };
  useEffect(() => {
    fetchFoodLogs();
    fetchFoodItems();
  }, []);

  return (
    <div>
      <Toolbar>
        <Typography variant="h5">My Logs</Typography>
        <Button
          sx={{ m: 3, marginLeft: "auto" }}
          variant="contained"
          onClick={handleClickOpen}>
          Add new log
        </Button>
      </Toolbar>

      {Object.keys(foodLogs).length > 0 &&
        Object.keys(foodLogs)
          .sort((date1, date2) => {
            return new Date(date1) - new Date(date2);
          })
          .map((date) => (
            <Accordion key={date}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>{date}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {foodLogs[date].map((foodLog) => (
                        <TableRow
                          key={foodLog.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}>
                          <TableCell component="th" scope="row">
                            {foodLog.name}
                          </TableCell>
                          <TableCell align="right">
                            {foodLog.calories}
                          </TableCell>
                          <TableCell align="right">{foodLog.fat}</TableCell>
                          <TableCell align="right">{foodLog.carbs}</TableCell>
                          <TableCell align="right">{foodLog.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <Typography>
                {foodLogs.map((food_log) => food_log.name)}
              </Typography> */}
              </AccordionDetails>
            </Accordion>
          ))}

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalBoxStyle}>
          <Typography variant="h6">Add new log</Typography>
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add Log</Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}

export default FoodLogs;
