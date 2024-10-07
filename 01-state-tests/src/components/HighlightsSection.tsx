import Highlights from "./Highlights.tsx";
import * as model from "../model/data-with-examples.ts";
export default function HighlightsSection() {
  const highlightItems = model.CORE_CONCEPTS.map((eachItem) => {
    return (
      <Highlights
        key={eachItem.image}
        image={eachItem.image}
        title={eachItem.title}
        description={eachItem.description}
      ></Highlights>
    );
  });

  return (
    <>
      <ul className='highlights'>{highlightItems}</ul>
    </>
  );
}
