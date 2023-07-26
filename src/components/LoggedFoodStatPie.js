import * as React from 'react';
import { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card, CardContent, Stack, Typography, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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

const sizing = {
    margin: { right: 5 },
    width: 300,
    height: 300,
    legend: { hidden: true },
};

const colors = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042'
]

export default function LoggedFoodStatPie({}) {
    const date = new Date();
    
    const [data, setData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [total,  setTotal] = useState(0);
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [year, setYear] = useState(date.getFullYear());

    const fetchLoggedFoodStatPie = () => {
        fetch('http://127.0.0.1:6608/stat/logged-food-stat-pie/' + year + '/' + month, {
            method: 'GET'
        })
        .then((res) => {
            return res.json();
        })
        .then((stat) => {
            let tmp = [];
            let tot = 0
            for (let i = 0; i < stat.length; i++) {
                tmp.push({
                    label: stat[i].restaurant,
                    value: stat[i].count,
                    color: colors[i]
                });
                tot = tot + stat[i].count
            }

            if (tmp.length === 0) {
                setData([{
                    label: 'Not enough data',
                    value: 1,
                    color: colors[0]
                }]);
                setIsEmpty(true);
            } else {
                setData(tmp);
                setIsEmpty(false);
            }

            setTotal(tot)
        });
    }

    useEffect(() => {
        fetchLoggedFoodStatPie();
    }, [month, year]);

    const getArcLabel = (params) => {
        const percent = params.value / total;
        return isEmpty ? 'Not enough data' : `${(percent * 100).toFixed(0)}%`;
    };

    return (
        <Card style={{height: "440px"}}>
            <CardContent>
                <Stack spacing={1} alignItems="center">
                    <Typography variant="h6" display="block">Logged Food Items of All Restaurant</Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
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
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                            >
                            <Typography 
                            variant="h8"
                            display="block"
                            width={124}
                            textAlign="center">
                                {months[month - 1]} {year}
                            </Typography>
                        </Stack>
                        
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
                    <PieChart
                    series={[{outerRadius: 120, data, arcLabel: getArcLabel}]}
                    sx={{[`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontSize: 14,
                    }}}
                    {...sizing}
                    />
                </Stack>
            </CardContent>
        </Card>
        
    );
}