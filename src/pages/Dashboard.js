import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Select, MenuItem, Stack, IconButton, Container, Grid, Card, CardContent, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FoodCard from "../components/FoodCard";
import GoalProgress from "../components/GoalProgress";

const imageUrl = {
  1: "https://www.owensoundtourism.ca/uploads/images/business-directory/burger-king.jpg",
  2: "https://www.foodandwine.com/thmb/8N5jLutuTK4TDzpDkhMfdaHLZxI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/McDonalds-Hacks-Menu-FT-1-BLOG0122-4ac9d62f6c9143be8da3d0a8553348b0.jpg",
  3: "https://www.nrn.com/sites/nrn.com/files/styles/article_featured_retina/public/Starbucks-storefront.jpeg?itok=OZXeV_KK"
}

const Dashboard = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantFilter, setRestaurantFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("ascending");

  // Goal stuff
  const [goalData, setGoalData] = useState([]);
  const [consumptionData, setConsumptionData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGoalName, setGoalName] = useState([]);
  const [newGoalValue, setNewGoalValue] = useState([]);
  const [selectedGoalType, setSelectedGoalType] = useState([]);
  const userId = 17; // Replace with the actual user ID

  const handleAddGoal = (goalType) => {
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
    fetch("http://127.0.0.1:6608/goal", {
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

  const changeSortBy = (e) => {
    setSortBy(e.target.value);
  }

  const fetchFoodData = () => {
    fetch("http://127.0.0.1:6608/food/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoodItems(data);
      });
  };

  const fetchRestaurantData = () => {
    fetch("http://127.0.0.1:6608/restaurant/")
    .then((response) => {
        return response.json();
      })
    .then((data) => {
        setRestaurants(data);
      });
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
    fetchFoodData();
    fetchRestaurantData();
    fetchGoalData();
    fetchConsumptionData();
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:6608/food/")
    .then((response) => response.json())
    .then((foods) => {
      let filteredFoods;

      // Filter by restaurants
      if (restaurantFilter.length > 0) {
        filteredFoods = foods.filter(food => restaurantFilter.map(restaurant => restaurant.id).includes(food.restaurant_id));
      } else {
        filteredFoods = foods;
      }

      // Filter by search query
      filteredFoods = filteredFoods.filter(food => {
        let query = searchFilter.toLowerCase().replace(/\s/g, '');
        let name = food.food_name.toLowerCase();
        for (let i = 0; i < query.length; i++) {
          if (!name.includes(query[i])) {
            return false;
          }
        }
        return true;
      })

      // Sort
      if (sortBy === "name") {
        filteredFoods.sort((a, b) => a.food_name.localeCompare(b.food_name));
      } else if (sortBy === "calories") {
        filteredFoods.sort((a, b) => a.calories - b.calories);
      }

      // Sort direction
      if (sortDirection === "descending") {
        filteredFoods.reverse();
      }

      setFoodItems(filteredFoods);
    })
  }, [restaurantFilter, searchFilter, sortBy, sortDirection]);

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
                    onAddGoal={() => handleAddGoal("fiber")}
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <div className = "dashboard-filter" style={{ display:'flex', justifyContent:'center' }}>
        <Card sx={{ width: "90%", marginTop: "15px", marginBottom: "12px"}}>
          <CardContent>
            <Grid container spacing={1} mb={3} justifyContent="space-around">
              <Grid item xs={12}>
                  <Typography variant="h4" display="block" align="left" fontWeight="bold">Filters</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="space-around">
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <Typography variant="h6" display="block" align="Left">Restaurant</Typography>
                  <Autocomplete 
                    multiple
                    id="restaurant-filter-input"
                    size="small"
                    options={restaurants}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => {
                      return <TextField 
                        {...params}
                        placeholder="Restaurant" />;
                    }}
                    value={restaurantFilter}
                    onChange={(e, newValue) => {
                      setRestaurantFilter(newValue);
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <Typography variant="h6" display="block" align="Left">Search by name</Typography>
                  <TextField 
                    id="name-filter-input"
                    label="Search"
                    size="small"
                    variant="outlined"
                    onChange={(e) => {
                      setSearchFilter(e.target.value);
                    }} />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <Typography variant="h6" display="block" align="Left">Sort by</Typography>
                  <Container style={{
                    padding: 0,
                    display: "flex",
                    flexDirection: "row",
                    height: "40px"
                  }}>
                    <Select
                      id="sorting-filter-input"
                      value={sortBy}
                      size="small"
                      sx={{ width: "100%", marginRight: "8px"}}
                      onChange={changeSortBy}
                    >
                      <MenuItem value={"name"}>name</MenuItem>
                      <MenuItem value={"calories"}>calories</MenuItem>
                    </Select>
                    <IconButton 
                      variant="outlined"
                      aria-label="Sorting direction"
                      onClick={() => {
                        setSortDirection(sortDirection === "ascending"? "descending" : "ascending");
                      }}>
                      {sortDirection === "ascending" ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </Container>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
        <Box className = "dashboard-list"
          sx={{
            width: "90%",
            p: 1,
            m: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            alignContent: 'flex-start',
            flexWrap: "wrap",
            margin: "auto"
          }}>
          {foodItems.map(food => {
            return <FoodCard key={food.id} foodItem={food} imageUrl={food.restaurant_id in imageUrl ? imageUrl[food.restaurant_id]: ""} sx={{
              p: 10,
              m: 10,
            }} />
          })}
        </Box>
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
