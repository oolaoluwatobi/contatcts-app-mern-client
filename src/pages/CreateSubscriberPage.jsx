import React from "react";
import {
  Link,
  useNavigation,
  useLoaderData,
  Form,
  redirect,
  useActionData,
  json,
} from "react-router-dom";
import api from "../api/users";
import axios from "axios";
// import { logIn } from "../components/Layout";

export async function loader({ request }) {
  const p = new URL(request.url).searchParams.get("p") || '';
  const q = new URL(request.url).searchParams.get("q") || '';
  console.log(request);
  const data = new URL(request.url).searchParams.get("message");
  return { data, p, q}
}

export async function action({ request }) {
  const p = new URL(request.url).searchParams.get("p") || '';
  const q = new URL(request.url).searchParams.get("q") || '';
  const formData = await request.formData();
  const newUser = {
    email: formData.get("email"),
    userName: formData.get("userName"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    imageUrl: formData.get("imageUrl"),
    bio: formData.get("bio"),
    favorite: false
  };

  console.log(formData, newUser);

  try {
    const res = await api.post("subscribers", newUser);
    console.log(res.data);
    return res.data, redirect(`../?q=${q}&p=${p}`);
  } catch (error) {
    return { error, newUser };
  }
}

const CreateSubscriberPage = () => {
  const actionData = useActionData();
  const { error, message, request, response, newUser } = actionData || "";
  const errorMessage = error?.response?.data?.message;

  const navigation = useNavigation();
  // console.log(navigation)
  // console.log(error)

  const loaderData = useLoaderData();
  console.log(loaderData, actionData);
  console.log(message, error);
  console.log(newUser, !newUser, !null, (undefined || null));
  // console.log(newUser, error?.response?.data?.message);

  // const inputElements = actionData.map(data, i => {
  //   return (
  //     <div key={i+1}>
  //     <input
  //       className="indent-2 border border-[#d1d5db] rounded-t p-2 placeholder:text-[#4d4d4d]"
  //       type="email"
  //       name="email"
  //       placeholder={data.email}
  //     />
  //     {data?.email ? <small>{data?.email}</small> : <small className="text-red-500">{data?.email} is required</small>}

  //     </div>
  //   )
  // })

  return (
    <div className=" bg-slate-50 rounded-md max-w-4xl">
      <div className="mt-12">
        {/* <h1 className="text-center font-bold text-3xl">Add a Subscriber</h1> */}
        {message && !error && (
          <h1 className="text-center pt-4 font-semibold text-[#cc0000] text-2xl">
            {message}
          </h1>
        )}
        {error && (
          <h1 className="text-center pt-4 font-semibold text-[#cc0000] text-2xl">
            {error.message}
          </h1>
        )}
        {errorMessage && (
          <h1 className="text-center pt-4 font-semibold text-[#cc0000] text-2xl">
            {errorMessage}
          </h1>
        )}
        <Form
          method="post"
          className="flex flex-col p-8 rounded placeholder:text-xs w-[567px] bg-slate100"
          replace
        >
          <div className="fle bg-blue300 w-full ">
            <div className="flex  w-full ">
              <h3 className="mr4 mt-3 text-sm font-medium">Name</h3>
              <div className="flex bg-rose100 w-96 ml-auto">
                <div className="flex flex-col w-full ">
                  <input
                    className="indent-2 border border-[#d1d5db] rounded-lg p-3 text-sm  placeholder:text-[#4d4d4d] "
                    type="firstName"
                    name="firstName"
                    placeholder="First Name"
                    />
                  { newUser && (newUser?.firstName  ?
                    <small>{newUser?.firstName}</small>
                    :
                    <small className="text-red-500 text-xs mt-1">first Name is required</small>)}
                </div>
                <div className="flex flex-col ml-4 mt- w-full">
                  <input
                    className="indent-2 border border-[#d1d5db] rounded-lg p-3 text-sm placeholder:text-[#4d4d4d]"
                    type="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    />
                  {newUser && (newUser?.lastName ? (
                    <small>{newUser?.lastName}</small>
                    ) : (
                      <small className="text-red-500 text-xs mt-1">Last Name is required</small>
                      ))}
                </div>

              </div>
            </div>
          </div>

          <label className="flex bg-slate100 w-full">
            <h3 className="mr-4 mt-7 text-sm font-medium">Alias</h3>
            <div className="flex flex-col ml-auto w-96">
              <div className="ml16">

              <input
                className="indent-2 border border-[#d1d5db] flex-grow w-full  bg-purple100  rounded-lg p-3 text-sm mt-4 placeholder:text-[#4d4d4d]"
                type="userName"
                name="userName"
                placeholder="username"
                />
              { newUser && (newUser?.userName ? (
                <small>{newUser?.userName}</small>
                ) : (
                  <small className="text-red-500 text-xs mt-1">username is required</small>
                  ))}
                </div>
            </div>
          </label>

          <label className="flex bg-slate100">
            <h3 className="mr-4 mt-8 text-sm font-medium">Avatar URL</h3>
            <div className="flex flex-col  w-96 ml-auto">
              <input
                className="indent-2 border border-[#d1d5db] rounded-lg p-3 text-sm mt-4 placeholder:text-[#4d4d4d]"
                type="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/avatar.jpg"
              />
              {newUser && (newUser?.imageUrl ? (
                <small>{newUser?.imageUrl}</small>
                ) : (
                  <small className="text-red-500 text-xs mt-1">Avatar URL is required</small>
              ))}
            </div>
          </label>

            <label className="flex bg-slate100">
              <h3 className="mr4 mt-7 text-sm font-medium">Email</h3>
              <div className="flex flex-col  w-96 ml-auto">
                <input
                  className="indent-2 border border-[#d1d5db] rounded-lg p-3 text-sm mt-4 placeholder:text-[#4d4d4d]"
                  type="email"
                  name="email"
                  placeholder="Email address"
                />
                {newUser && (newUser?.email ? (
                  <small>{newUser?.email}</small>
                  ) : (
                    <small className="text-red-500 text-xs mt-1">email is required</small>
                ))}
              </div>
            </label>
        
          <label className="flex bg-slate100">
              <h3 className="mr4 mt-7 text-sm font-medium">Bio</h3>
              <div className="flex flex-col  w-96 ml-auto">
              <textarea
                className="indent-2 border  border-[#d1d5db] rounded-lg h-40 text-sm text-start p-3 mt-4 placeholder:text-[#4d4d4d] "
                type="text-area"
                name="bio"
                placeholder="Life is beautiful"
              />
              {newUser && (newUser?.bio ? (
                <small>{newUser?.bio}</small>
                ) : (
                  <small className="text-red-500 text-xs mt-1">bio is required</small>
              ))}
            </div>
          </label>

          <div className="flex">
            <div className=" bg-green-200">

            </div>
            <div className="ml-auto mt-4 w-96">
              <button
                disabled={navigation.state === "submitting"}
                className=" text-indigo-500 bg-indigo-100 text-sm font-semibold mt5 p-2 px-4  rounded"
                >
                {navigation.state === "submitting"
                  ? "Saving..."
                  : "Save"}
              </button>
              <button
                // disabled={navigation.state === "submitting"}
                className=" text-red-500 bg-indigo-100 text-sm font-semibold ml-5 p-2 px-4  rounded"
                >
                {navigation.state === "submitting"
                  ? "Saving..."
                  : "Cancel"}
              </button>

            </div>
          </div>      
        </Form>
      </div>
    </div>
  );
};

export default CreateSubscriberPage;
