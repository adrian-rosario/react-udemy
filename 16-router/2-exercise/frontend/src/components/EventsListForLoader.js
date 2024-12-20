import classes from "./EventsList.module.css";
import { Link } from "react-router-dom";

export default function EventsListForLoader({ events }) {
  return (
    <div className={classes.events}>
      <h1>
        All Events, this component utilizes <code>loader</code>
      </h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={`/using-loader/${event.id}`}>
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

/*
<Link to={`/events/${event.id}`}>
*/
