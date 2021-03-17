import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);

  // function handleLiClick (id){

  //   const newFoodArray = foods.filter( food => food.id!== id);
  //   setFoods(newFoodArray)
  // }

  function handleLiClick (id){

    const newFoodArray = foods.map( food => {
      if(food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel+1,

        }
      } else {
        return food;
      } 
    
    });
    setFoods(newFoodArray)
  }

  const [filterBy, setFilterBy] = useState('All')

  function  handleFilterChange(event) {
    setFilterBy(event.target.value)
  }


  const foodsToDisplay = foods.filter( food => {
    if (filterBy === 'All') {
      return true;
    } else {
      return food.cuisine === filterBy
    }
  }); 

  const foodArr = foodsToDisplay.map( food => (<li key={food.id} onClick={()=> handleLiClick(food.id)}>{food.name} | Heat: {food.heatLevel} | Cusine: {food.cuisine}</li>))

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)
    console.log(newFood);
  }

  return (
    <div>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodArr}</ul>
      </div>
    </div>
  );
}

export default SpicyFoodList;
