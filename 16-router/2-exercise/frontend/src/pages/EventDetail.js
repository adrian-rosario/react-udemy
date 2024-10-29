import { useParams } from "react-router-dom";
// import { MOCK_DATA } from "../model/temp-mock-data";
import { useSelector } from "react-redux";
import { IMAGES_HOST } from "../model/constants";

export default function EventDetail() {
  const params = useParams();
  const theId = params.id;

  const events = useSelector((state) => state.eventsStore.events);
  const dataItem = events.find((item) => item.id === theId);

  let theImagePath = "";
  if (!dataItem.image.includes("http")) {
    theImagePath = IMAGES_HOST + dataItem.image;
  } else {
    theImagePath = dataItem.image;
  }

  // const dataItem = MOCK_DATA.find((item) => item.id === theId);
  // console.log("some mock data:\n" + JSON.stringify(dataItem));

  return (
    <>
      <h2>
        Event detail <small>(using selector)</small>: <br />
        {dataItem.title} : {theId}
      </h2>
      <p>{dataItem.content}</p>
      <img src={theImagePath} alt={dataItem.title} />
      <p>{dataItem.description}</p>
      <p>{dataItem.date}</p>
    </>
  );
}
