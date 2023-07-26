import * as React from 'react';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, Stack, Typography, IconButton } from '@mui/material';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export default function RestaurantTrendStat({}) {
    const date = new Date();

    const [chartData, setChartData] = useState(null);
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [year, setYear] = useState(date.getFullYear());

    useEffect(() => {
        fetch("http://127.0.0.1:6608/stat/restaurant-trend/" + year + "/" + month, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setChartData(data);
        })
    }, [year, month]);

    return (
        <Card style={{ height: "500px", overflow: "scroll"}}>
            <CardContent>
                <Stack spacing={1} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant={'h6'} display={'block'}>
                        Restaurant Trends
                    </Typography>
                    <Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <IconButton variant="outlined" onClick={() => {
                            if (month - 1 < 1) {
                                setMonth(12);
                                setYear(year - 1);
                            } else {
                                setMonth(month - 1);
                            }
                        }}>
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                        <Typography variant='h8' display={'block'} width={124} textAlign={'center'}>
                            {months[month - 1]} {year}
                        </Typography>
                        <IconButton variant="outlined" onClick={() => {
                            if (month + 1 > 12) {
                                setMonth(1);
                                setYear(year + 1);
                            } else {
                                setMonth(month + 1);
                            }
                        }}>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Stack>
                    {console.log(chartData)}
                    {
                        chartData === null ? 
                        <Typography variant={'h6'} display={'block'}>
                            Loading...
                        </Typography> :
                        <Line
                        data={chartData}
                        options={{ 
                            maintainAspectRatio: true,
                        }}
                        />
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}