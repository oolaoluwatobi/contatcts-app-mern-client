import React from 'react'
import { Form, Link, redirect, useLoaderData, useNavigation } from 'react-router-dom';

import api from '../api/users'
import Favorite from '../components/Favorite';

export async function loader({ request, params }) {
    const p = new URL(request.url).searchParams.get("p") || '';
    const q = new URL(request.url).searchParams.get("q") || '';
  try {
    const res = await api.get(`${params?.id}/?q=${q}&p=${p}`, {
      id: `${params.id}`,
    });

    console.log(res, res?.data, "15: Subs...");
    return { data: res?.data, p, q };
  } catch (error) {
    console.log( error, error.message);
    return error;
  }
}

export async function action({ request, params: { id } }) {
  const p = new URL(request.url).searchParams.get("p") || "";
  const q = new URL(request.url).searchParams.get("q") || "";
  const formData = await request.formData();

  console.log(request, id, formData);

  const newUser = {
    favorite: formData.get("favorite"),
    id
  };
  console.log(newUser)

  try {
    const res = await api.put(`${id}`, newUser);
    console.log(res.data, "favorite");
    const resData = res?.data;
    return { resData, newUser }, redirect(`./?q=${q}&p=${p}`);
  } catch (error) {
    return error;
  }
}

const SubscriberDetailsPage = () => {
  const resData = useLoaderData() || null
  const navigation = useNavigation();
  console.log(navigation, navigation.state)
  // console.log(resData?.response?.data?.message)
  
  if(resData?.response?.data?.message) throw new Error(`${resData.response.data.message}`)
  const { data: { firstname, lastname, email, username, _id, imageUrl, bio, favorite }, p, q } = resData || null


  
  return (
    <div className={
      navigation.state === "loading" ? 'hover:bg-slate-200 px-10 pt-20 max-w-2xl bg-slate-100 rounded-md blur' : 'hover:bg-slate-200 px-10 pt-20 max-w-2xl bg-slate-100 rounded-md '
    }>
      {navigation.state === "loading" ? <div className='absolute'>
          <div className=" flex justify-center items-center absolute top-3 left-3">
            <div className="animate-spin rounded-full h-40 w-40 border-b-2 border-slate-600"></div>
          </div>
        </div> 
        : 
        null
      }
      <div className=" w-full ">
          <div className="w-[576px] flex  px5 mb-5">
            <div className="">
              <img
                src={imageUrl}
                // src={`${imageUrl}`}
                alt="user"
                width={250}
                className="aspect-[3/4] rounded-xl mr2  "
              />

            </div>

            <div className='ml-10 flex flex-col justify-between'>
              <div className="flexcol itemscenter justifycenter">
                <div className="flex text-2xl text-slate-700">
                  <p className="font-bold   mr-3 ">{firstname}</p>
                  <p className="font-bold  ">{lastname}</p>
                  <Favorite resData={resData} className='' />
                </div>
                <p className="text-slate-700 font-semibold text-xl mt-3">{username}</p>
                <p className="text-blue-70 my-6">{bio}</p>
                <p className="text-blue-700 mt-3 cursor-not-allowed">{email}</p>
              </div>

              <div className='flex'>
                <Link to={`edit?q=${q}&p=${p}`} >
                  <button className="bg-slate-300 hover:bg-slate-00 mt3 px-6 py-2 rounded-md text-slate-500 font-medium  hover:scale-110 duration-500">
                  Edit
                  </button>
                </Link>
                <Form
                className=''
                  method="post"
                  action={`destroy/?q=${q}&p=${p}`}
                  onSubmit={(event) => {
                    if (
                      !confirm(
                        "Please confirm you want to delete this record."
                      )
                    ) {
                      event.preventDefault();
                    }
                  }}
                >
                  <button className='bg-red-100 hover:bg-red-200 px-4 py-2 ml-5 rounded-md text-red-500 font-medium  hover:scale-110 duration-500' type="submit">Delete</button>
                </Form>

              </div>
            </div>
          </div>
          <hr />
        </div>
    </div>
  )
}

export default SubscriberDetailsPage