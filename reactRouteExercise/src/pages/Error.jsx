import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  let title = "An error ocurred!";
  let message = "Something went wrong";

  if (error.status === 500) {
    //for 2ond option
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
