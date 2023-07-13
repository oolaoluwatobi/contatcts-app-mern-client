import React from "react";
import {
  Link,
  useNavigation,
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import api from "../api/users";

export async function loader({ request, params }) {

  try {
    const res = await api.get(`subscribers/${params?.id}`, {
      id: `${params.id}`,
    });

    console.log(res, res?.data, "21: Edit...");
    return res?.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

export async function action({ request, params: { id } }) {
  const p = new URL(request.url).searchParams.get("p") || '';
  const q = new URL(request.url).searchParams.get("q") || '';
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const updatedUser = {...updates, id}
  
  // const newUser = {
  //   email: formData.get("email"),
  //   userName: formData.get("userName"),
  //   firstName: formData.get("firstName"),
  //   lastName: formData.get("lastName"),
  //   bio: formData.get("bio"),
  //   imageUrl: formData.get("imageUrl"),
  //   id 
  // };
  
  // console.log(request, id, formData, updates, newUser );
  // console.log(updates, updated, newUser );

  try {
    const res = await api.put(`subscribers/${id}`, updatedUser);
    console.log(res.data);
    const resData = res?.data
    return { resData, updatedUser }, redirect(`/subscribers/${id}?q=${q}&p=${p}`);
  } catch (error) {
    return error;
  }
}

const EditSubscriberPage = () => {
  const actionData = useActionData();
  const { error, message, newUser, resData } = actionData || "";
  const errorMessage = error?.response?.data?.message || null;
  console.log(error);

  const navigation = useNavigation();
  const navigate = useNavigate();
  // console.log(navigation)

  // const message = " ";
  const data = useLoaderData();
  // const response = req
  console.log(data, resData, newUser);

  return (
    <div className=" bg-slate-50 rounded-md h-full md:h-screen">
      <div className="pt-12 mxauto bg-lime100 w-full">
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
          <label className="fle bg-blue300 w-full ">
            <div className="flex  w-full ">
              <h3 className="mr4 mt-3 text-sm font-medium">Name</h3>
              <div className="flex bg-rose100 w-96 ml-auto">
                <div className="flex flex-col w-full ">
                  <input
                    className="indent-2 border border-[#d1d5db] rounded-lg p-3 text-sm  placeholder:text-[#4d4d4d] "
                    type="firstName"
                    name="firstName"
                    placeholder="First Name"
                    defaultValue={data.firstname}
                    />
                </div>
                <div className="flex flex-col ml-4 mt- w-full">
                  <input
                    className="indent-2 border border-[#d1d5db] rounded-lg p-3 text-sm placeholder:text-[#4d4d4d]"
                    type="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    defaultValue={data.lastname}
                    />
                </div>

              </div>
            </div>
          </label>

          <label className="flex bg-slate100 w-full">
            <h3 className="mr- mt-7 text-sm font-medium">Alias</h3>
            <div className="flex flex-col ml-auto w-96">
              <div className="ml16">

              <input
                className="indent-2 border border-[#d1d5db] flex-grow w-full  bg-purple100  rounded-lg p-3 text-sm mt-4 placeholder:text-[#4d4d4d]"
                type="userName"
                name="userName"
                placeholder="username"
                defaultValue={data.username}
                />
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
                defaultValue={data.imageUrl}
              />
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
                  defaultValue={data.email}
                />
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
                defaultValue={data.bio}
              />
            </div>
          </label>

          <div className="flex">
            <div className=" bg-green-200">

            </div>
            <div className="ml-auto  w-96">
              <button
                disabled={navigation.state === "submitting"}
                className=" text-indigo-500 bg-indigo-100  font-semibold mt-5 p-2 px-4  rounded"
                >
                {navigation.state === "submitting"
                  ? "Saving..."
                  : "Save"}
              </button>
              <button
                onClick={() => navigate(-1)}
                className=" text-red-500 bg-indigo-100  font-semibold ml-5 p-2 px-4  rounded"
                >
                  Cancel
              </button>

            </div>
          </div>      
        </Form>
      </div>
    </div>
  );
};

export default EditSubscriberPage;
