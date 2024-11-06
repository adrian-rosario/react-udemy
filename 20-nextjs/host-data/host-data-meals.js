import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { v4 as uuid } from "uuid";
import fs from "node:fs";

const localSqlDbFromFile = sql("meals.db");

// async will return a promise, event
// the the .prepare command will not
export async function getMealsFromSql() {
  // adding a delay, so we can handle loading... state
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // run() for inserting data, all() fetch all,
  // single row is get()

  // throw new Error("test error"); // testing error page

  return localSqlDbFromFile.prepare("SELECT * FROM meals").all();
}

export /* async */ function getMeal(mealName) {
  // console.log("get meal\n" + mealName);
  return localSqlDbFromFile
    .prepare(`SELECT * FROM meals WHERE slug = ?`)
    .get(mealName);
}

export async function storeUserSubmittedMeal(meal) {
  // - use slugify to generate a slug based on the meal's
  // title field, set it to use a lowercase value
  meal.slug = slugify(meal.title, { lower: true });
  // - sanitize the instructions field as we allow freeform text
  // input and we're using innerHtml to render that content
  meal.instructions = xss(meal.instructions);

  console.log(
    "🥵 image value sending to db request\n" + JSON.stringify(meal.image)
  );

  // - store uploaded image on the file system, we will return to the topic of
  // the /public folder later
  // TODO: image data is returning an empty object, commenting out the
  // image code for now
  /*
  const fileExtension = meal.image.name.split(".").pop();
  const newUuid = uuid();
  const uniqueFileName = `${newUuid}-${meal.slug}.${fileExtension}`;

  const writeStream = fs.createWriteStream(`public/images/${uniqueFileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  writeStream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Image upload failed.");
    }
  });

  meal.image = `/images/${uniqueFileName}`;
*/

  meal.image = "/images/burger.jpg";

  console.log("📓 meal to be added:\n" + JSON.stringify(meal));

  localSqlDbFromFile
    .prepare(
      `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
)` // bettersqllite way of targeting the field data safely
    )
    .run(meal);
}
