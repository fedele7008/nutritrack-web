// GoalProgress.js

import React from 'react';
import { Card, CardContent, Typography, CircularProgress, LinearProgress, Button,Box } from '@mui/material';
import { Whatshot } from '@mui/icons-material';


const GoalProgress = ({ name, currentValue, threshold, showCircular,streak,onAddGoal }) => {
    // Calculate the progress percentage
    const progress = threshold === null ? 0 : (currentValue / threshold) * 100;
  
    return (
      <Card>
        <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography component="subtitle" sx={{ fontWeight: 'medium' }}>
                    {name}
                    {streak > 0 && (
                        <Box component="span" ml={1}>
                            <Whatshot color="error" fontSize="small" />
                        </Box>
                     )}
                    {streak > 0 ? streak : ""}
                </Typography>
                {threshold && <Typography color="textSecondary">
                    {currentValue} / {threshold === null ? "N/A" : threshold}
                </Typography>}
            </Box>
            {showCircular ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ position: 'relative' }}>
              <CircularProgress
                variant="determinate"
                size={150}
                sx={{
                  color: 'primary.light',
                }}
                thickness={5}
                value={100}
              />
              <CircularProgress
                variant="determinate"
                value={progress}
                disableShrink
                size={150}
                thickness={5}
                sx={{
                  color: 'primary',
                  position: 'absolute',
                  left: 0,
                }}
              />
            </Box>
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
