import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LoggedFoodStatPie from '../components/LoggedFoodStatPie'
import AvgCaloriesStatBar from "../components/AvgCaloriesStatBar";
import TrendingFoodStatCard from "../components/TrendingFoodStatCard";
import RestaurantTrendStat from "../components/RestaurantTrendStat";
import { Stack } from "@mui/material";

function Statistics() {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" marginTop={3} className="contentBox">
      <Typography variant="h4" sx={{ fontWeight: '600' }}>Statistics</Typography>
      <Grid container spacing={1} rowSpacing={1} width={"75%"} marginTop={1}>
        <Grid item xs={5}>
          <LoggedFoodStatPie/>
        </Grid>
        <Grid item xs={7}>
          <AvgCaloriesStatBar/>
        </Grid>
      </Grid>
      <Grid container spacing={1} rowSpacing={1} width={"75%"} marginTop={1}>
        <Grid item xs={8}>
          <RestaurantTrendStat/>
        </Grid>
        <Grid item xs={4}>
          <TrendingFoodStatCard/>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Statistics;
