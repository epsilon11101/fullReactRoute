import {
  json,
  redirect,
  useRouteLoaderData,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "could not fetch details for selected event" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events/");

  if (!response.ok) {
    //1st option
    // return { isError: true, message: "Could not fetch events" };
    //2ond option
    // throw new Response(JSON.stringify({ message: "error on fetch events" }), {
    //   status: 500,
    // });
    throw json({ message: "error on fetch events" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "could not delete event" }, { status: 500 });
  }
  return redirect("/events");
}
