import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // const events = data.events;
  // return <EventsList events={events} />;
}

export default EventsPage;

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

// we cant use hooks in loader functions
export function loader() {
  return defer({
    events: loadEvents(),
  });
}
