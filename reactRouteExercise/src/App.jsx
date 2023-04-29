import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import EventDetailPage, {
  loader as detailLoader,
  action as deleteEvent,
} from "./pages/EventDetailPage";
import NewEventPage, { action as newEventAction } from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import RootLayout from "./pages/RootLayout";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: detailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEvent,
              },
              {
                path: "edit",
                element: <EditEventPage />,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: newEventAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
