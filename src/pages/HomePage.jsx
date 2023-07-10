import React, { useState } from "react";
import { Link, defer, redirect, useLoaderData, useSearchParams, Outlet, Form, useSubmit, useNavigation } from "react-router-dom";
import { AiOutlineSearch, AiOutlineLoading } from "react-icons/ai";

import api from "../api/users";

import SubscribersList from "../components/SubscribersList";

// export default loader
export async function loader({ request, params }) {

  const p = new URL(request.url).searchParams.get("p") || '';
  const q = new URL(request.url).searchParams.get("q") || '';
  const size = new URL(request.url).searchParams.get("size") || '';
  // console.log(p,size)
  
  const res = await api.get(`/?q=${q}&p=${p}`);
  // const res = await api.get("/");
  // console.log(res.data)
  return { res, q, p }
  // return res.data
}


const HomePage = () => {
  const { res, p, q } = useLoaderData()
  const navigation = useNavigation();
  const submit = useSubmit()
  const { data } = res
  // const [value, setValue] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()
  
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
  );

    // console.log(navigation, data)
  const page = searchParams.get("p") || '';
  let pageNumber = page + 1
  
  function handlePage(key, value, change) {
    setSearchParams((prevParams) => {
      if (value < 0) {
        prevParams.delete(key);
      } 
      if (change === 'inc') {
          value++
          prevParams.set(key, value);
      }

      if (value > 0 && change === 'dec') {
          value--
          prevParams.set(key, value);
      }
      // console.log(change)
      return prevParams;
    });
  }
  
  return (
    <div className="w-full bg-slate100">
      <div className="bg-orange-100 flex p">

        <div className="max-w-md  bg-slate-100 px-10">
          <Link to={"."}>
            <h1 className="w-full text-4xl font-semibold my-5  ">
              Subscribers
            </h1>
          </Link>
          
          <div className="flex ">
            <Form id="search-form" role="search" className="relative">
              {searching ? (<div className=" flex justify-center items-center absolute top-3 left-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600"></div>
              </div>) 
              :
              <AiOutlineSearch size={20} className="text-slate-400 aspect-square my-auto absolute top-3 left-3" />
              }
              <input 
                className="indent-8 p-2 rounded-md "
                id="q" 
                aria-label="Search Subscribers"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch
                  })
                }}
                />
            </Form>
            {/* <AiOutlineLoading size={20} className="hover:rotate-180" /> */}
            <Link to={`subscribers/add?q=${q}&p=${p}`} className="ml-auto">
              <button className="bg-slate-300 hover:bg-slate-400 px-5 py-2 ml-5 rounded-md text-slate-600 hover:text-slate-700  font-medium text-md">
                New
              </button>
            </Link>
          </div>
          <hr className="mt-5 " />
          <SubscribersList
            users={data}
          />

          
          <div className="max-w-4xl flex justify-between px5 my-5">
            <button onClick={() => handlePage('p', page, 'dec')}  className="bg-slate-300 hover:bg-slate-400 px-2 py-2 rounded-md text-slate-600 hover:text-slate-700 font-medium text-xs">
              Previous Page
            </button>
            <p>{ pageNumber }</p>
            <button onClick={() => handlePage('p', page, 'inc')}  className="bg-slate-300 hover:bg-slate-400 px-2 py-2 rounded-md text-slate-600 hover:text-slate-700 font-medium text-xs">
              Next Page
            </button>
          </div>
        </div>

        <Outlet />

      </div>
    </div>
  );
};

export default HomePage;
