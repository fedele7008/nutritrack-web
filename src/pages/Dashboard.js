import React, { useEffect, useState } from "react";
import { TextField, Stack, Grid, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import GoalProgress from "../components/GoalProgress";
import {useAuth} from "../hooks/Auth";
import DashboardFilter from "../components/DashboardFilter";

const Dashboard = () => {
  // Goal stuff
  const [goalData, setGoalData] = useState([]);
  const [consumptionData, setConsumptionData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoalName, setGoalName] = useState([]);
  const [newGoalValue, setNewGoalValue] = useState([]);
  const [selectedGoalType, setSelectedGoalType] = useState([]);
  const {cookies} = useAuth();
  const userId = 1;

  const handleAddGoal = (goalType) => {
    if (isNaN(userId)) { // TODO: fix for any userid
      alert("Please sign in to set up your own goals.");
      return;
    }
    setSelectedGoalType(goalType);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewGoalValue("");
    setGoalName("");
  };

  const handleSaveGoal = () => {
    const parsedGoalValue = parseInt(newGoalValue);
    if (isNaN(parsedGoalValue) || parsedGoalValue <= 0) {
      alert("Please enter a positive integer for the goal value.");
      return;
    }
  
    // Create the payload to send to the server
    const payload = {
      user_id: userId,
      name: newGoalName,
      goal_type: selectedGoalType,
      quantity: parsedGoalValue,
      streak: 0, 
    };
  
    // Make a POST request to save the goal to the backend
    fetch("http://127.0.0.1:6608/goal/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // After saving the goal, close the dialog
        handleCloseDialog();
        fetchGoalData();
      })
      .catch((error) => {
        console.error("Error saving goal:", error);
        alert("Error saving goal. Please try again later.");
      });
  };
  

  const getGoalDataForType = (goalType) => {
    const goal = goalData.find((goal) => goal.goal_type === goalType);
    return goal ? goal : { goal_type: goalType, name: 'Set your goal', quantity: null };
  };

  const fetchGoalData = () => {
    // Fetch the goal table from the backend
    fetch(`http://127.0.0.1:6608/goal/user/${userId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setGoalData(data);
    });
  };

  const fetchConsumptionData = () => {
    // Fetch the goal table from the backend
    fetch(`http://127.0.0.1:6608/log/consumption/${userId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setConsumptionData(data);
    });
  };

  useEffect(() => {
    fetchGoalData();
    fetchConsumptionData();
  }, []);

  return (
    <div className = "dashboard">
      <Stack>
        <div className = "user-goal" style={{ display:'flex', justifyContent:'center' }}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <Typography variant="h6" component="h2">
                      Protein
                    </Typography>
                    <GoalProgress
                      name={getGoalDataForType("protein").name}
                      currentValue={consumptionData["protein"]}
                      threshold={getGoalDataForType("protein").quantity}
                      showCircular={false}
                      streak = {getGoalDataForType("protein").streak}
                      onAddGoal={() => handleAddGoal("protein")}
                    />
                  </div>
                  <div>
                    <Typography variant="h6" component="h2">
                      Fat
                    </Typography>
                    <GoalProgress
                      name={getGoalDataForType("fat").name}
                      currentValue={consumptionData["fat"]}
                      threshold={getGoalDataForType("fat").quantity}
                      showCircular={false}
                      streak = {getGoalDataForType("fat").streak}
                      onAddGoal={() => handleAddGoal("fat")}
                    />
                  </div>
                </Grid>

                <Grid item xs={4} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div>
                    <Typography variant="h6" component="h2">
                      Calories
                    </Typography>
                    <GoalProgress
                      name={getGoalDataForType("calorie").name}
                      currentValue={consumptionData["calorie"]}
                      threshold={getGoalDataForType("calorie").quantity}
                      showCircular={true}
                      streak = {getGoalDataForType("calorie").streak}
                      onAddGoal={() => handleAddGoal("calorie")}
                    />
                  </div>
                </Grid>

                <Grid item xs={4} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <Typography variant="h6" component="h2">
                      Carbs
                    </Typography>
                    <GoalProgress
                      name={getGoalDataForType("carb").name}
                      currentValue={consumptionData["carb"]}
                      threshold={getGoalDataForType("carb").quantity}
                      showCircular={false}
                      streak = {getGoalDataForType("carb").streak}
                      onAddGoal={() => handleAddGoal("carb")}
                    />
                  </div>
                  <div>
                    <Typography variant="h6" component="h2">
                      Fiber
                    </Typography>
                    <GoalProgress
                      name={getGoalDataForType("fiber").name}
                      currentValue={consumptionData["fiber"]}
                      threshold={getGoalDataForType("fiber").quantity}
                      showCircular={false}
                      streak = {getGoalDataForType("fiber").streak}
                      onAddGoal={() => handleAddGoal("fiber")}
                    />
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
        <DashboardFilter />
      </Stack>
      <div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogContent>
          <TextField
              label="New Goal Name"
              value={newGoalName}
              onChange={(e) => setGoalName(e.target.value)}
              fullWidth
            />
            <TextField
              label="New Goal Value"
              value={newGoalValue}
              onChange={(e) => setNewGoalValue(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveGoal} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
