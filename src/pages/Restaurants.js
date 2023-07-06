import React, { useEffect, useState } from "react";
import MultiActionAreaCard from "../components/FoodCard";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Whatshot from '@mui/icons-material/Whatshot';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Restaurants(props) {
  const [trendingFoodItems, setTrendingFoodItems] = useState([]);

  const fetchFoodData = () => {
    fetch("http://127.0.0.1:6608/restaurant/mcdonalds/trending")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setTrendingFoodItems(data);
      });
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  return (
    <div>
      <Typography variant="h3" sx={{ fontWeight: '600' }}>McDonalds</Typography>
      <Card sx={{ width: "100%", marginTop: "12px", marginBottom: "12px" }}>
        <CardContent>
          <Grid container spacing={1} justifyContent="space-around">
            <Grid item xs={4}>
                <Typography variant="body3" display="block" align="center">X total items</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body3" display="block" align="center">Logged X times this month</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body3" display="block" align="center">Visited by X users</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Typography variant="h4" sx={{ fontWeight: '600', marginBottom: "8px" }}>Currently trending<Whatshot sx={{ color: "red"}} /></Typography>
      <Grid container spacing={1} rowSpacing={3} width={"100%"}>
        {trendingFoodItems.length > 0 && (
            trendingFoodItems.map((foodItem) => (
              <Grid item md={4} style={{display: 'flex'}}>
                <MultiActionAreaCard key={foodItem.id} foodItem={foodItem} imageUrl={"https://bloximages.chicago2.vip.townnews.com/insidehalton.com/content/tncms/assets/v3/editorial/2/ec/2ec0f2da-a584-5565-9dc6-9b588bfa036a/64887bbb1e27e.image.jpg"}/>
              </Grid>
            ))
        )}
      </Grid>
    </div>
  );
}

export default Restaurants;
