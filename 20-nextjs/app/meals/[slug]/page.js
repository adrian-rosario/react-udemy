import styles from "./mealDetail.module.css";
import Image from "next/image";
import { getMeal } from "@/host-data/host-data-meals";
import { notFound } from "next/navigation";

// export const metadata = {
//   title: "NextLevel Food: Meals List",
//   description: "Delicious meals, shared by a food-loving community.",
// };

export async function generateMetadata({ params }) {
  const pageSlug = getMeal(params.slug);

  if (!pageSlug) {
    notFound();
  }

  return {
    title: `NextLevel Food: Share - ${pageSlug.title}`,
    description: "Delicious meals, shared by a food-loving community.",
  };
}

export default /* async */ function MealsList({ params }) {
  const meal = /* await */ getMeal(params.slug);

  // console.log("meal\n" + JSON.stringify(meal));

  // if no meal is found, display next nearest not found page
  // or error page
  if (!meal) {
    notFound();
  }

  // - add line breaks back in, expression to find the line
  // breaks and add in an html <bt/>
  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} fill alt={meal.title} />
        </div>
      </header>

      <div className={styles.headerText}>
        <h1>{meal.title}</h1>

        <p className={styles.creator}>
          by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
        </p>

        <p className={styles.summary}>{meal.summary}</p>
      </div>

      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}

/*  
      <h3 style={{ color: "white", textAlign: "center" }}>
        Meals list, param passed in: {params.slug}
      </h3>
*/
