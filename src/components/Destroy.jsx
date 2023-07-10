import React from 'react'
import { redirect, useActionData } from 'react-router-dom'

import api from '../api/users'

export async function action({ request, params }) {
  const p = new URL(request.url).searchParams.get("p") || '';
  const q = new URL(request.url).searchParams.get("q") || '';
  // throw new Error("oh dang!")
  try {
    const res = await api.delete(`subscribers/${params?.id}/?q=${q}&p=${p}`, {
      id: `${params.id}`,
    });

    console.log(res, res?.data, "15: Subs...");
    return redirect(`/subscribers/?q=${q}&p=${p}`)
  } catch (error) {
    console.log(error.message);
    return error, redirect('/subscribers')
  } 
}

const Destroy = () => {
  
  const data = useActionData()
  console.log(data)
  return (
    <div>Destroy</div>
  )
}

export default Destroy