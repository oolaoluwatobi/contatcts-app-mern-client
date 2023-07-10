import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";

import HomePage, { loader as homePageLoader } from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AuthPage from "./pages/AuthPage";
import Index from "./pages/Index";
import Signup, {
  loader as signupLoader,
  action as signupAction,
} from "./components/Signup";
import CreateSubscriberPage, {
  loader as createSubscriberPageLoader,
  action as createSubscriberPageAction,
} from "./pages/CreateSubscriberPage";
import SubscriberDetailsPage, {
  loader as SubscriberDetailsPageLoader,
  action as SubscriberDetailsPageAction,
} from "./pages/SubscriberDetailsPage";
import EditSubscriberPage, {
  loader as editSubscriberPageLoader,
  action as editSubscriberPageAction,
} from "./pages/EditSubscriberPage";
import Destroy, {
  action as DestroyAction,
  // action as SubscriberDetailsPageAction,
} from "./components/Destroy";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";
import Favorite, {
  // action as FavoriteAction,
  // action as SubscriberDetailsPageAction,
}  from "./components/Favorite";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="subscribers "  element={<HomePage />} loader={homePageLoader} errorElement={<ErrorPage />} >
        <Route index element={<Index />} />
        <Route
          path="add"
          element={<CreateSubscriberPage />}
          loader={createSubscriberPageLoader}
          action={createSubscriberPageAction}
           errorElement={<ErrorPage />}
        />
        <Route
          path=":id/edit"
          element={<EditSubscriberPage />}
          loader={editSubscriberPageLoader}
          action={editSubscriberPageAction}
           errorElement={<ErrorPage />}
          // errorElement={<ErrorPage />}
        />
        <Route
          path=":id"
          
          element={<SubscriberDetailsPage />}
          loader={SubscriberDetailsPageLoader}
           errorElement={<ErrorPage />}
          action={SubscriberDetailsPageAction}
          // errorElement={<ErrorPage />}
        />
        <Route
          path=":id/destroy"
          element={<Destroy />}
          action={DestroyAction}
           errorElement={<ErrorPage />}
          // action={SubscriberDetailsPageAction}
          // errorElement={<ErrorPage />}
        />
        <Route
          path=":id/favorite"
          element={<Favorite />}
          // action={FavoriteAction}
           errorElement={<ErrorPage />}
          // action={SubscriberDetailsPageAction}
          // errorElement={<ErrorPage />}
        />
      </Route>
      <Route
        path="users"
        element={<Signup />}
        loader={signupLoader}
        action={signupAction}
      />
      <Route path="auth" element={<AuthPage />} >

        <Route path="user" element={<UserPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
