import styles from "./mealGrid.module.css";
import MealItem from "./mealItem";

export default function MealGrid({ meals }) {
  // console.log("loaded meals\n" + JSON.stringify(meals));
  return (
    <>
      <ul className={styles.meals}>
        {meals.map((eachItem) => (
          <li key={eachItem.id}>
            <MealItem {...eachItem} />
          </li>
        ))}
      </ul>
    </>
  );
}
