import { useLoaderData, json } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();
  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  const events = data.events;
  return <EventsList events={events} />;
}

export default EventsPage;

// we can use hooks in loader functions
export async function loader() {
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
    return response;
  }
}
