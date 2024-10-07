import { CoreConcepts } from "../model/CoreConcepts";

function Highlights({ image, title, description }: CoreConcepts) {
  // console.log("Highlights, props\n" + JSON.stringify(image));

  return (
    <>
      <li>
        <h3>{title}</h3>
        <div>
          <img src={image} alt={description} />
        </div>
        <p>{description}</p>
      </li>
    </>
  );
}

export default Highlights;
