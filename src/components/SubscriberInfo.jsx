import React from "react";
import {
  Link,
  redirect,
  useLoaderData,
  useSearchParams,
  useLocation,
  NavLink,
} from "react-router-dom";

import api from "../api/users";

export async function loader({ request, params }) {
  const p = new URL(request.url).searchParams.get("p") || "";
  const q = new URL(request.url).searchParams.get("q") || "";
  try {
    const res = await api.get(`subscribers/${params?.id}?q=${q}&p=${p}`, {
      id: `${params.id}`,
    });
    const data = res.data;
    console.log(res, res?.data, "15: Subs...");
    return { res, data, p, q };
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

// const UserDetails = ({ user: { firstName, lastName, email, _id }, handleEdit, handleDelete }) => {
const SubscriberInfo = ({
  user: { firstname, lastname, username, _id, favorite },
}) => {
  const { res, data, p, q } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const search = location.state?.search || null;
  console.log(searchParams.get("p"), search);  

  return (
    <div className=" rounded-xl my-2">
    <NavLink to={`subscribers/${_id}?q=${q}&p=${p}`} className={({ isActive, isPending }) => {
    // <NavLink to={`${user._id}.?q=${q}&p=${p}`} className={({ isActive, isPending}) => {
      console.log(isActive, isPending)
      return ( 
        isActive
          ? "bg-slate-300 block rounded-md py2 backdrop-opacity-95"
          : isPending
          ? "bg-green-300"
          : ""
        )
    }}>
      <div className=" ">
        <div className="max-w-4xl flex items-center justify-between px-3 my2 hover:bg-slate-300 hover:text-slate-100 rounded-md">
          <div className="flex w-full">
            <div className="flex-col items-center justify-center my-2 hover:bg-slate300 group-hover:text-slate-100 hover:text-slate-100">
              <div className="flex">
                <p className="font-bold text-gray-700 group-hover:text-slate-100 hover:text-slate100 mr-3">{firstname}</p>
                <p className="font-bold text-gray-700 hover:textslate-100">{lastname}</p>
              </div>
              <p className="text-blue-700 hover:text-slate100  text-sm">{username}</p>
            </div>
            <div className="ml-auto my-auto text-yellow-600 text-2xl">
              {favorite && <span>★</span>}
            </div>
          </div>
        </div>
      </div>
      </NavLink>
      <hr className="my-2" />
    </div>
  );
};

export default SubscriberInfo;
