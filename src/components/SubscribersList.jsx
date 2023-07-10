import React from "react";
import { Link } from "react-router-dom";
import SubscriberInfo from "./SubscriberInfo";

// const UsersList = ({ users, setUsers, handleEdit, handleDelete }) => {
  const SubscribersList = ({ users }) => {
  console.log(users)
  const subscriberElements = users?.map((user) => {
    return (
      <SubscriberInfo
        key={user._id}
        user={user}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
      />
    );
  });

  return (
    <>
      <div className="max-w-4xl">
        {/* <div className="flex justify-between px-5 my-5">
          <h3 className="text-2xl font-medium">Subscribers List</h3>
          <Link to={"subscribers"}>
            <button className="bg-slate-300 hover:bg-slate-400 px-4 py-2 rounded-md text-slate-700 font-medium">
              New
            </button>
          </Link>
        </div> */}
      </div>
      <hr />

      {subscriberElements}

    </>
  );
};

export default SubscribersList;
