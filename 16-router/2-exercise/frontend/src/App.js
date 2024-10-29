import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import AddNewEvent /*, { addNewEventAction }*/ from "./pages/AddNewEventUsingLoader";
import EventEdit from "./pages/EventEdit";
import EventsList from "./components/EventsList";
import { /* useSelector, */ useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadEventsFromDb } from "./store/events-actions";
import EventsLayout from "./layout/EventsLayout";
import EventsUsingLoder from "./pages/EventsUsingLoader";
import { customLoader } from "./store/customLoader";
import Error from "./pages/Error";
import EventDetailUsingLoader, {
  deleteEventAction,
} from "./pages/EventDetailUsingLoader";
import { eventDetailsLoader } from "./pages/EventDetailUsingLoader";
import EventEditUsingLoader from "./pages/EventEditUsingLoader";
import AddNewEventUsingLoader from "./pages/AddNewEventUsingLoader";
import { eventFormAction } from "./components/EventForm";
import NewsletterPage, { newsletterPageAction } from "./pages/Newsletter";

// -
// Challenge / Exercise
// ✓ 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// ✓ 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// ✓ 3. Add a root layout that adds the <MainNavigation> component above all page components
// ✓ 4. Add properly working links to the MainNavigation
// ✓ 5. Ensure that the links in MainNavigation receive an "active" class when active
// ✓ 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// ✓ 7. Output the ID of the selected event on the EventDetailPage
// ✓ BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
// ✓ - added Redux & fetching Events from local Node endpoint
// ✓ - local data file and endpoint data ids don't match, use the data now in the store
// - created a separate section for the loader pages, leaving the ones using
// Redux for another time
const theRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/using-loader",
        children: [
          {
            index: true,
            element: <EventsUsingLoder />,
            loader: customLoader /*async () => {
          const response = await fetch(ALL_EVENTS_HOST);

          if (!response.ok) {
            // -
          } else {
            const resData = await response.json();
            console.log("🚚 events fetched:\n" + JSON.stringify(resData));
            return resData.events;
          }
        },*/,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailsLoader,
            children: [
              {
                index: true,
                element: <EventDetailUsingLoader />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EventEditUsingLoader />,
                action: eventFormAction,
              },
            ],
          },
          {
            path: "new",
            element: <AddNewEventUsingLoader />,
            action: eventFormAction,
          },
        ],
      },
      {
        path: "/events",
        element: <EventsLayout />,
        children: [
          { index: true, element: <EventsList /> }, // when testing: <EventsList events={MOCK_DATA} />
          { path: "/events/:id", element: <EventDetail /> },
          { path: "/events/new", element: <AddNewEvent /> },
          { path: "/events/:id/edit", element: <EventEdit /> },
        ],
      },
      {
        path: "/newsletter",
        element: <NewsletterPage />,
        action: newsletterPageAction,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEventsFromDb());
  }, [dispatch]);

  // console.log("loaded events\n" + JSON.stringify(allEvents));
  return <RouterProvider router={theRouter}></RouterProvider>;
}

export default App;
