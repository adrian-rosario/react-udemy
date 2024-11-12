import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";

function MeetupItem(props) {
  const theRouter = useRouter();
  const handleShowDetails = () => {
    // -
    // console.log("load page id: " + props.id);
    theRouter.push("/gathering/" + props.id); // pushes a new page on the stack, equiv. to Link
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={handleShowDetails}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
