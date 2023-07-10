import React from "react";
import { Form, useFetcher, useLocation, useNavigation } from "react-router-dom";
import api from "../api/users";

// export async function action({ request, params: { id } }) {
//   const p = new URL(request.url).searchParams.get("p") || "";
//   const q = new URL(request.url).searchParams.get("q") || "";
//   const formData = await request.formData();

//   console.log(request, id, formData);

//   const newUser = {
//     favorite: formData.get("favorite"),
//   };

//   try {
//     const res = await api.put(`subscribers/${id}`, newUser);
//     console.log(res.data, "favorite");
//     const resData = res?.data;
//     return { resData, newUser }, redirect(`../?q=${q}&p=${p}`);
//   } catch (error) {
//     return error;
//   }
// }

// export async function action({ request, params }) {
//   const p = new URL(request.url).searchParams.get("p") || '';
//   const q = new URL(request.url).searchParams.get("q") || '';
// try {
//   const res = await api.delete(`subscribers/${params?.id}/?q=${q}&p=${p}`, {
//     id: `${params.id}`,
//   });

//   console.log(res, res?.data, "15: Subs...");
//   return redirect(`/subscribers/?q=${q}&p=${p}`)
// } catch (error) {
//   console.log(error.message);
//   return error, redirect('/subscribers')
// }
// }

const Favorite = ({ resData }) => {
  const fetcher = useFetcher()
  // yes, this is a `let` for later
  let {
    data: { favorite },
    p,
    q,
  } = resData;
  const location = useLocation();
  const navigation = useNavigation();
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  const search = location.state?.search || location.search || null;
  console.log(favorite, search, navigation, p, q);

  return (
    <fetcher.Form method="post" className="ml-2 text-yellow-500">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};

export default Favorite;
