// GoalProgress.js

import React from 'react';
import { Card, CardContent, Typography, CircularProgress, LinearProgress, Button,Box } from '@mui/material';
import { Whatshot } from '@mui/icons-material';

// GoalProgress.js

// ... existing imports ...

const GoalProgress = ({ name, currentValue, threshold, showCircular,streak,onAddGoal }) => {
    // Calculate the progress percentage
    const progress = threshold === null ? 0 : (currentValue / threshold) * 100;
  
    return (
      <Card>
        <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" component="h2">
                    {name}
                    {streak > 0 && (
                        <Box component="span" ml={1}>
                            <Whatshot color="error" fontSize="small" />
                        </Box>
                     )}
                    {streak > 0 ? streak : ""}
                </Typography>
                <Typography color="textSecondary">
                    {currentValue} / {threshold === null ? "N/A" : threshold}
                </Typography>
            </Box>
            {showCircular ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress variant="determinate" value={progress} size={150} thickness={5} />
            </div>
          ) : (
            <LinearProgress variant="determinate" value={progress} />
          )}
          {threshold === null && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
            <Button variant="outlined" color="primary" onClick={onAddGoal}>
              Add Goal
            </Button>
          </div>
        )}
        </CardContent>
      </Card>
    );
  };

export default GoalProgress;
