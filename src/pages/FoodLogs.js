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
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import { Toolbar } from "@mui/material";
import { useAuth } from "../hooks/Auth";
import UserChart from "../components/UserChart";

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
  const [foodStatLabels, setFoodStatLabels] = useState([]);
  const [calorieDatasets, setCalorieDatasets] = useState([]);
  const [foodStatDatasets, setFoodStatDatasets] = useState([]);
  const [open, setOpen] = useState(false);
  const [formInput, setFormInput] = useState({ foodItem: "", date: "" });
  const { cookies } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        fetchFoodLogs();
        fetchUserStats();
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
    fetch("http://127.0.0.1:6608/food/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoodItems(data);
      });
  };

  const setOrganizedFoodLogs = (foodLogs) => {
    let foodLogDates = {};
    if (foodLogs) {
      foodLogs.forEach((foodLog) => {
        const date = new Date(foodLog[0].created_at).toDateString();
        if (!foodLogDates[date]) {
          foodLogDates[date] = [foodLog[1]];
        } else {
          foodLogDates[date].push(foodLog[1]);
        }
      });
    }
    setFoodLogs(foodLogDates);
  };

  const setOrganizedFoodStats = (foodStats) => {
    let labels = [];
    let calorieCounts = {
      label: "Calories",
      data: [],
      backgroundColor: "#166a8f",
      borderColor: "#166a8f",
    };
    let carbCounts = {
      label: "Carbohydrates",
      data: [],
      backgroundColor: "#acc236",
      borderColor: "#acc236",
    };
    let fatCounts = {
      label: "Fat",
      data: [],
      backgroundColor: "#58595b",
      borderColor: "#58595b",
    };
    let fiberCounts = {
      label: "Fiber",
      data: [],
      backgroundColor: "#8549ba",
      borderColor: "#8549ba",
    };
    let proteinCounts = {
      label: "Protein",
      data: [],
      backgroundColor: "#f67019",
      borderColor: "#f67019",
    };
    foodStats.forEach((foodStat) => {
      const api_date = new Date(foodStat.date);
      // for some reason, JS made the date one day behind, so add one day to correct this.
      var day = 60 * 60 * 24 * 1000;
      const date = new Date(api_date.getTime() + day).toDateString();
      labels.push(date);
      calorieCounts.data.push(foodStat.calorieCount);
      carbCounts.data.push(foodStat.carbCount);
      fatCounts.data.push(foodStat.fatCount);
      fiberCounts.data.push(foodStat.fiberCount);
      proteinCounts.data.push(foodStat.proteinCount);
    });
    console.log(labels);
    setFoodStatLabels(labels);
    const datasets = [carbCounts, fatCounts, fiberCounts, proteinCounts];
    setCalorieDatasets([calorieCounts]);
    setFoodStatDatasets(datasets);
  };

  const fetchFoodLogs = () => {
    fetch("http://127.0.0.1:6608/log/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setOrganizedFoodLogs(data);
      });
  };

  const fetchUserStats = () => {
    fetch("http://127.0.0.1:6608/log/stats", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setOrganizedFoodStats(data);
      });
  };

  useEffect(() => {
    fetchFoodLogs();
    fetchFoodItems();
    fetchUserStats();
  }, []);

  return (
    <div>
      <Paper
        style={{
          padding: 32,
          margin: 32,
        }}
        elevation={1}>
        <Typography variant="h5" style={{ marginBottom: 16 }}>
          Personal History
        </Typography>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <UserChart labels={foodStatLabels} datasets={foodStatDatasets} />
          </Grid>
          <Grid item xs={8}>
            <UserChart labels={foodStatLabels} datasets={calorieDatasets} />
          </Grid>
        </Grid>
      </Paper>
      <Toolbar sx={{ mx: "8px" }}>
        <Typography variant="h5">Log History</Typography>
        <Button
          sx={{ m: 3, marginLeft: "auto", backgroundColor: '#15603C', "&:hover": { backgroundColor: '#0E4028', }}}
          variant="contained"
          onClick={handleClickOpen}>
          Set log
        </Button>
      </Toolbar>

      <Box style={{ textAlign: "center", overflow: "auto" }}>
        {Object.keys(foodLogs).length == 0 && (
          <Typography variant="h7">
            No logs yet. Add some by clicking Add New Log!
          </Typography>
        )}
        {Object.keys(foodLogs).length > 0 &&
          Object.keys(foodLogs)
            .sort((date1, date2) => {
              return new Date(date1) - new Date(date2);
            })
            .map((date) => (
              <Accordion key={date} style={{ margin: "20px 32px 20px 32px", borderRadius: "16px" }}>
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
                            <TableCell align="right">
                              {foodLog.protein}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
      </Box>

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
            <Button onClick={handleClose} sx={{ color: "#15603C" }}>Cancel</Button>
            <Button onClick={handleSubmit} sx={{ color: "#15603C" }}>Add Log</Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}

export default FoodLogs;
