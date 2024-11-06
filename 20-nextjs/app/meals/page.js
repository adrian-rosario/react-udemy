import Link from "next/link";
import styles from "./mealsPage.module.css";
import MealGrid from "../components/meal/mealGrid";
import { getMealsFromSql } from "@/host-data/host-data-meals";
import { Suspense } from "react";
import loadingStyles from "../components/meal/loading.module.css";

export const metadata = {
  title: "NextLevel Food: Meals",
  description: "Delicious meals, shared by a food-loving community.",
};

// - outsourcing the data fetching into a component, and
// can now wrap it with Suspense
async function MealsWithData() {
  const meals = await getMealsFromSql();
  return <MealGrid meals={meals} />;
}

export default /* async */ function Meals() {
  // const meals = [];

  // const meals = await getMealsFromSql();
  // console.log("loaded meals\n" + JSON.stringify(meals));

  return (
    <>
      <header className={styles.header}>
        <h3>
          Foods that <span className={styles.highlight}>charm</span>
          &nbsp;and&nbsp;
          <span className={styles.highlight}>delight</span>!
        </h3>

        <div className={styles.cta}>
          Share your favorites:&nbsp;
          <Link href='/meals/share'>Roar!</Link>
        </div>
      </header>
      <main className={styles.main}>
        {/* <MealGrid meals={meals} /> */}
        <Suspense
          fallback={<p className={loadingStyles.loading}>Loading...</p>}
        >
          <MealsWithData />
        </Suspense>
      </main>
    </>
  );
}
