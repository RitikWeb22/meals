import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Meals = () => {
  const [meals, setMeals] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const mealsPerPage = 8

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood').then(res => {
      setMeals(res.data.meals)
    })
  }, [])

  const indexOfLastMeal = currentPage * mealsPerPage
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal)

  const mealsList = currentMeals.map(({strMeal, strMealThumb, idMeal}) => {
    return (
      <div key={idMeal}>
        <div className="card">
          <img src={strMealThumb} alt={strMeal} />
          <p>{strMeal}</p>
          <p>{idMeal}</p>
        </div>
      </div>
    )
  })

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(meals.length / mealsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="main">
      <h2 className="mainTitle">Meals Api Using React</h2>
      <div className="mainCardContainer">
        {mealsList}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Meals