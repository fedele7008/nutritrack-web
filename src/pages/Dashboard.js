import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Select, MenuItem, Stack, IconButton, Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FoodCard from "../components/FoodCard";

const Dashboard = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantFilter, setRestaurantFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("ascending");

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

  useEffect(() => {
    fetchFoodData();
    fetchRestaurantData();
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
            return <FoodCard key={food.id} foodItem={food} imageUrl={food.restaurant_id === 1 ? "https://www.foodandwine.com/thmb/8N5jLutuTK4TDzpDkhMfdaHLZxI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/McDonalds-Hacks-Menu-FT-1-BLOG0122-4ac9d62f6c9143be8da3d0a8553348b0.jpg" :
          (food.restaurant_id === 2 ? "https://www.owensoundtourism.ca/uploads/images/business-directory/burger-king.jpg" : "")} sx={{
              p: 10,
              m: 10,
            }} />
          })}
        </Box>
      </Stack>
    </div>
  );
};

export default Dashboard;
