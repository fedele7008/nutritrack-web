import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddCircle from '@mui/icons-material/AddCircle';
import Whatshot from '@mui/icons-material/Whatshot';

export default function MultiActionAreaCard({foodItem, imageUrl}) {
  return (
    <Card sx={{ width: 345, m: 1.5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={foodItem.food_name}
        />
        <CardContent>
        <Typography gutterBottom variant="h5">
            {foodItem.food_name}
        </Typography>
          
          <Grid container spacing={0} justifyContent="space-between">
            <Grid item xs={4}>
                <Typography variant="body3" display="block"><b>Calories:</b> {foodItem.calories}</Typography>
                <Typography variant="body3" display="block"><b>Protein:</b> {foodItem.protein}</Typography>
                <Typography variant="body3" display="block"><b>Fiber:</b> {foodItem.fiber}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body3" display="block"><b>Fat:</b> {foodItem.fat}</Typography>
                <Typography variant="body3" display="block"><b>Carb:</b> {foodItem.carb}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Grid container justifyContent="flex-end">
        <Button color="primary"><span style={{ marginRight: '8px' }}>Add to Log</span> <AddCircle /></Button>
      </Grid>
      </CardActions>
    </Card>
  );
}
