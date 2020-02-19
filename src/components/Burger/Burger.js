import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import styles from './Burger.css';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(name => {
      return [...Array(props.ingredients[name])]
        .map((_, index) => {
          return <BurgerIngredient key={name + index} type={name} />;
        });
    })
    .reduce((arr, el) => {
      arr.push(...el);
      return arr;
    }, []);
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some ingredients!</p>;
  }
  return (
    <div className={styles.burger}>
      <BurgerIngredient type={"bread-top"}/>
      {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  )
}

export default burger;