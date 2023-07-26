import * as React from 'react';
import { useEffect, useState } from "react";
import { Card, CardContent, Stack, Typography, IconButton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FoodCard from "./FoodCard";

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

const imageUrl = {
    1: "https://www.owensoundtourism.ca/uploads/images/business-directory/burger-king.jpg",
    2: "https://www.foodandwine.com/thmb/8N5jLutuTK4TDzpDkhMfdaHLZxI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/McDonalds-Hacks-Menu-FT-1-BLOG0122-4ac9d62f6c9143be8da3d0a8553348b0.jpg",
    3: "https://www.nrn.com/sites/nrn.com/files/styles/article_featured_retina/public/Starbucks-storefront.jpeg?itok=OZXeV_KK"
}

export default function TrendingFoodStatCard({}) {
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())
    const [rank, setRank] = useState(1)
    const [isEmpty, setIsEmpty] = useState(true)
    const [food, setFood] = useState(null)
    const [rankLimit, setRankLimit] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch('http://localhost:6608/stat/trending_food/' + year + '/' + month + '/' + rank, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setFood(data.food);
            setIsEmpty(data.isEmpty);
            setRankLimit(data.upperlimit);
            setCount(data.count);
        })
    }, [year, month, rank])

    return (
        <Card style={{ height: "500px" }}>
            <CardContent>
                <Stack spacing={1} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant={'h6'} display={'block'}>
                        Most Popular Foods
                    </Typography>
                    <Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <IconButton variant="outlined" onClick={() => {
                            if (month - 1 < 1) {
                                setMonth(12);
                                setYear(year - 1);
                            } else {
                                setMonth(month - 1);
                            }
                            setRank(1);
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
                            setRank(1);
                        }}>
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Stack>
                    
                    {food === null ? 
                        <Typography variant={'h6'} display={'block'}>
                            Loading...
                        </Typography> :
                        isEmpty ?
                        <Typography variant={'h6'} display={'block'}>
                            No data available
                        </Typography> :
                        <Stack spacing={1} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                            <Typography variant='h8' display={'block'} sx={{ fontWeight: '600' }}>
                                TOP {rank} ({count} Logs)
                            </Typography>
                            <Stack spacing={2} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                                <IconButton variant="outlined" onClick={() => {
                                    if (rank - 1 < 1) {
                                        if (rankLimit !== 0) {
                                            setRank(rankLimit);
                                        }
                                    } else {
                                        setRank(rank - 1);
                                    }
                                }}>
                                    <KeyboardArrowLeftIcon />
                                </IconButton>
                                <FoodCard 
                                key={food.id}
                                foodItem={food}
                                imageUrl={food.restaurant_id in imageUrl ? imageUrl[food.restaurant_id]: ""} 
                                sx={{
                                    p: 10,
                                    m: 10,
                                }} />
                                <IconButton variant="outlined" onClick={() => {
                                    if (rank + 1 > rankLimit) {
                                        setRank(1);
                                    } else {
                                        setRank(rank + 1);
                                    }
                                }}>
                                    <KeyboardArrowRightIcon />
                                </IconButton>
                            </Stack>
                        </Stack>
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}