import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EditEvent, {
  editEventLoader,
  theEditFormAction,
} from "./components/Events/EditEvent.jsx";

// - adding TanStack
// - moved to http.js
import { /* QueryClient, */ QueryClientProvider } from "@tanstack/react-query";
import { tanstackQueryClient } from "./util/http.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/events' />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
        loader: editEventLoader, // - adding tanstack, loading data before component renders
        // actin: theEditFormAction, // - if using the action/router based approach
      },
    ],
  },
]);

// - adding tanstack
// - moved to http.js
// const tanstackQueryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={tanstackQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  ); // - before adding tanstack - <RouterProvider router={router} />;
}

export default App;
