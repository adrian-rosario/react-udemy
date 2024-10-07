import { ReactNode } from "react";

function MyListItems(
  { name, words }: { name: ReactNode; words: ReactNode },
  index: string
) {
  // console.log("props?" + JSON.stringify(props));
  // console.log("index?" + index);
  return (
    <>
      <li key={index}>
        <h3>{name}</h3>
        <p>- {words}</p>
      </li>
    </>
  );
}

export default MyListItems;
