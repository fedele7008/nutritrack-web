import * as React from 'react';
import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Stack, Typography, IconButton } from '@mui/material';

const colors = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042'
]

export default function AvgCaloriesStatBar({}) {
    const top_rank = 5
    
    const [restaurants, setRestaurants] = useState([]);
    const [data, setData] = useState([]);

    const fetchAvgCaloriesStatBar = () => {
        console.log('fetchAvgCaloriesStatBar')
        fetch('http://127.0.0.1:6608/stat/average-calories-per-restaurant/' + top_rank, {
            method: 'GET'
        })
        .then((res) => {
            return res.json();
        })
        .then((stat) => {
            let res = [];
            let dat = [];

            for (let i = 0; i < stat.length; i++) {
                res.push(stat[i].restaurant)
                dat.push(stat[i].avg_calories)
            }
            setRestaurants(res);
            setData(dat);
        });
    }

    useEffect(() => {
        fetchAvgCaloriesStatBar()
    }, [])

    return (
        <Card style={{height: "440px"}}>
            <CardContent>
                <Stack spacing={1} alignItems="center">
                    <Typography variant="h6" display="block">Average Calories (TOP {top_rank} Restaurants)</Typography>
                    {data.length === 0 ? 
                        <span>Loading...</span> :
                        <BarChart
                            width={500}
                            height={400}
                            series={[ 
                                {data: data, label: 'Average Calories', id: 'avg_calories'},
                            ]} 
                            xAxis={[{ scaleType: "band", data: restaurants }]}
                            colors={colors}
                        />
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}