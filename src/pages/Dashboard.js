import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [foodItems, setFoodItems] = useState([]);

  const fetchFoodData = () => {
    fetch("http://127.0.0.1:6608/food/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoodItems(data);
      });
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  return (
    <div>
      {foodItems.length > 0 && (
        <ul>
          {foodItems.map((foodItem) => (
            <li key={foodItem.id}>{foodItem.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
