import classes from "./EventsList.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function EventsList() {
  // { events }
  const events = useSelector((state) => state.eventsStore.events);

  // console.log("✓ loaded events\n" + JSON.stringify(events));

  return (
    <div className={classes.events}>
      <h1>
        All Events <small>(slice of state)</small>
      </h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
