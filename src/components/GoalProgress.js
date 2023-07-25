// GoalProgress.js

import React from 'react';
import { Card, CardContent, Typography, CircularProgress, LinearProgress, Button } from '@mui/material';

// GoalProgress.js

// ... existing imports ...

const GoalProgress = ({ name, currentValue, threshold, showCircular,onAddGoal }) => {
    // Calculate the progress percentage
    const progress = (currentValue / threshold) * 100;
  
    return (
      <Card>
        <CardContent>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <Typography variant="h6" component="h2" style={{ marginRight: "8px" }}>
                    {name}
                </Typography>
                <Typography color="textSecondary">
                    {currentValue} / {threshold === null ? "N/A" : threshold}
                </Typography>
            </div>
            {showCircular ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress variant="determinate" value={progress} size={100} thickness={5} />
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
