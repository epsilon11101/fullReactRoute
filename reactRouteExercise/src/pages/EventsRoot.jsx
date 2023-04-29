import { Outlet, useNavigation } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

const EventsRoot = () => {
  // const navigation = useNavigation();

  return (
    <>
      {/* {navigation.state === "loading" ? "Loading..." : <EventsNavigation />} */}
      <EventsNavigation />
      <Outlet />
    </>
  );
};

export default EventsRoot;
